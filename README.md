# WieConnectStem

**Version:** 1.0.0  
**License:** 0BSD

WieConnectStem is a full-stack application built with React Native, Expo, and Express, designed to connect STEM enthusiasts and provide a smooth user experience for students and mentors.

The app features a mobile frontend (built with React Native and Expo) and a backend built with Express and MongoDB. It includes various functionalities like user management, calendar, and navigation.

---

## Features

### Frontend
- Built with React Native and Expo.
- Calendar component (`react-native-calendars`).
- Navigation using `@react-navigation/native` and `@react-navigation/stack`.
- UI components with vector icons and linear gradients.
- Safe area context management for different devices.

### Backend
- Built with Express.
- Uses MongoDB for storing user and app data.
- Implements body parsing and environment variables with `dotenv`.
- Generates fake data using `@faker-js/faker` for development.

---

## Frontend Setup (Mobile App)

To get started with the mobile app (frontend), follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>


2.Navigate into the project directory:
   cd wieconnectstem-frontend

3.Install dependencies:

     npm install
4.Start Expo:
Starts the project in development mode for all platforms (Android, iOS, Web).

    npm start


Backend Setup (API Server)
To set up the backend, follow these steps:

1.Clone the repository:

    git clone <repository-url>
2.Navigate into the backend directory:

    cd wieconnectstem-backend
3.Install dependencies:

    npm install
4.Create a .env file in the backend directory and set your environment variables (e.g., MongoDB URI).

Run the backend server:

    node app.js



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Dependencies
Frontend (React Native + Expo)
  @react-navigation/native: Navigation between screens.
  @react-navigation/stack: Stack navigation.
  expo: Tools and services for building React Native apps.
  expo-font: Custom font loading.
  expo-linear-gradient: Linear gradient effects.
  react-native-calendars: Calendar UI components.
  react-native-gesture-handler: Gesture handling.
  react-native-reanimated: Animations library.
  react-native-vector-icons: Vector icons.
  
Backend (Express)
  express: Web framework for Node.js.
  mongoose: MongoDB object modeling.
  dotenv: Environment variables management.
  body-parser: Middleware for parsing request bodies.
  @faker-js/faker: Fake data generation for development.

