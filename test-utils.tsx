import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Provider as RNPProvider } from "react-native-paper";
import "@testing-library/jest-native/extend-expect";
import { THEME } from "@constants/styles";

const customRender = (
  ui: ReactElement,
  {
    mockedState,
    ...options
  }: Omit<RenderOptions, "wrapper"> & { mockedState?: unknown } = {}
) => {
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    const mockedStore = configureMockStore();

    return (
      <SafeAreaProvider>
        <ReduxProvider store={mockedStore(mockedState)}>
          <RNPProvider theme={THEME}>{children}</RNPProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
