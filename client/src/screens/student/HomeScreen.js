import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert, ImageBackground, Image
} from 'react-native';
import FooterNavigation from '../../components/Footer';
import axios from "axios"; 
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;





export default function HomeScreen({ navigation }) {
  const initialCategories = ["Math", "Science", "Technology", "electronics"];
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const backgroundImage =require('../../../assets/backgound.png')
  const categoryIcons = {

    Technology: require('../../../assets/technology.png'),
    Math: require('../../../assets/math.png'),
    Science: require('../../../assets/science.png'),
    electronics: require('../../../assets/circuit.png'),
  };
  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const categoryQuery = selectedCategories.join(","); 
        const response = await axios.get(`${API_URL}/mentors`, {
          params: { category: categoryQuery }, 
        });
        setMentors(response.data);
        setFilteredMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        Alert.alert("Error", "Failed to fetch mentors.");
      }
    };

    fetchMentors();
  }, [selectedCategories]);

  // Handle search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMentors(mentors);
      return;
    }

    const filteredResults = mentors.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMentors(filteredResults);
  }, [searchQuery, mentors]);

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }
    if (categories.includes(newCategory.trim())) {
      Alert.alert("Error", "Category already exists.");
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  const handleToggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderCategoryTag = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cardCat,
        {
          backgroundColor: selectedCategories.includes(item) ? "#ebd181" : "#f2f0f3",
          borderColor: selectedCategories.includes(item) ? "#7D6E91" : "#e0e0e0",
        },
      ]}
      onPress={() => handleToggleCategory(item)}
    >
      {categoryIcons[item] && (
        <Image source={categoryIcons[item]} style={styles.cardIcon} />
      )}
      <Text
        style={[
          styles.cardText,
          { color: selectedCategories.includes(item) ? "#FFF" : "#59426A" },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMentorCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookingForm', { mentorId: item._id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerGlobal}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.containerSearch}>
          <Text style={styles.titleSub}>Welcome Back!</Text>
          <Text style={styles.title}>What do you want to learn about today?</Text>
          <View style={styles.search}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search sessions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
              <Image
                source={require("../../../assets/loupe.png")}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCategoryTag}
          horizontal
          contentContainerStyle={styles.tagContainer}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.subtitle}>Mentors:</Text>
        <FlatList
          data={filteredMentors}
          keyExtractor={(item) => item._id}
          renderItem={renderMentorCard}
          contentContainerStyle={styles.mentorList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No mentors available for selected categories.
            </Text>
          }
        />
      </View>
      <FooterNavigation navigation={navigation} activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
height:250,

    resizeMode:'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
   
  },
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
   
  },
  containerSearch: {

    justifyContent: 'center',
  
  
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },search:{
    flexDirection: 'row',
  alignContent:'center',
  alignSelf:'center',
  width:350,
justifyContent:'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
 
  
    backgroundColor: '#ccc',
  },
addIcon: {
  width: 20, 
  height: 20,

},
addButton: {
borderLeftWidth:1,
borderColor:'#9c87ad',
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
},
  addButtonText: {
    color: '#fff',
  },
  containerGlobal: {
    flex: 1,
  marginTop:50,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 2,
  padding:20,
    backgroundColor: '#F5F5F5',
  },titleSub:{ fontSize: 20,
    fontWeight: '200',
    color: '#c5c9c0',
    textAlign: 'left',
    marginBottom: 15,},
  title: {
    fontSize: 25,
    fontWeight: '400',
    fontFamily:'Poppins',
    color: '#ffffff',
    textAlign: 'left',
    marginBottom: 15,
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#59426A',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
 tagContainer: {
    justifyContent: 'space-between',
    
alignContent:'center',
alignItems:'flex-start',
alignSelf:'flex-start',
flex:1
  },
  cardCat: {
    width: 80, 
    height: 80, 
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom:40
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#59426A',
    marginBottom: 10,
  },
  mentorList: {
    flexGrow: 1,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
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
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3f2859',
    paddingVertical: 15,
    borderTopLeftRadius:12,
    borderTopRightRadius:12
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
