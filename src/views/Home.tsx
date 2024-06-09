import AppButton from '@ui/AppButton';
import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
interface Props {}

const Home: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
