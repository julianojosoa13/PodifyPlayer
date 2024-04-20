import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Button} from 'react-native';
import * as yup from 'yup';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const signupSchema = yup.object({
  name: yup
    .string()
    .trim('Name is missing')
    .min(3, 'Invalid Name')
    .required('Name is required'),
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid Email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .min(8, 'Password is too short')
    .matches(/^\S*$/, 'Invalid character: white spaces')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple',
    )
    .required('Password is required'),
});

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState(initialValues);

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
        validationSchema={signupSchema}>
        {({submitForm, values, handleChange, errors}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                label="Name"
                placeholder="John Doe"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
                errorMsg={errors.name}
              />
              <AuthInputField
                label="Email"
                placeholder="johndoe@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.marginBottom}
                onChange={handleChange('email')}
                value={values.email}
                errorMsg={errors.email}
              />
              <AuthInputField
                label="Password"
                placeholder="******"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
                errorMsg={errors.password}
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
