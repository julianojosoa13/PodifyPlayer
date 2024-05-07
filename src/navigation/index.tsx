import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedIn,
  updateProfile,
} from 'src/store/auth';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import client from 'src/api/client';
import Loader from '@ui/Loader';
import colors from '@utils/colors';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

interface Props {}

const RootNavigator: FC<Props> = props => {
  const dispatch = useDispatch();
  const {loggedIn, busy} = useSelector(getAuthState);

  useEffect(() => {
    const fetchAuthInfo = async () => {
      try {
        dispatch(updateBusyState(true));

        const authToken = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!authToken) {
          dispatch(updateBusyState(false));
          return;
        }
        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log(data);
        if (data) {
          dispatch(updateLoggedIn(true));
          dispatch(updateProfile(data.profile));
        }
      } catch (error) {
        console.log('Auth error :>> ', error);
      } finally {
        dispatch(updateBusyState(false));
      }
    };

    fetchAuthInfo();
  }, []);

  if (busy)
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: colors.OVERLAY,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <Loader />
      </View>
    );

  return (
    <NavigationContainer theme={AppTheme}>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RootNavigator;
