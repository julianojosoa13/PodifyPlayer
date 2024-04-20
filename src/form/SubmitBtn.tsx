import {useFormikContext} from 'formik';
import React, {FC} from 'react';
import {Button, StyleSheet} from 'react-native';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = props => {
  const {submitForm} = useFormikContext();
  const {title} = props;
  return <Button title={title} onPress={submitForm} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
