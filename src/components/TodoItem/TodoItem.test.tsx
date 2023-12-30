import React from "react";
import { render, fireEvent } from "test-utils";
import TodoItem from "./TodoItem";
import { IStatus } from "src/store/todoLists/todoLists.types";
import * as RR from "react-redux";

describe("TodoItem", () => {
  const mockItem = {
    id: "1",
    todoListId: "1",
    dateAdded: 1234432,
    title: "Test Todo",
    status: IStatus.ACTIVE,
  };

  it("renders the todo item correctly", () => {
    const { getByText } = render(
      <TodoItem item={mockItem} setTodoItemTitle={() => {}} />
    );
    const todoTitle = getByText("Test Todo");
    expect(todoTitle).toBeTruthy();
  });

  it("calls the editItemToTodoListAction when clicked", () => {
    const fn = jest.fn().mockImplementation(() => {});
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByTestId } = render(
      <TodoItem item={mockItem} setTodoItemTitle={() => {}} />
    );
    const todoTitle = getByTestId(`todo-item-${mockItem.id}`);
    fireEvent.press(todoTitle);

    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/editItemToTodoListAction",
      payload: {
        id: "1",
        todoListId: "1",
        dateAdded: 1234432,
        title: "Test Todo",
        status: "inactive",
      },
    });
    spy.mockRestore();
  });

  it("calls the deleteItemToTodoListAction when delete action is pressed", () => {
    const fn = jest.fn().mockImplementation(() => {});
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByTestId } = render(
      <TodoItem item={mockItem} setTodoItemTitle={() => {}} />
    );
    const deleteAction = getByTestId("delete-action-button");
    fireEvent.press(deleteAction);
    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/deleteItemToTodoListAction",
      payload: {
        id: "1",
        todoListId: "1",
        dateAdded: 1234432,
        title: "Test Todo",
        status: "active",
      },
    });
    spy.mockRestore();
  });

  it("calls the editItemToTodoListAction when edit action is pressed", () => {
    const fn = jest.fn().mockImplementation(() => {});
    const spy = jest.spyOn(RR, "useDispatch").mockReturnValue(fn);
    const { getByTestId } = render(
      <TodoItem item={mockItem} setTodoItemTitle={() => {}} />
    );
    const editAction = getByTestId("edit-action-button");
    fireEvent.press(editAction);
    expect(fn).toHaveBeenCalledWith({
      type: "TODO_LISTS/editItemToTodoListAction",
      payload: {
        id: "1",
        todoListId: "1",
        dateAdded: 1234432,
        title: "Test Todo",
        status: "edit",
      },
    });
    spy.mockRestore();
  });
});
