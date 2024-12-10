import React,{ useEffect, useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { Calendar } from 'react-native-calendars';
import FooterNavigation from '../../components/Footer';
const CategorySelectionScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.backgroundContainer}>
      {/* Background Patterns */}
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>

      {/* Main Content */}
      <View style={styles.container}>
        <Text style={styles.title}>Book a Mentor Session</Text>

        {/* Calendar */}
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#7D6E91', 
            },
          }}
          theme={{
            textDayFontWeight: 'bold',
            todayTextColor: '#7D6E91',
            arrowColor: '#7D6E91',
          }}
        />

        {/* Book a Session Button */}
     

        <View style={styles.containerNext}>
  {/*  */}

  <View style={styles.nextSessionCard}>
  <Text style={styles.titleNext}>Your Next Session</Text>
    <Text style={styles.sessionDetail}>
      <Text style={styles.label}>Date:</Text> 12th December 2024
    </Text>
    <Text style={styles.sessionDetail}>
      <Text style={styles.label}>Mentor:</Text> Alice Johnson
    </Text>
    <Text style={styles.sessionDetail}>
      <Text style={styles.label}>Topic:</Text>Mathematics
    </Text>
  </View>

  <TouchableOpacity
    style={styles.bookButton}
    onPress={() => navigation.navigate('CategorySelection')}
  >
    <Text style={styles.bookButtonText}>Book Another Session</Text>
  </TouchableOpacity>
</View>

      </View>
      

      {/* Footer Navigation */}
      <FooterNavigation navigation={navigation} activeTab="CategorySelection" />

    </View>
  );
};

const styles = StyleSheet.create({
  titleNext: {
    fontSize: 15,
    fontWeight: '300',
    color: '#150101',
    textAlign:'center',
    marginBottom:10
    
  },
  nextSessionCard: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff5f8fd', // Pastel pink for a cute card
    borderColor: '#ef9445',
    borderWidth: 1,
    marginBottom: 20,
  },
  sessionDetail: {
    fontSize: 16,
    color: '#321d06',
    marginBottom: 5,
  },
  label: {
    fontWeight: '200',
    color: '#0a0110', // Highlighted label
  },
  bookButton: {
    backgroundColor: '#371e58',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '300',
  },
  containerNext:{
    flex: 1,
    padding:20,
    backgroundColor:'#e4d2a739',
    borderRadius:14,
    borderColor:'#e4d2a7',
width:'90%',
alignContent:'center',
alignItems:'center',
justifyContent:'space-between'
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#432E54', // Base pastel background
    position: 'relative',
    justifyContent: 'space-between',
    overflow: 'hidden',
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
  },
  container: {
    marginTop:80,
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',    
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2f0f4',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    tintColor: '#d87123', 
  },

  footer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderColor:'#59426A',
    borderTopRightRadius:14,
    borderTopLeftRadius:14,
    paddingVertical: 15,
    justifyContent: 'space-around',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#d87123',
    borderRadius:5
  },
  activeText: {
    color: '#d8ae23',
  },
});

export default CategorySelectionScreen;