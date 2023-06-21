import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStack from './src/navigation/HomeStackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
