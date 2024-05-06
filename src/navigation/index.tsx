import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';
import {getAuthState} from 'src/store/auth';
import TabNavigator from './TabNavigator';

interface Props {}

const RootNavigator: FC<Props> = props => {
  const {loggedIn} = useSelector(getAuthState);
  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RootNavigator;
