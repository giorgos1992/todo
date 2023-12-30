import { render } from "test-utils";
import Swipeable from "./Swipeable";
import { View } from "react-native";

describe("test generic Swipeable component", () => {
  test("should render the component correctly", () => {
    const { getByTestId } = render(
      <Swipeable
        testID="test"
        Action={() => <View testID="action"></View>}
        id="1"
      >
        <></>
      </Swipeable>
    );
    expect(getByTestId("test")).toBeDefined();
  });
});
