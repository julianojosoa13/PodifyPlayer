import colors from '@utils/colors';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: FC<Props> = ({title, active = true, onPress}) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      hitSlop={8}
      style={{opacity: active ? 1 : 0.4}}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {color: colors.SECONDARY},
});

export default AppLink;
