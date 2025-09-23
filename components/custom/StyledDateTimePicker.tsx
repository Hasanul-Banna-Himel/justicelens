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

interface StyledDateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  labelBackgroundColor?: string;
  dropdownIconColor?: string;
}

const StyledDateTimePicker: React.FC<StyledDateTimePickerProps> = ({
  value,
  onChange,
  label,
  labelBackgroundColor,
  dropdownIconColor,
}) => {
  const theme = useThemeColor();
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [showPicker, setShowPicker] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((m) => m.substring(0, 3));
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateYears = () => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const startYear = oneMonthAgo.getFullYear();
    const endYear = today.getFullYear();
    const years = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(String(y));
    }
    return years.reverse();
  };

  useEffect(() => {
    const date = value ? new Date(value) : new Date();
    setHour(
      date.getHours() % 12 === 0
        ? "12"
        : String(date.getHours() % 12).padStart(2, "0")
    );
    setMinute(String(date.getMinutes()).padStart(2, "0"));
    setAmPm(date.getHours() >= 12 ? "PM" : "AM");
    setSelectedDay(String(date.getDate()).padStart(2, "0"));
    setSelectedMonth(months[date.getMonth()]);
    setSelectedYear(String(date.getFullYear()));
  }, [value]);

  useEffect(() => {
    setAvailableYears(generateYears());
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const selectedYearNum = parseInt(selectedYear, 10);

    let startMonth = 0;
    let endMonth = 11;

    if (selectedYearNum === oneMonthAgo.getFullYear()) {
      startMonth = oneMonthAgo.getMonth();
    }
    if (selectedYearNum === today.getFullYear()) {
      endMonth = today.getMonth();
    }

    if (
      oneMonthAgo.getFullYear() === today.getFullYear() &&
      selectedYearNum === today.getFullYear()
    ) {
      startMonth = oneMonthAgo.getMonth();
      endMonth = today.getMonth();
    }

    const newAvailableMonths = months.slice(startMonth, endMonth + 1);

    setAvailableMonths(newAvailableMonths);

    if (newAvailableMonths.indexOf(selectedMonth) === -1) {
      setSelectedMonth(newAvailableMonths[newAvailableMonths.length - 1]);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedYear || !selectedMonth) return;

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const selectedYearNum = parseInt(selectedYear, 10);
    const selectedMonthIndex = months.indexOf(selectedMonth);

    if (selectedMonthIndex === -1) return;

    let startDay = 1;
    let endDay = getDaysInMonth(selectedMonthIndex, selectedYearNum);

    if (
      selectedYearNum === oneMonthAgo.getFullYear() &&
      selectedMonthIndex === oneMonthAgo.getMonth()
    ) {
      startDay = oneMonthAgo.getDate();
    }
    if (
      selectedYearNum === today.getFullYear() &&
      selectedMonthIndex === today.getMonth()
    ) {
      endDay = today.getDate();
    }

    const newAvailableDays = Array.from(
      { length: endDay - startDay + 1 },
      (_, i) => String(startDay + i).padStart(2, "0")
    );
    setAvailableDays(newAvailableDays);

    if (newAvailableDays.indexOf(selectedDay) === -1) {
      setSelectedDay(newAvailableDays[newAvailableDays.length - 1]);
    }
  }, [selectedYear, selectedMonth]);

  const onSelect = () => {
    const year = parseInt(selectedYear, 10);
    const monthIndex = months.indexOf(selectedMonth);
    const day = parseInt(selectedDay, 10);

    let h = parseInt(hour, 10);
    if (amPm === "PM" && h < 12) {
      h += 12;
    } else if (amPm === "AM" && h === 12) {
      h = 0;
    }
    const m = parseInt(minute, 10);

    let finalDate = new Date(year, monthIndex, day, h, m);

    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (finalDate > today) {
      finalDate = today;
    } else if (finalDate < oneMonthAgo) {
      finalDate = oneMonthAgo;
    }

    onChange(finalDate);
    setShowPicker(false);
  };

  const renderPickerColumn = (
    data: string[],
    selectedValue: string,
    onValueChange: (value: string) => void
  ) => {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable onPress={() => onValueChange(item)}>
            <Text
              style={[
                styles.pickerItem,
                {
                  color: selectedValue === item ? theme?.primary : theme?.text,
                },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        style={styles.pickerColumn}
        initialScrollIndex={
          data.indexOf(selectedValue) > -1 ? data.indexOf(selectedValue) : 0
        }
        getItemLayout={(_, index) => ({
          length: 50, // Approximate height of item
          offset: 50 * index,
          index,
        })}
      />
    );
  };

  const displayDate = value ? new Date(value) : new Date();
  const formattedDate = `${
    months[displayDate.getMonth()]
  } ${displayDate.getDate()}, ${displayDate.getFullYear()}`;
  const formattedTime = `${
    displayDate.getHours() % 12 === 0
      ? "12"
      : String(displayDate.getHours() % 12).padStart(2, "0")
  }:${String(displayDate.getMinutes()).padStart(2, "0")} ${
    displayDate.getHours() >= 12 ? "PM" : "AM"
  }`;

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.pickerActivator, { borderColor: theme?.text }]}
        onPress={() => setShowPicker(true)}
      >
        <Text
          style={{ color: theme.text }}
        >{`${formattedDate} ${formattedTime}`}</Text>
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
              {/* Date Picker */}
              <Text
                style={{ color: theme.text, fontSize: 18, fontWeight: 500 }}
              >
                Select Date:
              </Text>
              <View
                style={[
                  styles.pickerContainer,
                  { backgroundColor: theme?.background_substitute },
                ]}
              >
                {renderPickerColumn(
                  availableMonths,
                  selectedMonth,
                  setSelectedMonth
                )}
                {renderPickerColumn(availableDays, selectedDay, setSelectedDay)}
                {renderPickerColumn(
                  availableYears,
                  selectedYear,
                  setSelectedYear
                )}
              </View>
              {/* Time Picker */}
              <Text
                style={{ color: theme.text, fontSize: 18, fontWeight: 500 }}
              >
                Select Time:
              </Text>
              <View
                style={[
                  styles.pickerContainer,
                  { backgroundColor: theme?.background_substitute },
                ]}
              >
                {renderPickerColumn(hours, hour, setHour)}
                {renderPickerColumn(minutes, minute, setMinute)}
                {renderPickerColumn(["AM", "PM"], amPm, setAmPm)}
              </View>
              <Pressable
                style={[
                  styles.closeButton,
                  { backgroundColor: theme?.background },
                ]}
                onPress={onSelect}
              >
                <Text style={{ color: theme.text }}>Select</Text>
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
  pickerItem: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    height: 50,
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

export default StyledDateTimePicker;
