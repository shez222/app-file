// AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpScreen from '../screens/OtpScren'; // Corrected import
import UserProfileScreen from '../screens/UserProfileScreen';
import MarketPage from '../screens/MarketPage'; // Corrected import name
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import ProductPage from '../screens/ProductPage'; // Import ProductPage
import CustomHeader from '../components/CustomHeader';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ userProfileImage, username }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => (
          <CustomHeader userProfileImage={userProfileImage} username={username} />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'PurchaseHistory') {
            iconName = 'history';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'UserProfile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Help') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#009688',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Search" component={MarketPage} />
      <Tab.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const userProfileImage =
    'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg';
  const username = 'John Doe'; // Replace with actual username from your user data

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        {/* Authentication Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{ headerShown: false }}
        />

        {/* Main App Screens with Bottom Tab Navigator */}
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {() => (
            <MainTabNavigator userProfileImage={userProfileImage} username={username} />
          )}
        </Stack.Screen>

        {/* Product Page */}
        <Stack.Screen
          name="ProductPage"
          component={ProductPage}
          options={{
            headerShown: true,
            header: () => (
              <CustomHeader userProfileImage={userProfileImage} username={username} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
