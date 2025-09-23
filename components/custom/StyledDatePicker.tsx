import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface StyledDatePickerProps {
  value: Date | string | undefined | null;
  onChange: Dispatch<SetStateAction<string | null | undefined>>;
  label?: string;
  labelBackgroundColor?: string;
  dropdownIconColor?: string;
}

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({
  value,
  onChange,
  label,
  labelBackgroundColor,
  dropdownIconColor,
}) => {
  const theme = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);
  const [StructuredDate, setStructuredDate] = useState<Date>();

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const months = useMemo(() => {
    return [
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
    ];
  }, []);
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = 1980; y <= currentYear; y++) {
      years.push(String(y));
    }
    return years.reverse();
  };

  useEffect(() => {
    let date = new Date();
    if (value) {
      if (value instanceof Date) {
        date = new Date(value);
      } else if (value && typeof value === "string") {
        const parts = value.split(/[./-]/);
        if (parts.length === 3) {
          let year, month, day;
          const p0 = parseInt(parts[0], 10);
          const p1 = parseInt(parts[1], 10);
          const p2 = parseInt(parts[2], 10);

          if (p2 > 1000) {
            // YYYY at the end
            year = p2;
            if (p0 > 12) {
              // DD/MM/YYYY
              day = p0;
              month = p1;
            } else {
              // Assume MM/DD/YYYY
              month = p0;
              day = p1;
            }
          } else if (p0 > 1000) {
            // YYYY at the start
            year = p0;
            month = p1;
            day = p2;
          }

          if (year && month && day) {
            date = new Date(year, month - 1, day);
          } else {
            date = new Date("invalid");
          }
        } else {
          date = new Date(value); // Fallback for other string formats
        }
      }
    }
    //

    if (isNaN(date.getTime())) {
      date = new Date();
    }
    setStructuredDate(date);
    setSelectedDay(String(date.getDate()).padStart(2, "0"));
    setSelectedMonth(months[date.getMonth()]);
    setSelectedYear(String(date.getFullYear()));
  }, [value, months]);

  const onSelect = () => {
    const year = parseInt(selectedYear, 10);
    const monthIndex = months.indexOf(selectedMonth);
    let day = parseInt(selectedDay, 10);

    const daysInMonth = getDaysInMonth(monthIndex, year);
    if (day > daysInMonth) {
      day = daysInMonth;
    }

    let finalDate = new Date(year, monthIndex, day);

    const today = new Date();
    if (finalDate > today) {
      finalDate = today;
    }

    onChange(finalDate?.toLocaleDateString());
    setShowPicker(false);
  };

  const renderPickerColumn = (
    data: string[],
    selectedValue: string,
    onValueChange: (value: string) => void
  ) => (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Pressable onPress={() => onValueChange(item)}>
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

  let displayDate = StructuredDate ?? new Date();
  if (isNaN(displayDate.getTime())) {
    displayDate = new Date();
  }
  const formattedDate = `${
    months[displayDate.getMonth()]
  } ${displayDate.getDate()}, ${displayDate.getFullYear()}`;

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.pickerActivator, { borderColor: theme?.text }]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={{ color: theme.text }}>
          {value ? formattedDate : "--"}
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
                {renderPickerColumn(months, selectedMonth, setSelectedMonth)}
                {renderPickerColumn(days, selectedDay, setSelectedDay)}
                {renderPickerColumn(
                  generateYears(),
                  selectedYear,
                  setSelectedYear
                )}
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

export default StyledDatePicker;
