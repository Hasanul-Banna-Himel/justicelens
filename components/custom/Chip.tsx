import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export default function Chip({
  text,
  styles,
}: {
  text: string;
  styles?: { container: StyleProp<ViewStyle>; text: StyleProp<TextStyle> };
}) {
  return (
    <View style={[styles_local.chip_style, styles?.container]}>
      <Text style={[styles_local.chip_text, styles?.text]}>{text}</Text>
    </View>
  );
}

const styles_local = StyleSheet.create({
  chip_style: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 12,
  },
  chip_text: {
    textTransform: "capitalize",
  },
});
