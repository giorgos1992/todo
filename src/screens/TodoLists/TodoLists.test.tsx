jest.useFakeTimers();
import React from "react";
import { render, fireEvent } from "test-utils";
import TodoLists from "./TodoLists";
import * as RR from "react-redux";

describe("TodoLists", () => {
  const mockedState = {
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
  };
  it("renders correctly", () => {
    const { getByTestId } = render(<TodoLists />, { mockedState });
    expect(getByTestId("todo-lists-container")).toBeDefined();
  });

  it("handles new todo list creation", () => {
    const fn = jest.fn();
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByText, getByTestId } = render(<TodoLists />, { mockedState });
    const addButton = getByText("Add new item");
    fireEvent.press(addButton);
    const input = getByTestId("new-item-input");
    fireEvent.changeText(input, "New Todo List");
    const doneButton = getByTestId("right-button");
    fireEvent.press(doneButton);
    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/createTodoListAction",
      payload: "New Todo List",
    });
    spy.mockRestore();
  });

  it("handles editing a todo list", () => {
    const fn = jest.fn();
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByText, getByTestId } = render(<TodoLists />, {
      mockedState,
    });
    const editButton = getByText("Edit");
    fireEvent.press(editButton);
    const input = getByTestId("new-item-input");
    fireEvent.changeText(input, "Updated Todo List");
    const doneButton = getByTestId("right-button");
    fireEvent.press(doneButton);
    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/editTodoListAction",
      payload: { id: "1", name: "Updated Todo List" },
    });
    spy.mockRestore();
  });

  it("handles deleting a todo list", () => {
    const fn = jest.fn();
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByText, getByTestId } = render(<TodoLists />, {
      mockedState,
    });
    const deleteButton = getByText("Delete");
    fireEvent.press(deleteButton);
    const confirmButton = getByTestId("delete-action-button");
    fireEvent.press(confirmButton);
    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/deleteTodoListAction",
      payload: {
        id: "1",
        items: [
          { id: "1", status: "ACTIVE", title: "Item 1" },
          { id: "2", status: "edit", title: "Item 2" },
        ],
        title: "test",
      },
    });
    spy.mockRestore();
  });
});
