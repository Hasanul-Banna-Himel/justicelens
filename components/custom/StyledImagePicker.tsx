import { useThemeColor } from "@/hooks/useThemeColor";
import { deleteImage, uploadImage } from "@/utils/cloudinary";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface StyledImagePickerProps {
  value: string | null | undefined;
  onChange: (uri: string | null) => void;
  label?: string;
  placeholder?: string;
  labelBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const StyledImagePicker: React.FC<StyledImagePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
  labelBackgroundColor,
  style,
}) => {
  const { theme } = useThemeColor();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true);
      try {
        const { url: cloudinaryUrl } = await uploadImage(result.assets[0].uri);
        if (cloudinaryUrl) {
          // If there was a previous image, delete it from Cloudinary

          if (value) {
            await deleteImage(value);
          }
          onChange(cloudinaryUrl);
        } else {
          onChange(null);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        onChange(null);
      } finally {
        setUploading(false);
      }
    } else {
      // If user cancels image selection, and there was a previous image, keep it.
      // If there was no previous image, set to null.
      if (!value) {
        onChange(null);
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.pickerActivator, { borderColor: theme?.text }, style]}
        onPress={pickImage}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : value ? (
          <Image
            source={{ uri: value }}
            style={styles.imagePreview}
            contentFit="cover"
          />
        ) : (
          <>
            <Ionicons
              name="image"
              size={24}
              color={theme.text}
              style={styles.icon}
            />
            <Text style={{ color: theme.gray, textAlign: "center" }}>
              {placeholder}
            </Text>
          </>
        )}
        {label && (
          <Text
            style={[
              styles.label,
              {
                color: theme?.text,
                backgroundColor: labelBackgroundColor ?? theme.background,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
  },
  pickerActivator: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
    aspectRatio: 1.91,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 4,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    position: "absolute",
  },
  icon: {
    opacity: 0.5,
  },
});

export default StyledImagePicker;
