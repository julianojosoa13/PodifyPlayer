import colors from '@utils/colors';
import React, {FC} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  title?: string;
  visible?: boolean;
}

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategorySelector: FC<Props> = ({visible = false, title}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>

            <ScrollView>
              <Pressable style={styles.selectorContainer}>
                <MaterialCommunityIcons
                  name="radiobox-marked"
                  color={colors.SECONDARY}
                />
                <Text style={{padding: 10}}>Business</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
    paddingVertical: '10%',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelector;
