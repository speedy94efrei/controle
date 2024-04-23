// App.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

import Home from './screens/HomeScreen';
import Personnages from './screens/PersonnagesScreen';
import Propos from './screens/AProposScreen';
import Page2 from './screens/Page2Screen';

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Personnage" component={Personnages} />
        <Tab.Screen name="A propos" component={Propos} />
        <Tab.Screen name="classement" component={Page2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Gris clair
  },
});

export default App;
