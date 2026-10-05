import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import ViewEntryScreen from '../screens/ViewEntryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6C63FF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'MyDiary' }}
      />
      <Stack.Screen 
        name="AddEntry" 
        component={AddEntryScreen} 
        options={{ title: 'New Entry' }}
      />
      <Stack.Screen 
        name="ViewEntry" 
        component={ViewEntryScreen} 
        options={{ title: 'View Entry' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;