import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import {categories} from '@utils/categories';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {}

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({
    category: '',
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Smodalelect Poster"
        />
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />

        <Pressable
          style={styles.categorySelector}
          onPress={() => setShowCategoryModal(true)}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholder="About"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          numberOfLines={10}
          multiline
        />
      </View>

      <CategorySelector
        title="Category"
        visible={showCategoryModal}
        data={categories}
        renderItem={item => {
          return <Text style={styles.category}>{item}</Text>;
        }}
        onSelect={item => {
          setAudioInfo({category: item});
          setShowCategoryModal(false);
        }}
        onRequestClose={() => setShowCategoryModal(false)}
      />
      <View style={{marginBottom: 20}} />
      <AppButton title="Upload" borderRadius={7} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
