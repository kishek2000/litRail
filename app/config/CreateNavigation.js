import React, { useState, useCallback } from "react";
import { Image, Text } from "react-native";
import {
  MAIN_PRIMARY_COLOUR,
  homeTab,
  routesTab,
  schedulesTab,
  balanceTab,
  homeTabFocused,
  routesTabFocused,
  schedulesTabFocused,
  balanceTabFocused,
} from "../constants";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../screens/home/HomeScreen";
import { BalanceScreen } from "../screens/balance/BalanceScreen";
import { ScheduleScreen } from "../screens/schedules/SchedulesScreen";
import { RoutesScreen } from "../screens/routes/RoutesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Logo } from "../components/Logo";
import { User } from "../classes/User";
export const Tab = createBottomTabNavigator();

export function CreateNavigation() {
  const [editMode, setEditMode] = useState(false);
  const newUser = new User();
  const [currentUserTrips, setCurrentUserTrips] = useState([]);
  const [currentUserReminders, setCurrentUserReminders] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            height: 70,
            display: editMode ? "none" : null,
          },
        }}
        screenOptions={({ route }) => ({
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 12,
                  paddingBottom: 6,
                  fontFamily: focused
                    ? "WorkSans_700Bold"
                    : "WorkSans_500Medium",
                  color: focused ? MAIN_PRIMARY_COLOUR : "#7472AB",
                }}
              >
                {route.name}
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            if (route.name === "HOME") {
              return (
                <Image
                  source={focused ? homeTabFocused : homeTab}
                  style={{
                    width: 36,
                    height: 28,
                    resizeMode: "contain",
                    marginBottom: -10,
                  }}
                />
              );
            } else if (route.name === "ROUTES") {
              return (
                <Image
                  source={focused ? routesTabFocused : routesTab}
                  style={{
                    width: 36,
                    height: 28,
                    resizeMode: "contain",
                    marginBottom: -10,
                  }}
                />
              );
            } else if (route.name === "SCHEDULE") {
              return (
                <Image
                  source={focused ? schedulesTabFocused : schedulesTab}
                  style={{
                    width: 36,
                    height: 28,
                    resizeMode: "contain",
                    marginBottom: -10,
                  }}
                />
              );
            } else if (route.name === "BALANCE") {
              return (
                <Image
                  source={focused ? balanceTabFocused : balanceTab}
                  style={{
                    width: 36,
                    height: 28,
                    resizeMode: "contain",
                    marginBottom: -10,
                  }}
                />
              );
            }
          },
        })}
      >
        <Tab.Screen
          name="HOME"
          children={() => (
            <HomeScreen
              editMode={editMode}
              setEditMode={setEditMode}
              currentUserTrips={currentUserTrips}
              setCurrentUserTrips={setCurrentUserTrips}
            />
          )}
        />
        <Tab.Screen
          name="ROUTES"
          children={() => (
            <RoutesScreen
              currentUser={newUser}
              setCurrentUserTrips={setCurrentUserTrips}
              currentUserTrips={currentUserTrips}
              currentUserReminders={currentUserReminders}
              setCurrentUserReminders={setCurrentUserReminders}
            />
          )}
        />
        <Tab.Screen
          name="SCHEDULE"
          children={() => (
            <ScheduleScreen
              currentUser={newUser}
              currentUserReminders={currentUserReminders}
              setCurrentUserReminders={setCurrentUserReminders}
            />
          )}
        />
        <Tab.Screen
          name="BALANCE"
          children={() => <BalanceScreen currentUser={newUser} />}
        />
      </Tab.Navigator>
      <Logo />
    </NavigationContainer>
  );
}
