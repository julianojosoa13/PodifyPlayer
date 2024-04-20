import {Formik, FormikHelpers} from 'formik';
import React, {ReactNode} from 'react';

interface Props<T> {
  initialValues: any;
  validationSchema: T;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children: ReactNode;
}

const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}>
      {props.children}
    </Formik>
  );
};

export default Form;
