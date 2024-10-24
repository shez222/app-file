// ForgotPasswordScreen.js

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Animation values
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTranslateY = useRef(new Animated.Value(-50)).current;
  const buttonAnimation = useRef(new Animated.Value(1)).current;

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

  const handleResetPassword = async () => {
    // Animate button press
    Animated.sequence([
      Animated.spring(buttonAnimation, {
        toValue: 0.95,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnimation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Implement reset password logic here
    const response = await resetPassword(email);
    if (response) {
      Alert.alert('Success', 'A reset link has been sent to your email.');
      navigation.navigate('Otp'); // Navigate to the OTP screen after successful reset request
    } else {
      Alert.alert('Error', 'Please check your email and try again.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1350046657/photo/dark-green-defocused-blurred-motion-abstract-background.jpg?s=612x612&w=0&k=20&c=Kdt8O_WEHlQ1ZqSsbM7P76l4uPXS8eqkXJrNMSWs62U=' }} // Replace with an image that matches your theme
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
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
            <Icon name="lock-reset" size={100} color="#FFFFFF" />
            <Text style={styles.title}>Reset Password</Text>
          </Animated.View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#B2DFDB"
              style={styles.input}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <Animated.View
            style={{
              transform: [{ scale: buttonAnimation }],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>SEND RESET LINK</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
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
  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderColor: '#B2DFDB',
    borderWidth: 1,
    borderRadius: 30,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginText: {
    color: '#004D40',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
