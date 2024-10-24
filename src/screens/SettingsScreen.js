// SettingsScreen.js

import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleTheme = () => setIsDarkTheme(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="notifications" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.settingText}>Enable Notifications</Text>
        </View>
        <Switch
          trackColor={{ false: "#BDBDBD", true: "#009688" }}
          thumbColor={isNotificationsEnabled ? "#FFFFFF" : "#FFFFFF"}
          ios_backgroundColor="#BDBDBD"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="moon" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.settingText}>Dark Theme</Text>
        </View>
        <Switch
          trackColor={{ false: "#BDBDBD", true: "#009688" }}
          thumbColor={isDarkTheme ? "#FFFFFF" : "#FFFFFF"}
          ios_backgroundColor="#BDBDBD"
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="lock-closed" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.settingText}>Change Password</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="language" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.settingText}>Language</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="information-circle" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.settingText}>About Us</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796B',
    marginVertical: 20,
    alignSelf: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#B2DFDB',
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    color: '#00796B',
  },
  icon: {
    marginRight: 15,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SettingsScreen;
