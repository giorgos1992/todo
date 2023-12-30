jest.useFakeTimers();
import { fireEvent, render, userEvent, waitFor } from "test-utils";
import TodoList from "./TodoList";
import * as RN from "@react-navigation/native";
import { AppNavigatorParamList } from "src/navigation/AppNavigation";
import * as RR from "react-redux";
import { ReactTestInstance } from "react-test-renderer";
import { IStatus } from "src/store/todoLists/todoLists.types";

describe("test TodoList component", () => {
  test("should render the component correctly", () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });
    expect(getByTestId("todo-list")).toBeDefined();
    spy.mockRestore();
  });
  test("Dialog should be visible when add new button is pressed", () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getByTestId, queryByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });
    expect(queryByTestId("Dialog-view")).toBeNull();
    fireEvent.press(getByTestId("add-new-item-button"));
    expect(getByTestId("Dialog-view")).toBeDefined();
    spy.mockRestore();
  });

  test("should render the component correctly", () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });
    expect(getByTestId("todo-list")).toBeDefined();
    spy.mockRestore();
  });

  test("Dialog should be visible when add new button is pressed", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getByTestId, queryByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });
    expect(queryByTestId("Dialog-view")).toBeNull();
    await waitFor(() => {
      fireEvent.press(getByTestId("add-new-item-button"));
    });
    await waitFor(() => {
      expect(getByTestId("Dialog-view")).toBeDefined();
    });
    spy.mockRestore();
  });

  test("should handle adding a new item to the todo list", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const addItemToTodoListActionSpy = jest.fn();
    const spy2 = jest
      .spyOn(RR, "useDispatch")
      .mockReturnValue(addItemToTodoListActionSpy);
    const user = userEvent.setup();
    const { getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });

    await waitFor(async () => {
      await user.press(getByTestId("add-new-item-button"));
    });
    await waitFor(() => {
      expect(getByTestId("Dialog-view")).toBeDefined();
    });
    await waitFor(async () => {
      await user.type(getByTestId("todo-item-input"), "New Item");
    });
    await waitFor(async () => {
      await user.press(getByTestId("right-button"));
    });
    expect(addItemToTodoListActionSpy).toHaveBeenCalledWith({
      type: "TODO_LISTS/addItemToTodoListAction",
      payload: {
        title: "New Item",
        status: "active",
        todoListId: "1",
      },
    });
    spy.mockRestore();
    spy2.mockRestore();
  });

  test("should handle closing the add new item Dialog", () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getByTestId, queryByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: { data: [{ id: "1", title: "test", items: [] }] },
        },
      },
    });
    fireEvent.press(getByTestId("add-new-item-button"));
    fireEvent.press(getByTestId("left-button"));
    expect(queryByTestId("Dialog-view")).toBeNull();
    spy.mockRestore();
  });

  test("should handle editing a todo item", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const editItemToTodoListActionSpy = jest.fn();
    const spy2 = jest
      .spyOn(RR, "useDispatch")
      .mockReturnValue(editItemToTodoListActionSpy);
    const { getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: {
            data: [
              {
                id: "1",
                title: "test",
                items: [
                  { id: "1", title: "Item 1", status: "ACTIVE" },
                  { id: "2", title: "Item 2", status: "edit" },
                ],
              },
            ],
          },
        },
      },
    });
    const user = userEvent.setup();
    await waitFor(async () => {
      await user.type(getByTestId("todo-item-edit-2"), "Updated Item");
    });

    await waitFor(async () => {
      await user.press(getByTestId("check-icon"));
    });
    expect(editItemToTodoListActionSpy).toHaveBeenCalledWith({
      type: "TODO_LISTS/editItemToTodoListAction",
      payload: {
        id: "2",
        title: "Updated Item",
        status: "active",
      },
    });
    spy.mockRestore();
    spy2.mockRestore();
  });
});

describe("test TodoList filter actions", () => {
  test("test sort alphabetically", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getAllByTestId, getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: {
            data: [
              {
                id: "1",
                title: "test",
                items: [
                  {
                    id: "1",
                    title: "Item 1",
                    status: "ACTIVE",
                    dateAdded: Date.now(),
                  },
                  {
                    id: "2",
                    title: "Item 2",
                    status: "edit",
                    dateAdded: Date.now() + 100,
                  },
                  {
                    id: "3",
                    title: "A",
                    status: "INACTIVE",
                    dateAdded: Date.now() + 200,
                  },
                ],
              },
            ],
          },
        },
      },
    });
    const firstElement = (
      getAllByTestId("todo-item")[0].children[0] as ReactTestInstance
    ).props.item.title;
    expect(firstElement).toBe("Item 1");
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByTestId("menu-item-Sort-A-Z-title"));
    const newFirstElement = (
      getAllByTestId("todo-item")[0].children[0] as ReactTestInstance
    ).props.item.title;
    expect(newFirstElement).toBe("A");
    spy.mockRestore();
  });
  test("test sort date added", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getAllByTestId, getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: {
            data: [
              {
                id: "1",
                title: "test",
                items: [
                  {
                    id: "1",
                    title: "Item 1",
                    status: "ACTIVE",
                    dateAdded: Date.now(),
                  },
                  {
                    id: "2",
                    title: "Item 2",
                    status: "ACTIVE",
                    dateAdded: Date.now() - 100,
                  },
                  {
                    id: "3",
                    title: "A",
                    status: "INACTIVE",
                    dateAdded: Date.now() + 200,
                  },
                ],
              },
            ],
          },
        },
      },
    });
    const firstElement = (
      getAllByTestId("todo-item")[0].children[0] as ReactTestInstance
    ).props.item.title;
    expect(firstElement).toBe("Item 1");
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByTestId("menu-item-Sort-Date added"));
    const newFirstElement = (
      getAllByTestId("todo-item")[0].children[0] as ReactTestInstance
    ).props.item.title;
    expect(newFirstElement).toBe("Item 2");
    spy.mockRestore();
  });
  test("test hide completed", async () => {
    const spy = jest
      .spyOn(RN, "useRoute")
      .mockReturnValue({ params: { id: "1" } } as RN.RouteProp<
        AppNavigatorParamList,
        "TodoList"
      >);
    const { getAllByTestId, getByTestId } = render(<TodoList />, {
      mockedState: {
        todoLists: {
          todoLists: {
            data: [
              {
                id: "1",
                title: "test",
                items: [
                  {
                    id: "1",
                    title: "Item 1",
                    status: IStatus.ACTIVE,
                    dateAdded: Date.now(),
                  },
                  {
                    id: "2",
                    title: "Item 2",
                    status: IStatus.ACTIVE,
                    dateAdded: Date.now() - 100,
                  },
                  {
                    id: "3",
                    title: "A",
                    status: IStatus.INACTIVE,
                    dateAdded: Date.now() + 200,
                  },
                ],
              },
            ],
          },
        },
      },
    });
    expect(getAllByTestId("todo-item").length).toBe(3);
    fireEvent.press(getByTestId("menu-button"));
    fireEvent.press(getByTestId("menu-item-Filters-Hide Completed-title"));

    expect(getAllByTestId("todo-item").length).toBe(2);
    spy.mockRestore();
  });
});
