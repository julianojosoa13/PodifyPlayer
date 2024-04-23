import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';

interface Props {}

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = props => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value === 'Backspace') {
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  const handlePaste = (value: string, index: number) => {
    if (value.length === 6) {
      const newOtp = value.split('');
      setOtp([...newOtp]);
      Keyboard.dismiss();
    }
  };

  const handleSubmit = () => {
    console.log(otp);
  };

  const handlePress = (index: number) => {
    setActiveOtpIndex(index);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <AuthFormContainer
      heading="Verify Email"
      subHeading="Please look at your email">
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otpFields?.map((_, index) => {
            return (
              <OTPField
                key={index}
                placeholder="*"
                ref={activeOtpIndex === index ? inputRef : null}
                onKeyPress={({nativeEvent}) => {
                  handleChange(nativeEvent.key, index);
                }}
                keyboardType="numeric"
                onChangeText={text => handlePaste(text, index)}
                value={otp[index] || ''}
                onPressIn={() => handlePress(index)}
              />
            );
          })}
        </View>

        <AppButton title="Submit" onPress={handleSubmit} />

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
