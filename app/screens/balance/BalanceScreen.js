import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  MAIN_PRIMARY_COLOUR,
  ScreenHeadingStyles,
  OpalDetails,
} from "../../constants";
import {
  useNavigation,
  NavigationContainer,
  StackActions,
} from "@react-navigation/native";
import opalIcon from "../../assets/opal.png";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsButton } from "./SettingsButton";
import { SettingsScreen } from "./SettingsScreen";

const Stack = createStackNavigator();

export function BalanceScreen() {
  // const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OpalScreen" component={OpalScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export function OpalScreen({ navigation }) {
  const [opalCardNum, setOpalCardNum] = useState("");
  const [opalCardPass, setOpalCardPass] = useState("");
  const [userMatched, setUserMatched] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <SettingsButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          position: "relative",
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Text style={ScreenHeadingStyles}>Balance</Text>
        <Text
          style={{
            fontSize: 18,
            color: MAIN_PRIMARY_COLOUR,
            marginTop: 8,
            fontFamily: "WorkSans_400Regular",
          }}
        >
          View and manage your Opal Balance.
        </Text>
        {!userMatched ? (
          <OpalSignIn
            opalCardNum={opalCardNum}
            opalCardPass={opalCardPass}
            setOpalCardNum={setOpalCardNum}
            setOpalCardPass={setOpalCardPass}
            setUserMatched={setUserMatched}
          />
        ) : (
          <DisplayOpalBalance
            userMatched={userMatched}
            setUserMatched={setUserMatched}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function DisplayOpalBalance({ userMatched, setUserMatched }) {
  console.log(userMatched);
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          fontFamily: "WorkSans_700Bold",
          marginTop: 24,
          color: MAIN_PRIMARY_COLOUR,
        }}
      >
        OPAL BALANCE - {userMatched["type"]}, {userMatched["name"]}
      </Text>
    </View>
  );
}

function OpalSignIn({
  opalCardNum,
  opalCardPass,
  setOpalCardNum,
  setOpalCardPass,
  setUserMatched,
}) {
  return (
    <View style={{ justifyContent: "center", width: "100%" }}>
      <Text
        style={{
          fontFamily: "WorkSans_700Bold",
          marginTop: 24,
          color: MAIN_PRIMARY_COLOUR,
        }}
      >
        OPAL BALANCE
      </Text>
      <OpalCardInput
        placeholder="Opal Card Number..."
        text={opalCardNum}
        setText={setOpalCardNum}
      />
      <OpalCardInput
        placeholder="Opal Security Code or Password..."
        text={opalCardPass}
        setText={setOpalCardPass}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 24,
          paddingHorizontal: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              color: MAIN_PRIMARY_COLOUR,
              fontFamily: "WorkSans_400Regular",
              fontSize: 10,
              textDecorationLine: "underline",
            }}
          >
            Forgot username/password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: MAIN_PRIMARY_COLOUR,
            borderRadius: 24,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
          onPress={() => {
            console.log(opalCardNum);
            console.log(opalCardPass);
            console.log(OpalDetails);
            const match = OpalDetails.filter((userDetails) => {
              if (
                userDetails["OpalCardNum"] === opalCardNum &&
                userDetails["OpalCardPass"] === opalCardPass
              ) {
                return userDetails;
              }
            });
            if (match.length > 0) {
              setUserMatched(match[0]);
            } else {
              // todo error message - invalid user/password.
            }
          }}
        >
          <Image
            source={opalIcon}
            style={{
              width: 30,
              height: 10,
              resizeMode: "contain",
              marginRight: 2,
            }}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "WorkSans_700Bold",
              marginTop: -1,
              fontSize: 10,
            }}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OpalCardInput({ placeholder, text, setText }) {
  return (
    <TextInput
      style={{
        height: 46,
        backgroundColor: "white",
        width: "100%",
        borderRadius: 24,
        paddingLeft: 24,
        fontFamily: "WorkSans_300Light",
        fontSize: 16,
        color: MAIN_PRIMARY_COLOUR,
        marginTop: 8,
      }}
      onChangeText={(input) => {
        setText(input);
      }}
      value={text}
      placeholder={placeholder}
    />
  );
}
