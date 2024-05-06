import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface Props {}

const Home: FC<Props> = props => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
