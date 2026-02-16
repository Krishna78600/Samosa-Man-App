import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MealManagementScreen from '../screens/MealManagementScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any = 'help';

            if (route.name === 'Meals') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'history' : 'history-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff9f43',
          tabBarInactiveTintColor: '#a0aec0',
          headerStyle: {
            backgroundColor: '#fff8f0',
            borderBottomWidth: 1,
            borderBottomColor: '#ffe8d6',
          },
          headerTintColor: '#1a202c',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: '#fff8f0',
            borderTopColor: '#ffe8d6',
            borderTopWidth: 1,
            paddingTop: 5,
            paddingBottom: 5,
          },
        })}
      >
        <Tab.Screen 
          name="Meals" 
          component={MealManagementScreen}
          options={{ title: '🍲 Samosa Man' }}
        />
        <Tab.Screen 
          name="History" 
          component={HistoryScreen}
          options={{ title: '📋 History' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: '⚙️ Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}