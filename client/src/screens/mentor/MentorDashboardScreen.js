import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import colors from "../../styles/colors";
import FooterMentor from "../../components/FooteMentor";
import MentorSessionDetails from "../mentor/SessionInfo"; 

const bookings = [
  { id: "1", student: "Alice", date: "2024-12-10", time: "10:00 AM" },
  { id: "2", student: "Bob", date: "2024-12-12", time: "2:00 PM" },
];

const MentorDashboardScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedBooking, setSelectedBooking] = useState(null); 


  const handleAcceptBooking = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>
      <View style={styles.containerList}>
        <Text style={styles.title}>Upcoming Bookings</Text>

        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.details}>Student: {item.student}</Text>
                <Text style={styles.details}>
                  Date: {item.date} | Time: {item.time}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.footerButton}
                onPress={() => handleAcceptBooking(item)}
              >
                <Image
                  source={require("../../../assets/popup.png")} 
                  style={styles.buttonText}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* MentorSessionDetails Modal */}
      {modalVisible && (
        <MentorSessionDetails
          booking={selectedBooking}
          setModalVisible={setModalVisible}
        />
      )}

      <FooterMentor navigation={navigation} activeTab="MentorDashboard" />
    </View>
  );
};

const styles = StyleSheet.create({
  circlePattern: {
    width: 150,
    height: 150,
    backgroundColor: "#59426A",
    borderRadius: 75,
    position: "absolute",
    top: -50,
    left: -50,
    opacity: 0.6,
  },
  circlePattern2: {
    width: 200,
    height: 200,
    backgroundColor: "#7D6E91",
    borderRadius: 100,
    position: "absolute",
    bottom: -60,
    right: -60,
    opacity: 0.5,
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#59426A",
    paddingVertical: 15,
    justifyContent: "space-around",
  },
  footerButton: {
    alignItems: "center",
  },
  footerText: {
    color: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 16,
  },
  contentContainer: {
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "grey",
    flex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  containerList: {
    marginTop: 80,
    flex: 1,
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    fontSize: 24,
    fontWeight: "200",
    marginBottom: 10,
    color: colors.textDark,
    textAlign: "left",
  },
  card: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.textLight,
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cdd7c1",
    justifyContent: "space-between",
  },
  details: {
    color: colors.textDark,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    width: 20,
    height: 20,
  },
});

export default MentorDashboardScreen;
