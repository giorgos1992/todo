import { Animated } from "react-native";
import { fireEvent, render, waitFor } from "test-utils";
import Action from "./Action";

describe("test generic Action component", () => {
  test("should render the component correctly", async () => {
    const { getByTestId } = render(
      <Action
        onPress={() => {}}
        text="test"
        testId="test"
        color="red"
        x={0}
        progress={new Animated.Value(0)}
      />
    );
    await waitFor(() => {
      expect(getByTestId("test-window")).toBeDefined();
    });
  });

  test("should call the onPress function when the rectButton is pressed", async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Action
        onPress={spy}
        text="test"
        testId="test"
        color="red"
        x={0}
        progress={new Animated.Value(0)}
      />
    );
    await waitFor(() => {
      expect(getByTestId("test-button")).toBeDefined();
    });
    fireEvent.press(getByTestId("test-button"));
    expect(spy).toHaveBeenCalled();
  });
});
