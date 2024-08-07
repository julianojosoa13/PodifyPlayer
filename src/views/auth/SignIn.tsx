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
import {updateLoggedIn, updateProfile} from 'src/store/auth';
import {useDispatch} from 'react-redux';
import {Keys, saveToAsyncStorage} from '@utils/asyncStorage';
import {updateNotification} from 'src/store/notification';
import catchAsyncError from 'src/api/catchError';

interface Props {}

interface SignInUserInfo {
  email: string;
  password: string;
}

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid Email')
    .required('Email is required'),
  password: yup
    .string()
    .trim('password is missing')
    .required('Password is required'),
});

const SignIn: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const [secureEntry, setSecureEntry] = useState(true);

  const togglePasswordVisibility = () => setSecureEntry(!secureEntry);

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    actions.setSubmitting(true);
    try {
      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });

      if (data) {
        saveToAsyncStorage(Keys.AUTH_TOKEN, data.token);
        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedIn(true));
      }
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({type: 'error', message: errorMessage}));
    }
    actions.setSubmitting(false);
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signInSchema}>
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
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('LostPassword')}
            />
            <AppLink
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
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

export default SignIn;
