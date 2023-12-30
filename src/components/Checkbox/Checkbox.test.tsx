import { render } from "test-utils";
import Checkbox from "./Checkbox";

describe("test generic Checkbox component", () => {
  test("should render the component correctly", () => {
    const { getByTestId } = render(<Checkbox status="checked" testID="test" />);
    expect(getByTestId("test")).toBeDefined();
  });
  test("should have border color", () => {
    const { getByTestId } = render(<Checkbox status="checked" testID="test" />);
    expect(getByTestId("test")).toHaveStyle({ borderColor: "#000" });
  });
  test("should have the correct status", () => {
    const { getByTestId } = render(<Checkbox status="checked" testID="test" />);
    expect(getByTestId("test").children[0]).toHaveProp("status", "checked");
  });
  test("should have the correct status when uncecked", () => {
    const { getByTestId } = render(
      <Checkbox status="unchecked" testID="test" />
    );
    expect(getByTestId("test").children[0]).toHaveProp("status", "unchecked");
  });
});
