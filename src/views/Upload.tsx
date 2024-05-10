import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import {categories} from '@utils/categories';
import colors from '@utils/colors';
import {AxiosError} from 'axios';
import React, {FC, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {DocumentPickerResponse, types} from 'react-native-document-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import client from 'src/api/client';

import * as yup from 'yup';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
};

const audioInfoSchem = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  category: yup.string().oneOf(categories, 'Category is missing'),
  about: yup.string().trim().required('About is required'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing'),
    name: yup.string().required('Audio file is missing'),
    type: yup.string().required('Audio file is missing'),
    size: yup.number().required('Audio file is missing'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props {}

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({...defaultForm});

  const handleUpload = async () => {
    try {
      const finalData = await audioInfoSchem.validateSync(audioInfo);

      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        size: finalData.file.size,
        uri: finalData.file.uri,
      });
      if (finalData.poster.uri) {
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          size: finalData.poster.size,
          uri: finalData.poster.uri,
        });
      }

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

      const {data} = await client.post('audio/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.message);
      } else if (error instanceof AxiosError && error?.response)
        console.log(error?.response.data);
    }
  };

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
          onSelect={poster => setAudioInfo({...audioInfo, poster})}
          options={{type: [types.images]}}
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
          options={{type: [types.audio]}}
          onSelect={file => setAudioInfo({...audioInfo, file})}
          style={{marginLeft: 20}}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          onChangeText={title => setAudioInfo({...audioInfo, title})}
          value={audioInfo.title}
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
          onChangeText={about => setAudioInfo({...audioInfo, about})}
          value={audioInfo.about}
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
          setAudioInfo({...audioInfo, category: item});
          setShowCategoryModal(false);
        }}
        onRequestClose={() => setShowCategoryModal(false)}
      />
      <View style={{marginBottom: 20}} />
      <AppButton title="Upload" borderRadius={7} onPress={handleUpload} />
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
