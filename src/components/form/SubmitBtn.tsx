import AppButton from '@ui/AppButton';
import {useFormikContext} from 'formik';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = props => {
  const {submitForm, isSubmitting} = useFormikContext();
  const {title} = props;
  return <AppButton title={title} onPress={submitForm} busy={isSubmitting} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
