import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const LoginScreen = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mockUsers = {
    'mentor@example.com': { type: 'mentor' },
    'student@example.com': { type: 'student' },
  };



  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
  
    try {
      const response = await fetch("http://192.168.1.12:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
  
        // Determine user role
        const userRole = data.user.role; // Assuming the backend returns `role`
        
        // Navigate based on role
        navigation.navigate(
          userRole === "mentor"
            ? "HomeScreenAdmin"
            : userRole === "student"
            ? "Home"
            : "Home"
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <View style={styles.backgroundContainer}>
      {/* Background Patterns */}
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>

      {/* Login Form */}
      <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      </View>









      
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
       
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

       <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#432E54', // Pastel base color
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop:40
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white for contrast
    borderRadius: 12,
    padding: 20,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },logoContainer:{
width:'100%',
height:'25%',

    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
marginBottom:20
  
  },
  logo: {
  

   width:120,
   height:120

  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: '#e8a359',
    marginBottom: 20,
  },input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#60497d',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
  link: {
    color: '#7D6E91',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  circlePattern: {
    width: 150,
    height: 150,
    backgroundColor: '#59426A',
    borderRadius: 75,
    position: 'absolute',
    top: -50,
    left: -50,
    opacity: 0.6,
  },
  circlePattern2: {
    width: 200,
    height: 200,
    backgroundColor: '#7D6E91',
    borderRadius: 100,
    position: 'absolute',
    bottom: -60,
    right: -60,
    opacity: 0.5,
  }, passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
justifyContent:'space-between',
    borderRadius: 8,
    width: '90%',
    marginBottom: 20,
    padding: 5,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#7D6E91',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#e5e7da',
    fontWeight: '400',
    letterSpacing:5
  },
  
});

export default LoginScreen;
