import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FooterNavigation from '../../components/Footer';


const mentors = [
  { id: '1', name: 'Dr. Alice Johnson', category: 'Math', status: 'Confirmed' },
  { id: '2', name: 'Mr. John Doe', category: 'Science', status: 'Pending' },
  { id: '3', name: 'Ms. Emily White', category: 'Electronics', status: 'Confirmed' },
  { id: '4', name: 'Mr. Jake Black', category: 'Math', status: 'Pending' },

];


export default function MentorListScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleToggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    selectedCategories.length === 0 || selectedCategories.includes(mentor.category)
  );

  const handleSelectMentor = (mentor) => {
    navigation.navigate('BookingForm', { mentor });
  };
  const renderMentorCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card
      ]}
      onPress={() => handleSelectMentor(item)}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text
        style={[
          styles.status,
          item.status === 'Confirmed' && { color: '#3B873E',backgroundColor: '#C5E8B7' }, // Dark green for confirmed
          item.status === 'Pending' && { color: '#E98E29',backgroundColor: '#FFD6A5' },   // Dark orange for pending
        ]}
      >
        {item.status}
      </Text>
    </TouchableOpacity>
  );
  

  const renderTag = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.tag,
        selectedCategories.includes(category) ? styles.tagSelected : null,
      ]}
      onPress={() => handleToggleCategory(category)}
    >
      <Text
        style={[
          styles.tagText,
          selectedCategories.includes(category) ? styles.tagTextSelected : null,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const uniqueCategories = [...new Set(mentors.map((mentor) => mentor.category))];

  return (
    <View style={styles.backgroundContainer}>
      {/* Background Patterns */}
      <View style={styles.circlePattern}></View>
      <View style={styles.circlePattern2}></View>

      <View style={styles.container}>
        <Text style={styles.title}>Filter by Category:</Text>
        <View style={styles.tagContainer}>
          {uniqueCategories.map(renderTag)}
        </View>
        <FlatList
  data={filteredMentors}
  keyExtractor={(item) => item.id}
  renderItem={renderMentorCard}
  ListEmptyComponent={
    <Text style={styles.emptyText}>
      No mentors available for the selected categories.
    </Text>
  }
/>
      </View>
      <FooterNavigation navigation={navigation} activeTab="MentorList" />

    </View>
    
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#59426A',
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
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#432E54',
    position: 'relative',

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
    flex: 1,
    marginTop: 100,
 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius:14,
    borderTopRightRadius:14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7D6E91',
    marginBottom: 15,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#59426A',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  tagSelected: {
    backgroundColor: '#7D6E91',
    borderColor: '#7D6E91',
  },
  tagText: {
    fontSize: 14,
    color: '#59426A',
  },
  tagTextSelected: {
    color: '#F5F5F5',
  },
 
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59426A',
  },
  category: {
    fontSize: 14,
    color: '#7D6E91',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
 margin:5,
    borderRadius:14,
    alignContent:'center',
 textAlign:'center',
    width:100
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59426A',
  },
  category: {
    fontSize: 14,
    color: '#7D6E91',
  },
  emptyText: {
    textAlign: 'center',
    color: '#59426A',
    fontSize: 16,
    marginTop: 20,
  },
});

