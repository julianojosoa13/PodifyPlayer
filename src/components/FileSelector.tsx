import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import DocumentPicker, {
  DocumentPickerOptions,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {SupportedPlatforms} from 'react-native-document-picker/lib/typescript/fileTypes';

interface Props {
  icon?: ReactNode;
  btnTitle?: string;
  style?: StyleProp<ViewStyle>;
  onSelect(file: DocumentPickerResponse): void;
  options: DocumentPickerOptions<SupportedPlatforms>;
}

/**
 * A component for selecting a single file from the device's file system.
 */
const FileSelector: FC<Props> = ({
  /**
   * Icon to display next to the file picker button
   */
  icon,
  /**
   * Title of the file picker button
   */
  btnTitle,
  /**
   * Custom styles to apply to the file picker button
   */
  style,
  /**
   * Callback function to invoke with the selected file
   *
   * @param file The selected file
   */
  onSelect,
  options,
}) => {
  /**
   * Handle document selection from the file picker
   *
   * @returns {Promise<void>}
   */
  const handleDocumentSelect = async (): Promise<void> => {
    try {
      // Pick a single file from the file picker
      const document = await DocumentPicker.pick(options);

      // Extract the file from the returned array
      const file = document[0];

      // Invoke the passed in onSelect callback with the selected file
      onSelect(file);
    } catch (error) {
      // If the user cancels the picker, ignore the error
      if (!DocumentPicker.isCancel(error)) {
        console.log('error picking document :>> ', error);
      }
    }
  };

  return (
    <Pressable
      style={[styles.btnContainer, style]}
      onPress={handleDocumentSelect}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.btnTitle}>{btnTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: 70,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: colors.CONTRAST,
    marginTop: 10,
  },
});

export default FileSelector;
