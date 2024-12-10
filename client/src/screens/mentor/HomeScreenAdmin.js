import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FooterMentor from '../../components/FooteMentor';
import { LinearGradient } from 'expo-linear-gradient';
import MentorSessionDetails from '../mentor/SessionInfo'; // Import the modal component
import { MaterialIcons } from '@expo/vector-icons';


const HomeScreenAdmin = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const [selectedBooking, setSelectedBooking] = useState(null); // Track selected booking


  // Example saved dates
  const savedDates = {
    '2024-12-10': { marked: true, dotColor: '#734c2e' },
    '2024-12-15': { marked: true, dotColor: '#734c2e' },
  };
  

  // Example upcoming sessions
  const upcomingSessions = [
    { date: '2024-12-10', time: '10:00 AM', title: 'React Basics' }
  ];
  const handleAcceptBooking = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };
  return (
    <LinearGradient
      colors={['#924a12e2', '#2e2139', '#2e2139', '#2e2139', '#2e2139','#432E54']}
      style={styles.backgroundContainer}
    >
      {/* Background Patterns */}
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
      </View>

      {/* Main Content */}
      <View style={styles.container}>
        {/* Calendar */}
        <Calendar
  style={styles.calendar}
  onDayPress={(day) => {
    if (new Date(day.dateString) >= new Date()) {
      setSelectedDate(day.dateString);
    }
  }}
  markedDates={{
    ...Object.keys(savedDates).reduce((acc, date) => {
      acc[date] = {
        marked: true,
        dotColor: savedDates[date].dotColor,
        customStyles: {
          container: {
            borderRadius: 8,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
        },
      };
      return acc;
    }, {}),
    [selectedDate]: {
      selected: true,
      selectedColor: '#719e3a',
      customStyles: {
        container: {
          borderRadius: 8,
        },
        text: {
          color: '#432E54',
          fontWeight: 'bold',
        },
      },
    },
  }}
  theme={{
    textDayFontWeight: 'bold',
    todayTextColor: '#b89550',
    arrowColor: '#e0ead4',
  }}
  dayComponent={({ date, state }) => {
    const today = new Date().toISOString().split('T')[0];
    const isDisabled = new Date(date.dateString) < new Date(today);

    return (
      <TouchableOpacity disabled={isDisabled}>
        <View
          style={[
            styles.dayContainer,
            isDisabled && styles.disabledDay,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              isDisabled ? styles.disabledText : styles.enabledText,
            ]}
          >
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }}
/>


        {/* Book a Session Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MentorDashboard')}
        >
          <Text style={styles.buttonText}>Check the list</Text>
        </TouchableOpacity>

        {/* List of Upcoming Sessions */}
        <View style={styles.upcomingSessionsContainer}>
          <ScrollView>
            {upcomingSessions.map((session, index) => (
              <TouchableOpacity key={index} onPress={() => handleAcceptBooking(session)}>
                <View style={styles.alertCard}>
                <View
               style={styles.alertTitle}  >
    <MaterialIcons name="warning" size={24} color="#FF6F00" style={styles.alertIcon} />
    <Text style={styles.alertMessage}>This session is soon! Please confirm your availability.</Text>
                </View>
              
                  <View style={styles.alertContent}>
                    
                    <Text style={styles.sessionDate}>{session.date}</Text>
                    <Text style={styles.sessionTime}>{session.time}</Text>
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      {modalVisible && (
        <MentorSessionDetails
          booking={selectedBooking}
          setModalVisible={setModalVisible}
        />
      )}
      {/* Footer Navigation */}
      <FooterMentor navigation={navigation} activeTab="HomeScreenAdmin" />
</LinearGradient>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  disabledDay: {
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
  },
  disabledText: {
    color: '#a0a0a0',
  },
  enabledText: {
    color: '#432E54',
    fontWeight: '400',
  },
  alertTitle:{
    flexDirection: 'row',
    justifyContent:'center',
    
  },
  backgroundContainer: {
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  circlePattern: {
    width: 150,
    height: 150,
    backgroundColor: '#d8712335',
    borderRadius: 75,
    position: 'absolute',
    top: 100,
    left: -100,
    opacity: 0.3,
  },
  circlePattern2: {
    width: 200,
    height: 200,
    backgroundColor: '#d871233a',
    borderRadius: 100,
    position: 'absolute',
    bottom: -60,
    right: -60,
    opacity: 0.3,
  },
  titleContainer: {
    backgroundColor: '#81481b0',
    height: 100,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F5F5F5',
    fontWeight: '200',
    fontSize: 20,
  },
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#59426a79',
    borderRadius: 8,
    width: '350',
    marginBottom: 20,
    backgroundColor: '#ffffff',
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
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
  upcomingSessionsContainer: {
    width: '100%',
  
    backgroundColor: '#ffffff94',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f6f5f8',
    marginBottom: 10,
  },
  alertCard: {
    backgroundColor: '#fff3e0c4',
    padding: 15,
    borderRadius: 8,
  


  },
  alertIcon: {
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    alignContent:'center'
  },
  alertMessage: {
    fontSize: 14,
    color: '#FF6F00',
    fontWeight: '300',
    textAlign:'left',
    marginBottom: 5,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#734c2e',
    textAlign:'center'
  },
  sessionTime: {
    fontSize: 14,
    color: '#432E54',
    textAlign:'center'
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#432E54',
    textAlign:'center'
  },
});

export default HomeScreenAdmin;
 