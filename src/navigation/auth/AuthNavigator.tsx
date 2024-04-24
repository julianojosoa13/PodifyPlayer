import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import LostPassword from '@views/auth/LostPassword';
import Verification from '@views/auth/Verification';

const Stack = createNativeStackNavigator<{
  SignIn: undefined;
  SignUp: undefined;
  LostPassword: undefined;
  Verification: undefined;
}>();

interface Props {}

const AuthNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;
