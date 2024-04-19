import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Button} from 'react-native';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState(initialValues);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {({submitForm, values, handleChange}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                label="Name"
                placeholder="John Doe"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
              />
              <AuthInputField
                label="Email"
                placeholder="johndoe@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.marginBottom}
                onChange={handleChange('email')}
                value={values.email}
              />
              <AuthInputField
                label="Password"
                placeholder="******"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
              />
              <Button title="Sign Up" onPress={submitForm} />
            </View>
          );
        }}
      </Formik>
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
