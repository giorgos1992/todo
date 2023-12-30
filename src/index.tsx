/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useRef } from "react";
import { AppState, SafeAreaView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as RNPProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation/AppNavigation";
import { COLORS, THEME } from "@constants/styles";
import notifee, { RepeatFrequency, TriggerType } from "@notifee/react-native";

function App(): React.JSX.Element {
  const appState = useRef(AppState.currentState);
  const backgroundStyle = {
    backgroundColor: COLORS.backgroundGrey,
    flex: 1,
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current === "active" && nextAppState.match(/background/)) {
        displayNotification();
      }
      if (appState.current.match(/background/) && nextAppState === "active") {
        notifee.cancelAllNotifications();
      }
    });
    const requestPermission = async () => {
      await notifee.requestPermission();
    };
    requestPermission();
    return () => {
      subscription.remove();
    };
  }, []);

  async function displayNotification() {
    await notifee.deleteChannel("default");
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    await notifee.createTriggerNotification(
      {
        title: "You forgot something!",
        body: "There are some incomplete tasks.",
        android: {
          channelId,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + 10 * 1000,
        repeatFrequency: RepeatFrequency.NONE,
      }
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RNPProvider theme={THEME}>
              <NavigationContainer
                theme={{
                  dark: false,
                  colors: {
                    background: COLORS.backgroundGrey,
                    primary: COLORS.lightBlue,
                    border: COLORS.pureBlack,
                    card: COLORS.backgroundGrey,
                    notification: COLORS.lightBlue,
                    text: COLORS.pureBlack,
                  },
                }}
              >
                <AppNavigation />
              </NavigationContainer>
            </RNPProvider>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
