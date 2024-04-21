import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {useFormikContext} from 'formik';
import React, {FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthInputField: FC<Props> = props => {
  const inputTransformValue = useSharedValue(0);

  const {handleChange, errors, values, handleBlur, touched, handleSubmit} =
    useFormikContext<{
      [key: string]: string;
    }>();

  const {
    name,
    label,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
  } = props;

  const errorMsg = touched && errors[name] ? errors[name] : '';

  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, {duration: 50}),
      withSpring(0, {
        damping: 8,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: inputTransformValue.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (errorMsg) shakeUI();
  }, [errorMsg]);

  return (
    <Animated.View style={[containerStyle, inputStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        value={values[name]}
        onBlur={handleBlur(name)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  label: {color: colors.CONTRAST},
  errorMsg: {color: colors.ERROR},
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});

export default AuthInputField;
