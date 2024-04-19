import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Button} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorInfo, setErrorInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          label="Name"
          placeholder="John Doe"
          containerStyle={styles.marginBottom}
          errorMsg={errorInfo.name}
          onChange={text => setUserInfo({...userInfo, name: text})}
        />
        <AuthInputField
          label="Email"
          placeholder="johndoe@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
          errorMsg={errorInfo.email}
          onChange={text => setUserInfo({...userInfo, email: text})}
        />
        <AuthInputField
          label="Password"
          placeholder="******"
          autoCapitalize="none"
          errorMsg={errorInfo.password}
          secureTextEntry
          onChange={text => setUserInfo({...userInfo, password: text})}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            if (!userInfo.name) {
              return setErrorInfo({
                email: '',
                password: '',
                name: 'Name is missings',
              });
            }

            if (!userInfo.email) {
              return setErrorInfo({
                password: '',
                name: '',
                email: 'Email is missings',
              });
            }

            if (!userInfo.password) {
              return setErrorInfo({
                name: '',
                email: '',
                password: 'Password is missings',
              });
            }

            setErrorInfo({
              name: '',
              email: '',
              password: '',
            });

            console.log(userInfo);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
