import React, {FC, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface Props {}

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = props => {
  const inputRef = useRef<TextInput>(null);

  inputRef.current?.focus();

  return (
    <AuthFormContainer
      heading="Verify Email"
      subHeading="Please look at your email">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otpFields?.map((_, index) => {
            return <OTPField key={index} placeholder="*" ref={inputRef} />;
          })}
        </View>

        <AppButton title="Submit" />

        <View style={styles.linkContainer}>
          <AppLink title="Resend OTP" />
        </View>
      </View>
    </AuthFormContainer>
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
    alignItems: 'flex-end',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Verification;
