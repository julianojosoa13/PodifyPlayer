import AuthInputField from 'src/form/AuthInputField';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Button} from 'react-native';
import Form from 'src/form';
import * as yup from 'yup';
import SubmitBtn from 'src/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';

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
  const [secureEntry, setSecureEntry] = useState(false);

  const togglePasswordVisibility = () => setSecureEntry(!secureEntry);

  return (
    <SafeAreaView style={styles.container}>
      <Form
        initialValues={initialValues}
        onSubmit={values => console.log(values)}
        validationSchema={signupSchema}>
        <View style={styles.formContainer}>
          <AuthInputField
            label="Name"
            placeholder="John Doe"
            containerStyle={styles.marginBottom}
            name="name"
          />
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
          <SubmitBtn title="Sign Up" />
        </View>
      </Form>
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
