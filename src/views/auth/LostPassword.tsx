import AuthInputField from '@components/form/AuthInputField';
import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Form from '@components/form';
import * as yup from 'yup';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const LostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Email is missing')
    .email('Invalid Email')
    .required('Email is required'),
});

const LostPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validationSchema={LostPasswordSchema}>
      <AuthFormContainer
        heading="Forget Password"
        subHeading="Oops, did you forget your password? Don't worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            label="Email"
            placeholder="johndoe@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
            name="email"
          />

          <SubmitBtn title="Send link" />

          <View style={styles.linkContainer}>
            <AppLink
              title="Sign In"
              onPress={() => navigation.navigate('SignIn')}
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

export default LostPassword;
