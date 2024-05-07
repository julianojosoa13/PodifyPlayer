import {NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthState, updateLoggedIn, updateProfile} from 'src/store/auth';
import TabNavigator from './TabNavigator';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import client from 'src/api/client';

interface Props {}

const RootNavigator: FC<Props> = props => {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(getAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthInfo = async () => {
      setLoading(true);
      try {
        const authToken = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!authToken) return;

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
        setLoading(false);
      }
    };

    fetchAuthInfo();
  }, []);

  if (loading) return null;

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
