import {StyleSheet} from 'react-native';
import React from 'react';
import Verification from '@views/auth/Verification';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Verification />;
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
