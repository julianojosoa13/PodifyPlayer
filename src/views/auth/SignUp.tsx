import AuthInputField from '@components/form/AuthInputField';
import React, {FC, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Form from '@components/form';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import client from 'src/api/client';
import {isAxiosError} from 'axios';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import {updateNotification} from 'src/store/notification';

interface Props {}

type NewUser = {
  name: '';
  email: '';
  password: '';
};

const initialValues: NewUser = {
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
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordVisibility = () => setSecureEntry(!secureEntry);

  const disptach = useDispatch();

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true);

    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });

      navigation.navigate('Verification', {userInfo: data.user});
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      disptach(updateNotification({type: 'error', message: errorMessage}));
    }

    actions.setSubmitting(false);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupSchema}>
      <AuthFormContainer
        heading=" Welcome !"
        subHeading="Let's get started by creating your account">
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

          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('LostPassword')}
            />
            <AppLink
              title="Sign In"
              onPress={() => navigation.navigate('SignIn')}
            />
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

export default SignUp;
