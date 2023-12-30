jest.useFakeTimers();
import { fireEvent, render, waitFor } from "test-utils";
import Dialog from "./Dialog";

describe("test generic Dialog component", () => {
  it("should render the Dialog component correctly", async () => {
    const { getByTestId } = render(
      <Dialog
        title="test"
        onClose={() => {}}
        onDone={() => {}}
        setValue={() => {}}
        value=""
        visible={true}
      />
    );
    const dialog = await waitFor(() => {
      return getByTestId("Dialog-view");
    });
    expect(dialog).toBeDefined();
  });
  test("should call the onClose function when the left button is pressed", async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Dialog
        title="test"
        onClose={spy}
        onDone={() => {}}
        setValue={() => {}}
        value=""
        visible={true}
      />
    );
    const dialog = await waitFor(() => {
      return getByTestId("Dialog-view");
    });
    expect(dialog).toBeDefined();
    fireEvent.press(getByTestId("left-button"));
    expect(spy).toHaveBeenCalled();
  });
  test("should call the onDone function when the right button is pressed", async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Dialog
        title="test"
        onClose={() => {}}
        onDone={spy}
        setValue={() => {}}
        value="someValue"
        visible={true}
      />
    );
    const dialog = await waitFor(() => {
      return getByTestId("Dialog-view");
    });
    expect(dialog).toBeDefined();
    fireEvent.press(getByTestId("right-button"));
    expect(spy).toHaveBeenCalled();
  });
  test("input should have the correct value", async () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Dialog
        title="test"
        onClose={() => {}}
        onDone={spy}
        setValue={() => {}}
        value="test"
        visible={true}
      />
    );
    const dialog = await waitFor(() => {
      return getByTestId("Dialog-view");
    });
    expect(dialog).toBeDefined();
    const input = getByTestId("new-item-input");
    expect(input.props.value).toBe("test");
  });
});
