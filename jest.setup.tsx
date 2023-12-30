import React from "react";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { NativeModules } from "react-native";

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useTheme: jest
    .fn()
    .mockImplementation(
      () => jest.requireActual("@react-navigation/native").DefaultTheme
    ),
  useRoute: jest.fn(),
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation(),
    replace: jest.fn().mockImplementation(),
    goBack: jest.fn().mockImplementation((x) => x),
    setOptions: jest.fn().mockImplementation((x) => x),
    addListener: jest.fn().mockImplementation((_x, a) => {
      a();
      return jest.fn();
    }),
  }),
  navigation: jest.fn().mockReturnValue({
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    goBack: jest.fn().mockImplementation((x) => x),
    setOptions: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  }),
  StackActions: {
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  },
}));

jest.mock("@react-navigation/core", () => ({
  ...jest.requireActual("@react-navigation/core"),
  createRouter: jest.requireActual("@react-navigation/core").createRouter,
  useNavigationParam: jest.fn(
    jest.requireActual("@react-navigation/core").useNavigationParam
  ),
  StackActions: {
    navigate: jest.fn().mockImplementation((x) => x),
    dispatch: jest.fn().mockImplementation((x) => x),
    replace: jest.fn().mockImplementation((x) => x),
  },
}));

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const actualRequire = jest.requireActual("react-native-safe-area-context");
  const SafeAreaProvider = actualRequire.SafeAreaProvider;

  return {
    ...actualRequire,
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => (
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        {children}
      </SafeAreaProvider>
    )),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn(() => inset),
  };
});
