import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStack from './src/navigation/HomeStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
