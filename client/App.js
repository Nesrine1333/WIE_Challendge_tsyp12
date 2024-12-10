import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUp';
import CategorySelectionScreen from './src/screens/student/CategorySelectionScreen';
import MentorListScreen from './src/screens/student/MentorListScreen';
import BookingFormScreen from './src/screens/student/BookingFormScreen';
import MentorDashboardScreen from './src/screens/mentor/MentorDashboardScreen';
import HomeScreen from './src/screens/student/HomeScreen';
import HomeScreenAdmin from './src/screens/mentor/HomeScreenAdmin'; // Import admin home screen
import MentorSessionDetails from './src/screens/mentor/SessionInfo';
const Stack = createStackNavigator();


export default function App() {
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Non-user specific screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />

          {/* Student Screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="CategorySelection"
            component={CategorySelectionScreen}
          />
          <Stack.Screen name="MentorList" component={MentorListScreen} />
          <Stack.Screen name="BookingForm" component={BookingFormScreen} />

          {/* Admin Screens */}
          <Stack.Screen name="HomeScreenAdmin" component={HomeScreenAdmin} />
          <Stack.Screen name="MentorDashboard" component={MentorDashboardScreen} />
          <Stack.Screen
            name="MentorSessionDetails"
            component={MentorSessionDetails}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#432E54',
    position: 'relative',
    overflow: 'hidden',
  },
  circlePattern: {
    width: 150,
    height: 150,
    backgroundColor: '#7D6E91',
    borderRadius: 75,
    position: 'absolute',
    top: 50,
    left: 30,
    opacity: 0.7,
  },
  circlePattern2: {
    width: 200,
    height: 200,
    backgroundColor: '#59426A',
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
    right: 50,
    opacity: 0.5,
  },
});
