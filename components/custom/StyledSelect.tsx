import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface StyledSelectProps {
  value: string; // "HH:mm"
  onChange: (value: string) => void;
  dropdownIconColor?: string;
  label?: string;
  labelBackgroundColor?: string;
  options: { text: string; value: string }[];
}

const StyledSelect: React.FC<StyledSelectProps> = ({
  value,
  onChange,
  dropdownIconColor,
  label,
  labelBackgroundColor,
  options,
}) => {
  const { theme } = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);

  const renderPickerColumn = (
    data: { text: string; value: string }[],
    selectedValue: string,
    onValueChange: (value: string) => void
  ) => (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles?.pickerItemsContainer,
            {
              backgroundColor:
                selectedValue === item?.value
                  ? theme?.background
                  : "transparent",
            },
          ]}
          onPress={() => onValueChange(item.value)}
        >
          <Text
            style={[
              styles.pickerItem,
              {
                color:
                  selectedValue === item.value ? theme?.primary : theme?.text,
                fontWeight: selectedValue === item.value ? "600" : "400",
              },
            ]}
          >
            {item.text}
          </Text>
        </Pressable>
      )}
      keyExtractor={(item, index) => index + item.value}
      showsVerticalScrollIndicator={false}
      style={styles.pickerColumn}
    />
  );

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.pickerActivator, { borderColor: theme?.text }]}
        onPress={() => setShowPicker(true)}
      >
        <Text
          style={{ color: theme.text, textTransform: "capitalize", flex: 1 }}
        >
          {value !== "" ? value : "Select Option"}
        </Text>
        <Ionicons
          name="chevron-down"
          size={24}
          color={dropdownIconColor || theme.text}
        />
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
      </Pressable>

      <Modal
        transparent={true}
        visible={showPicker}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <SafeAreaView style={[styles.modalContainer]}>
          <View style={[styles.popover]}>
            <Pressable
              style={[styles.pickerLeftArea]}
              onPress={() => setShowPicker(false)}
            ></Pressable>
            <View
              style={[
                styles.pickerWrapper,
                { backgroundColor: theme?.background_substitute },
              ]}
            >
              <View
                style={[
                  styles.pickerContainer,
                  { backgroundColor: theme?.background_substitute },
                ]}
              >
                {renderPickerColumn(options, value, (val) => {
                  onChange(val);
                  setShowPicker(false);
                })}
              </View>
              {/* <Pressable
                style={[
                  styles.closeButton,
                  { backgroundColor: theme?.background },
                ]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={{ color: theme.text }}>Correct</Text>
              </Pressable> */}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
  },
  pickerActivator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    position: "relative",
  },
  label: {
    position: "absolute",
    top: "-50%",
    left: 10,
    paddingHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  popover: {
    flex: 1,
  },
  pickerLeftArea: {
    flex: 1,
  },
  pickerWrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
  },
  pickerColumn: {
    flex: 1,
  },
  pickerItemsContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  pickerItem: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
  },
  selectedPickerItem: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
});

export default StyledSelect;
