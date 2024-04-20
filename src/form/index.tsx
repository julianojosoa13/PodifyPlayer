import {Formik, FormikHelpers} from 'formik';
import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface Props<T> {
  initialValues: any;
  validationSchema: T;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
}

const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}></Formik>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Form;
