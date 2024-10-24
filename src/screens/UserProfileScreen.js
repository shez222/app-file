// UserProfileScreen.js

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const UserProfileScreen = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg', // Replace with actual image URL
  };

  const handleEditProfile = () => {
    // Navigate to Edit Profile screen or open modal
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#009688', '#004D40']} 
        style={styles.profileHeader}
      >
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={20} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Purchases</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Ionicons name="call" size={20} color="#00796B" style={styles.infoIcon} />
          <Text style={styles.infoText}>+1 (555) 123-4567</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={20} color="#00796B" style={styles.infoIcon} />
          <Text style={styles.infoText}>123 Main St, Anytown, USA</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="key" size={20} color="#00796B" style={styles.infoIcon} />
          <Text style={styles.infoText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="notifications"
            size={20}
            color="#00796B"
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>Notification Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  profileHeader: {
    // backgroundColor: '#009688', // Remove this line
    paddingBottom: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#E0F7FA',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    color: '#00796B',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#00796B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    top: 0,
    left: 0,
  },
});

export default UserProfileScreen;
