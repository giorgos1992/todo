jest.useFakeTimers();
import { fireEvent, render } from "test-utils";
import Input from "./Input";

describe("test generic Input component", () => {
  test("should render the component correctly", () => {
    const { getByTestId } = render(
      <Input testID="test" value="" setValue={() => {}} />
    );
    expect(getByTestId("test")).toBeDefined();
  });
  test("should have the correct value", () => {
    const { getByTestId } = render(<Input value="test" setValue={() => {}} />);
    expect(getByTestId("input")).toHaveProp("value", "test");
  });
  test("should call the setValue function when the text changes", () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Input testID="test" value="" setValue={spy} />
    );
    getByTestId("test").props.onChangeText("test");
    expect(spy).toHaveBeenCalled();
  });
  test("should have red border when value is empty", () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Input testID="test" value="" setValue={spy} />
    );
    const inputContainer =
      getByTestId("test").parent?.parent?.parent?.parent?.parent?.parent;
    expect(inputContainer?.props.error).toBeTruthy();
  });
  test("should disable icon when value is empty", () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Input
        testID="test"
        value=""
        setValue={spy}
        onCompleteEdit={spy}
        shouldShowIcon={true}
      />
    );
    expect(
      getByTestId("check-icon").parent?.parent?.props.disabled
    ).toBeTruthy();
  });
  test("should call the onCompleteEdit function when the icon is pressed", () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Input
        testID="test"
        value="Some Value"
        setValue={() => {}}
        onCompleteEdit={spy}
        shouldShowIcon={true}
      />
    );
    fireEvent.press(getByTestId("check-icon"));
    expect(spy).toHaveBeenCalled();
  });
});
