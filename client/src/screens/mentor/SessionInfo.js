import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MentorSessionDetails = ({ booking, setModalVisible }) => {
  if (!booking) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!booking}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Booking Details</Text>
          <Text style={styles.details}>Student: {booking.student}</Text>
          <Text style={styles.details}>Date: {booking.date}</Text>
          <Text style={styles.details}>Time: {booking.time}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require('../../../assets/approve.png')}
                style={styles.buttonText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require('../../../assets/cancel.png')} 
                style={styles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f2f7',
    borderColor: '#d8e4e1',
    borderRadius: 20,
    padding: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#432E54',
  },
  details: {
    fontSize: 16,
    color: '#432E54',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }, buttonText: {
    height: 30,
    width: 30
  }
});

export default MentorSessionDetails;
