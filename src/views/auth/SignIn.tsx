import AuthInputField from '@components/form/AuthInputField';
import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Form from '@components/form';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const signupSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid Email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const SignIn: FC<Props> = props => {
  const [secureEntry, setSecureEntry] = useState(false);

  const togglePasswordVisibility = () => setSecureEntry(!secureEntry);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validationSchema={signupSchema}>
      <AuthFormContainer heading=" Welcome Back!">
        <View style={styles.formContainer}>
          <AuthInputField
            label="Email"
            placeholder="johndoe@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
            name="email"
          />
          <AuthInputField
            label="Password"
            placeholder="******"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            name="password"
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={togglePasswordVisibility}
          />
          <SubmitBtn title="Sign In" />

          <View style={styles.linkContainer}>
            <AppLink title="I Lost My Password" />
            <AppLink title="Sign Up" />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SignIn;
