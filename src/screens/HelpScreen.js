// HelpScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = () => {
  const handleFAQPress = () => {
    // Navigate to FAQ page or display FAQ content
  };

  const handleContactUsPress = () => {
    // Open email client or contact form
    Linking.openURL('mailto:support@example.com');
  };

  const handleTermsPress = () => {
    // Navigate to Terms and Conditions page
  };

  const handlePrivacyPress = () => {
    // Navigate to Privacy Policy page
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <TouchableOpacity style={styles.helpItem} onPress={handleFAQPress}>
        <View style={styles.helpInfo}>
          <Ionicons name="help-circle" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.helpText}>Frequently Asked Questions</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem} onPress={handleContactUsPress}>
        <View style={styles.helpInfo}>
          <Ionicons name="mail" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.helpText}>Contact Us</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem} onPress={handleTermsPress}>
        <View style={styles.helpInfo}>
          <Ionicons name="document-text" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.helpText}>Terms and Conditions</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem} onPress={handlePrivacyPress}>
        <View style={styles.helpInfo}>
          <Ionicons name="lock-closed" size={24} color="#00796B" style={styles.icon} />
          <Text style={styles.helpText}>Privacy Policy</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
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
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#B2DFDB',
    borderBottomWidth: 1,
  },
  helpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 18,
    color: '#00796B',
  },
  icon: {
    marginRight: 15,
  },
});

export default HelpScreen;
