import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import {Provider} from 'react-redux';
import store from './store';
import RootNavigator from './navigation';
import AppContainer from '@components/AppContainer';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <RootNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
