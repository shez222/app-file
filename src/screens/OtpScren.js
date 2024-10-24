// OtpScreen.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Vibration,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { verifyOtp, resendOtp } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // For a 6-digit OTP
  const inputRefs = useRef([]);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Animation values
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateY = useRef(new Animated.Value(-50)).current;

  // Function to start the animations
  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(iconTranslateY, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    startAnimations();
  }, []);

  const handleVerifyOtp = async () => {
    navigation.navigate('Main');
    const otpString = otp.join('');
    setLoading(true); // Set loading to true
    const response = await verifyOtp(otpString);
    setLoading(false); // Set loading to false

    if (response) {
      Alert.alert('Success', 'OTP verified successfully!');
      navigation.navigate('Main');
    } else {
      Alert.alert('Error', 'Invalid OTP, please try again.');
    }
  };

  const handleResendOtp = async () => {
    const response = await resendOtp();
    if (response) {
      Alert.alert('Success', 'A new OTP has been sent to your email.');
    } else {
      Alert.alert('Error', 'Failed to resend OTP, please try again later.');
    }
  };

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if the current one is filled
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace key press
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      // Focus on the previous input field if backspace is pressed
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Animation function for the button
  const animateButton = () => {
    Vibration.vibrate(10); // Optional: Vibrate on button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95, // Scale down
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale back to original
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1350046657/photo/dark-green-defocused-blurred-motion-abstract-background.jpg?s=612x612&w=0&k=20&c=Kdt8O_WEHlQ1ZqSsbM7P76l4uPXS8eqkXJrNMSWs62U=' }} // Replace with an image that matches your theme
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: iconOpacity,
              transform: [{ translateY: iconTranslateY }],
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Icon name="sms" size={100} color="#FFFFFF" />
            <Text style={styles.title}>Verify OTP</Text>
          </Animated.View>
          <Text style={styles.instructions}>Please enter the OTP sent to your email.</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)} // Assign ref for each input
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1} // One digit per input
                placeholder="•"
                placeholderTextColor="#B2DFDB"
              />
            ))}
          </View>
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonLoading]}
              onPress={() => {
                animateButton(); // Trigger the animation
                handleVerifyOtp(); // Call the verification function
              }}
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" /> // Loading spinner
              ) : (
                <Text style={styles.buttonText}>VERIFY OTP</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.linkText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 150, 136, 0.8)', // Semi-transparent teal overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  otpInput: {
    width: '13%', // Adjusted width for better spacing
    padding: 15,
    borderColor: '#B2DFDB',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 5,
  },
  buttonLoading: {
    backgroundColor: '#004D40', // Darker color while loading
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#004D40',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default OtpScreen;
