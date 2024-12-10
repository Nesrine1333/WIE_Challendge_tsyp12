import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://192.168.1.12:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "student", // Explicitly pass the role
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Signup successful! You can now log in.");
        navigation.navigate("Login");
      } else {
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <View style={styles.backgroundContainer}>
      {/* Background Patterns */}
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>

      {/* Sign Up Form */}
      <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Log In</Text>
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

export default SignUpScreen;
