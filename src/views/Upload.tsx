import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface Props {}

const Upload: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 30, color: 'white'}}>Upload</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Upload;
