import React, { useState } from "react";
import { View, Text } from "react-native";
import { MAIN_PRIMARY_COLOUR } from "../../constants";
import { SchedulesReminders } from "./SchedulesReminders";
import { SchedulesHistory } from "./SchedulesHistory";

export function ScheduleSection({
  calendar,
  text,
  navigation,
  currentUserReminders,
  setCurrentUserReminders,
  modalVisible,
  setModalVisible,
}) {
  const today = new Date();
  const [] = useState({
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [selectedDay, setSelectedDay] = useState();

  return (
    <View
      style={{
        width: "100%",
        marginTop: calendar ? 24 : 12,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "WorkSans_800ExtraBold",
          color: MAIN_PRIMARY_COLOUR,
          marginBottom: 8,
          paddingHorizontal: 8,
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
      {text === "Your History" && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "WorkSans_400Regular",
            color: MAIN_PRIMARY_COLOUR,
            marginBottom: 8,
            paddingHorizontal: 8,
          }}
        >
          Select a day to see its trip history.
        </Text>
      )}

      {!calendar && currentUserReminders.length > 0 ? (
        <SchedulesReminders
          currentUserReminders={currentUserReminders}
          setCurrentUserReminders={setCurrentUserReminders}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : (
        !calendar && (
          <Text
            style={{
              fontSize: 16,
              fontFamily: "WorkSans_400Regular",
              color: MAIN_PRIMARY_COLOUR,
              paddingHorizontal: 8,
            }}
          >
            You currently have no reminders set.
          </Text>
        )
      )}
      {calendar && (
        <SchedulesHistory
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          navigation={navigation}
        />
      )}
    </View>
  );
}
