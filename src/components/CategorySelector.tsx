import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props<T> {
  data: T[];
  title?: string;
  visible?: boolean;
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategorySelector = <T extends any>({
  visible = false,
  data,
  title,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>

            <ScrollView>
              {data.map((item, index) => {
                const name =
                  selectedIndex === index
                    ? 'radiobox-marked'
                    : 'radiobox-blank';
                return (
                  <Pressable
                    onPress={() => handleSelect(item, index)}
                    style={styles.selectorContainer}
                    key={index}>
                    <MaterialCommunityIcons
                      name={name}
                      color={colors.SECONDARY}
                      size={18}
                    />
                    {renderItem(item)}
                  </Pressable>
                );
              })}
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
    zIndex: -1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: -1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONTRAST,
    zIndex: 2,
    elevation: 4,
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
