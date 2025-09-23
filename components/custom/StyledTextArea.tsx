import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface StyledTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  labelBackgroundColor?: string;
  numberOfLines?: number;
}

const StyledTextArea: React.FC<StyledTextAreaProps> = ({
  value,
  onChange,
  label,
  placeholder,
  labelBackgroundColor,
  numberOfLines = 4,
}) => {
  const theme = useThemeColor();

  return (
    <View style={[styles.container]}>
      <View style={[styles.input_box, { borderColor: theme?.text }]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.gray}
          style={[
            styles.input,
            { color: theme?.primary, borderColor: theme.text },
          ]}
          onChangeText={(text: string) => onChange(text)}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
        />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
  },
  input_box: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
    minHeight: 100, // Adjust as needed for a text area
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  label: {
    position: "absolute",
    top: -10, // Adjust for better positioning
    left: 10,
    paddingHorizontal: 4,
  },
});

export default StyledTextArea;
