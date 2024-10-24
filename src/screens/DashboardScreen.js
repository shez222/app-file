import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Ensure you have these installed

const { width } = Dimensions.get('window'); // Get the screen width

const DashboardScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale: 0

  // Options to display on the dashboard
  const options = [
    {
      title: 'Purchase History',
      icon: <MaterialIcons name="history" size={50} color="#FFFFFF" />,
      navigateTo: 'PurchaseHistory',
    },
    {
      title: 'Search Exams',
      icon: <Ionicons name="search" size={50} color="#FFFFFF" />,
      navigateTo: 'Search',
    },
    {
      title: 'View Profile',
      icon: <Ionicons name="person" size={50} color="#FFFFFF" />,
      navigateTo: 'UserProfile',
    },
    {
      title: 'Settings',
      icon: <Ionicons name="settings" size={50} color="#FFFFFF" />,
      navigateTo: 'Settings',
    },
    {
      title: 'Help',
      icon: <Ionicons name="help-circle" size={50} color="#FFFFFF" />,
      navigateTo: 'Help',
    },
  ];

  // Fade in and scale up animation effect
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in to full opacity
        duration: 800, // Animation duration for fade
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale to full size
        duration: 800, // Animation duration for scale
        useNativeDriver: true, // Use native driver for better performance
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.cardContainer}>
        {options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [{ scale: scaleAnim }], // Scale animation for each card
            }}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(option.navigateTo)}
              activeOpacity={0.8} // Slightly reduce opacity on press
            >
              <View style={styles.iconContainer}>
                {option.icon}
              </View>
              <Text style={styles.cardText}>{option.title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows cards to wrap into the next line
    justifyContent: 'space-between', // Space out the cards
    width: '100%', // Ensures the container takes full width
    maxWidth: 800, // Limit max width for larger screens
  },
  card: {
    backgroundColor: '#009688',
    padding: 20,
    borderRadius: 15,
    margin: 10, // Space around each card
    width: width * 0.4, // Responsive width (40% of screen width)
    height: 150, // Fixed height for better layout
    alignItems: 'center', // Center content vertically
    justifyContent: 'center', // Center content horizontally
    elevation: 5, // Increased shadow for a card effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  iconContainer: {
    marginBottom: 5, // Space between icon and text
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Center text
  },
});

export default DashboardScreen;
