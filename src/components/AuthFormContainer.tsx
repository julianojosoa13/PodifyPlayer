import CircleUI from '@ui/CircleUI';
import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface Props {
  heading: string;
  subHeading: string;
  children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({heading, subHeading, children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <CircleUI size={200} position="top-left" />
      <CircleUI size={100} position="top-right" />
      <CircleUI size={100} position="bottom-left" />
      <CircleUI size={200} position="bottom-right" />
      <View style={styles.headerContainer}>
        <Image source={require('src/assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
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
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {fontSize: 16, color: colors.CONTRAST},
  headerContainer: {width: '100%', marginBottom: 20},
});

export default AuthFormContainer;
