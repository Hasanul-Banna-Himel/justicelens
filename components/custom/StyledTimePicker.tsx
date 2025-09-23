import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface TimePickerProps {
  value: string; // "HH:mm"
  onChange: (value: string) => void;
  dropdownIconColor?: string;
  label?: string;
  labelBackgroundColor?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  dropdownIconColor,
  label,
  labelBackgroundColor,
}) => {
  const { theme } = useThemeColor();
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (value && value.includes(":")) {
      const [h, m] = value.split(":");
      const hourNumber = parseInt(h, 10);
      if (!isNaN(hourNumber) && !isNaN(parseInt(m, 10))) {
        if (hourNumber >= 12) {
          setAmPm("PM");
          setHour(
            hourNumber === 12 ? "12" : String(hourNumber - 12).padStart(2, "0")
          );
        } else {
          setAmPm("AM");
          setHour(
            hourNumber === 0 ? "12" : String(hourNumber).padStart(2, "0")
          );
        }
        setMinute(m);
      }
    } else {
      // Set a default time if the provided value is invalid or not present
      setHour("--");
      setMinute("--");
      setAmPm("--");
    }
  }, [value]);

  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newAmPm: string
  ) => {
    let hour24 = parseInt(newHour, 10);
    if (newAmPm === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (newAmPm === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    onChange(`${String(hour24).padStart(2, "0")}:${newMinute}`);
  };

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const renderPickerColumn = (
    data: string[],
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
                selectedValue === item ? theme?.background : "transparent",
            },
          ]}
          onPress={() => onValueChange(item)}
        >
          <Text
            style={[
              styles.pickerItem,
              { color: selectedValue === item ? theme?.primary : theme?.text },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      )}
      keyExtractor={(item) => item}
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
        <Text style={{ color: theme.text }}>{`${hour}:${minute} ${amPm}`}</Text>
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
                {renderPickerColumn(hours, hour, (newHour) => {
                  setHour(newHour);
                  handleTimeChange(newHour, minute, amPm);
                })}
                {renderPickerColumn(minutes, minute, (newMinute) => {
                  setMinute(newMinute);
                  handleTimeChange(hour, newMinute, amPm);
                })}
                {renderPickerColumn(["AM", "PM"], amPm, (newAmPm) => {
                  setAmPm(newAmPm);
                  handleTimeChange(hour, minute, newAmPm);
                })}
              </View>
              <Pressable
                style={[
                  styles.closeButton,
                  { backgroundColor: theme?.background },
                ]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={{ color: theme.text }}>Correct</Text>
              </Pressable>
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

export default TimePicker;
