import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          label="Name"
          placeholder="John Doe"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          label="Email"
          placeholder="johndoe@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          label="Password"
          placeholder="******"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
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
