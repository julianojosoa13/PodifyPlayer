import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import LostPassword from '@views/auth/LostPassword';
import Verification from '@views/auth/Verification';
import {AuthStackParamList} from 'src/@types/navigation';
import {useSelector} from 'react-redux';
import {getAuthState} from 'src/store/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props {}

const AuthNavigator: FC<Props> = props => {
  const authState = useSelector(getAuthState);

  console.log('authState :>> ', authState);
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
