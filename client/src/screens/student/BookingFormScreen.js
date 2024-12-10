import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icons
import colors from '../../styles/colors'; // Color constants
import { Picker } from '@react-native-picker/picker';
import FooterNavigation from '../../components/Footer';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;

export default function BookingFormScreen({ route, navigation }) {
  const { mentorId } = route.params;  // Get the mentor ID from navigation params

  const [sessionType, setSessionType] = useState('Offline');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [mentor, setMentor] = useState(null);

  // Fetch mentor details based on mentorId
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(`${API_URL}/mentors/${mentorId}`);
        setMentor(response.data);
      } catch (error) {
        console.error('Error fetching mentor:', error);
      }
    };

    fetchMentor();
  }, [mentorId]);

  const handleBooking = () => {
    if (sessionType === 'Online' && !link) {
      alert('Please provide a meeting link for the online session.');
      return;
    }
    alert('Session booked successfully!');
    navigation.goBack();
  };

  const today = new Date();
  const generateDates = () => {
    const dates = [];
    for (let i = -30; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const formatDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateNumber = date.getDate();
    return { day, dateNumber };
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const renderDateItem = ({ item: date }) => {
    const isSelected = selectedDate === date.toISOString().split('T')[0];
    const { day, dateNumber } = formatDate(date);

    return (
      <TouchableOpacity
        style={[styles.dateButton, isSelected && styles.selectedDateButton]}
        onPress={() => handleDateSelect(date)}
      >
        <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
          {dateNumber}
        </Text>
        <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!mentor) {
    return <Text>Loading...</Text>;  // Show loading message until mentor data is fetched
  }

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Icon name="arrow-back" size={24} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.formContainer}>

          {/* Mentor Info */}
          <View style={styles.infoContainer}>
            <View style={styles.photoSection}>
              <Icon name="person" size={40} color="#aaa" />
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.info}>{mentor.name}</Text>
              <Text style={styles.info}>{mentor.category}</Text>
            </View>
          </View>

          {/* Session Type */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sessionType}
              onValueChange={(itemValue) => setSessionType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Online" value="Online" />
              <Picker.Item label="Offline" value="Offline" />
            </Picker>
          </View>

          {/* Meeting Link */}
          {sessionType === 'Online' && (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Meeting Link</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter meeting link"
                value={link}
                onChangeText={setLink}
                placeholderTextColor={colors.placeholderText}
              />
            </View>
          )}

          {/* Date Selector */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Schedules</Text>
            <FlatList
              horizontal
              data={dates}
              keyExtractor={(item) => item.toISOString()}
              renderItem={renderDateItem}
              contentContainerStyle={styles.scrollContainer}
            />
          </View>

          {/* Time Selection */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Hours</Text>
            <View style={styles.timeTagContainer}>
              {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((timeSlot) => (
                <TouchableOpacity
                  key={timeSlot}
                  style={[styles.timeTag, time === timeSlot && styles.selectedTimeTag]}
                  onPress={() => setTime(timeSlot)}
                >
                  <Text style={styles.timeTagText}>{timeSlot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Book Session Button */}
          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',

  },
  picker: {

    color: colors.textDark,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#59426A',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59426A',
  },
  headerIcon: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.textLight,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#59426A',
  },
  formContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#fc730a',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,

    justifyContent: 'space-between',
    backgroundColor: '#efebe8',

    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    height: '20%',
    alignContent: 'center',
    alignItems: 'center',

    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.bordercontainer,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20
  },
  photoSection: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDetails: {
    justifyContent: 'center',
  },
  info: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textDark,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 10,
    fontWeight: '400'
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 60,
    borderColor: '#e4d9b4',
  },
  selectedDateButton: {
    backgroundColor: colors.backgrnButton,
  },
  dateNumber: {
    fontSize: 20,
    color: colors.textDark,

  },
  dateDay: {
    fontSize: 14,
    color: colors.textDark,
  },
  selectedDateText: {
    color: 'white',
  },
  timeTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeTag: {
    backgroundColor: '#eee',
    borderRadius: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e4d9b4',
    paddingHorizontal: 15,
    margin: 5,
  },
  selectedTimeTag: {
    backgroundColor: colors.primary,
  },
  timeTagText: {
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.backgrnButton,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
