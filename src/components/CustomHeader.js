// CustomHeader.js

import React, { useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ userProfileImage, username }) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value

  const handlePress = () => {
    // Start animation
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack(); // Navigate after animation completes
      scaleAnim.setValue(1); // Reset scale
    });
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.backButton}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons name="arrow-back" size={24} color="#00796B" />
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E0F7FA', // Match your theme color
  },
  backButton: {
    padding: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    color: '#00796B',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#009688', // Match your theme color
  },
});

export default CustomHeader;
