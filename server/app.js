const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();


const dbUri = process.env.MONGO_STR;
const app = express();
app.use(bodyParser.json());
const cors = require("cors");

const corsOptions = {
  origin: process.env.client, // Specify the allowed origin(s)
  methods: "GET,POST,PUT,DELETE",    // Specify allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  credentials: true,                // Allow cookies if needed
};

app.use(cors(corsOptions));
// mongoDB connection
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB!");
});

const seedUsers = async () => {
  const users = [
    {
      name: "Alice Mentor",
      email: "alice.mentor@example.com",
      password: "password123", // Consider hashing passwords using bcrypt
      role: "mentor",
    },
    {
      name: "Bob Mentor",
      email: "bob.mentor@example.com",
      password: "password123", // Consider hashing passwords using bcrypt
      role: "mentor",
    },
    {
      name: "Charlie Student",
      email: "charlie.student@example.com",
      password: "password123", // Consider hashing passwords using bcrypt
      role: "student",
    },
    {
      name: "Dana Student",
      email: "dana.student@example.com",
      password: "password123", // Consider hashing passwords using bcrypt
      role: "student",
    },
  ];

  try {
    await User.insertMany(users);
    console.log("Users added to the database.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

// Call this function when initializing the app





// Define Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "mentor"], required: true },
});

const bookingSchema = new mongoose.Schema({
  mentorId: String,
  studentId: String,
  date: String,
  type: { type: String, enum: ["online", "in-person"], required: true },
});

const User = mongoose.model("User", userSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// Routes
// User Registration
app.post("/register", async (req, res) => {
  console.log('register');
  
  const { name, email, password, role } = req.body;
  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mentor sets availability
app.post("/set-availability", async (req, res) => {
  const { mentorId, date, type } = req.body;
  try {
    const newBooking = new Booking({ mentorId, date, type });
    await newBooking.save();
    res.status(201).json({ message: "Availability set successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Student books a mentor
app.post("/book-session", async (req, res) => {
  const { mentorId, studentId, date, type } = req.body;
  try {
    const booking = new Booking({ mentorId, studentId, date, type });
    await booking.save();
    res.status(201).json({ message: "Session booked successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/mentors", async (req, res) => {
  const { category } = req.query;  // Get category filter from query parameters (optional)

  try {
    // Always filter by role "mentor"
    const filter = { role: "mentor" };  
    
    // Add category filter if provided
    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Case-insensitive regex search for category
    }

    // Find mentors with the specified filter
    const mentors = await User.find(filter).select("-password");  // Exclude password field in response

    if (!mentors.length) {
      return res.status(404).json({ error: "No mentors found with the given filters" });
    }

    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/mentors/:id", async (req, res) => {
  const { id } = req.params;  // Get mentor ID from URL parameters
  
  try {
    // Find the mentor by ID
    const mentor = await User.findById(id).select("-password");  // Exclude password field in response

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
seedUsers();