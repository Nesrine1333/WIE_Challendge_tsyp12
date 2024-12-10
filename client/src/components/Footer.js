import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FooterNavigation = ({ navigation, activeTab }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.footerButton,
        activeTab === 'Home' && styles.activeButton]}
        onPress={() => navigation.navigate('Home')}
      >
        <Image
          source={require('../../assets/home.png')}
          style={[styles.footerIcon,
          activeTab === 'Home' && styles.activeIcon,]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton,
        activeTab === 'CategorySelection' && styles.activeButton]}
        onPress={() => navigation.navigate('CategorySelection')}
      >
        <Image
          source={require('../../assets/schedule.png')}
          style={[styles.footerIcon,
          activeTab === 'CategorySelection' && styles.activeIcon,]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton,
        activeTab === 'MentorList' && styles.activeButton]}
        onPress={() => navigation.navigate('MentorList')}
      >
        <Image
          source={require('../../assets/customer.png')}
          style={[styles.footerIcon,
          activeTab === 'MentorList' && styles.activeIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Image
          source={require('../../assets/logout.png')}
          style={styles.footerIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerIcon: {
    width: 24,
    height: 24
  },
  activeIcon: {
    tintColor: '#d87123',
  },

  footer: {
    flexDirection: 'row',

    backgroundColor: '#F5F5F5',
    borderColor: '#59426A',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
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
    borderRadius: 5
  },
  activeText: {
    color: '#d8ae23',
  },
});

export default FooterNavigation;
