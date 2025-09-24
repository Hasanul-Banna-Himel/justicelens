import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface StyledImagePickerProps {
  value: string | null;
  onChange: (uri: string | null) => void;
  label?: string;
  placeholder?: string;
  labelBackgroundColor?: string;
}

const StyledImagePicker: React.FC<StyledImagePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select an image",
  labelBackgroundColor,
}) => {
  const { theme } = useThemeColor();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    } else {
      onChange(null);
    }
  };

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.pickerActivator, { borderColor: theme?.text }]}
        onPress={pickImage}
      >
        {value ? (
          <Image
            source={{ uri: value }}
            style={styles.imagePreview}
            contentFit="cover"
          />
        ) : (
          <>
            <Text style={{ color: theme.gray }}>{placeholder}</Text>
            <Ionicons
              name="image"
              size={24}
              color={theme.text}
              style={styles.icon}
            />
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
    top: -10, // Adjust for better positioning
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
    position: "absolute",
    opacity: 0.5, // Make icon slightly transparent when image is present
  },
});

export default StyledImagePicker;
