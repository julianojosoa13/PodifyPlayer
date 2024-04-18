import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, TextInputProps, TextInput} from 'react-native';

interface Props extends TextInputProps {}

const AppInput: FC<Props> = props => {
  return (
    <TextInput
      {...props}
      placeholder={props.placeholder}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    color: colors.CONTRAST,
    padding: 10,
    borderRadius: 25,
  },
});

export default AppInput;
