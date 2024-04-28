import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Text} from 'react-native';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import OTPField from '@ui/OTPField';
import AppButton from '@ui/AppButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '@utils/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(false);
  const [countDown, setCountDown] = useState(60);
  const inputRef = useRef<TextInput>(null);

  const {userInfo} = route.params;

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

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;
    setSubmitting(true);
    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      // navigate back to sign in
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error inside Verification ', error);
    }
    setSubmitting(true);
  };

  const handlePress = (index: number) => {
    setActiveOtpIndex(index);
  };

  const resendOTP = async () => {
    setCountDown(60);
    setCanSendNewOtpRequest(false);
    try {
      await client.post('/auth/re-verify-email', {userIId: userInfo.id});
    } catch (error) {
      console.log('Requesting for new OTP ', error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSendNewOtpRequest) return;

    const intervalId = setInterval(() => {
      setCountDown(oldvalue => {
        if (oldvalue <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);

          return 0;
        }
        return oldvalue - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);
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

        <AppButton title="Submit" onPress={handleSubmit} busy={submitting} />

        <View style={styles.linkContainer}>
          {countDown > 0 ? (
            <Text style={styles.countDown}>{countDown} sec</Text>
          ) : null}
          <AppLink
            active={canSendNewOtpRequest}
            title="Resend OTP"
            onPress={resendOTP}
          />
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
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default Verification;
