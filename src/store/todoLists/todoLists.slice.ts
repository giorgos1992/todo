import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITodoListsStateType,
  TODO_LISTS,
  ITodoItem,
  INewTodoItem,
  ITodoList,
} from "./todoLists.types";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const todoListsInitialState: ITodoListsStateType = {
  todoLists: {
    data: [],
    isLoading: false,
    errors: "",
  },
  todoList: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const todoListsSlice = createSlice({
  name: TODO_LISTS,
  initialState: todoListsInitialState,
  reducers: {
    createTodoListAction: (
      state: ITodoListsStateType,
      { payload: name }: PayloadAction<string>
    ) => {
      state.todoLists.isLoading = true;
      if (name === "") {
        state.todoLists.isLoading = false;
        state.todoLists.errors = "Name cannot be empty";
      } else {
        state.todoLists.data = [
          ...state.todoLists.data,
          { id: uuid(), name, creationDate: Date.now(), items: [] },
        ];
        state.todoLists.errors = "";
        state.todoLists.isLoading = false;
      }
    },
    deleteTodoListAction: (
      state: ITodoListsStateType,
      { payload: { id } }: PayloadAction<ITodoList>
    ) => {
      state.todoLists.isLoading = true;
      state.todoLists.data = state.todoLists.data.filter(
        (todoList) => todoList.id !== id
      );
      state.todoLists.errors = "";
      state.todoLists.isLoading = false;
    },
    editItemToTodoListAction: (
      state: ITodoListsStateType,
      { payload }: PayloadAction<ITodoItem>
    ) => {
      state.todoLists.isLoading = true;
      if (payload.title === "") {
        state.todoLists.errors = "Title cannot be empty";
        state.todoLists.isLoading = false;
      } else {
        const todoList = state.todoLists.data.find(
          (list) => list.id === payload.todoListId
        );
        if (todoList) {
          const newTodoList = {
            ...todoList,
            items: [
              ...todoList.items.map((item) =>
                item.id === payload.id ? payload : item
              ),
            ],
          };

          state.todoLists.data = state.todoLists.data.map((list) => {
            if (list.id === payload.todoListId) {
              return newTodoList;
            }
            return list;
          });
          state.todoLists.errors = "";
          state.todoLists.isLoading = false;
        } else {
          state.todoLists.errors = `Cannot change name of todo list with id: ${payload.id}`;
          state.todoLists.isLoading = false;
        }
      }
    },
    editTodoListAction: (
      state: ITodoListsStateType,
      { payload }: PayloadAction<{ id: string; name: string }>
    ) => {
      state.todoLists.isLoading = true;
      if (payload.name === "") {
        state.todoLists.errors = "Name cannot be empty";
      } else {
        const todoList = state.todoLists.data.find(
          (list) => list.id === payload.id
        );
        if (todoList) {
          todoList.name = payload.name;
          state.todoLists.data = [
            { ...todoList, name: payload.name },
            ...state.todoLists.data.filter((list) => list.id !== payload.id),
          ];
          state.todoLists.errors = "";
          state.todoLists.isLoading = false;
        } else {
          state.todoLists.errors = `Cannot change name of todo list with id: ${payload.id}`;
          state.todoLists.isLoading = false;
        }
      }
    },
    // Add item to todolist
    addItemToTodoListAction: (
      state: ITodoListsStateType,
      { payload: todoItem }: PayloadAction<INewTodoItem>
    ) => {
      state.todoLists.isLoading = true;
      if (todoItem.title === "") {
        state.todoLists.errors = "Title cannot be empty";
      } else {
        const todoList = state.todoLists.data.find(
          (list) => list.id === todoItem.todoListId
        );
        const todoItemToStore: ITodoItem = {
          ...todoItem,
          id: uuid(),
          dateAdded: Date.now(),
        };
        if (todoList) {
          state.todoLists.data = state.todoLists.data.map((list) => {
            if (list.id === todoList.id) {
              return {
                ...todoList,
                items: [todoItemToStore, ...todoList.items],
              };
            } else {
              return list;
            }
          });
          state.todoLists.errors = "";
          state.todoLists.isLoading = false;
        } else {
          state.todoLists.errors = "Cannot add item to list";
          state.todoLists.isLoading = false;
        }
      }
    },
    deleteItemToTodoListAction: (
      state: ITodoListsStateType,
      { payload: todoItem }: PayloadAction<ITodoItem>
    ) => {
      state.todoLists.isLoading = true;

      const todoList = state.todoLists.data.find(
        (list) => list.id === todoItem.todoListId
      );
      if (todoList) {
        const todoListWithoutItem: ITodoList = {
          ...todoList,
          items: todoList.items.filter((items) => items.id !== todoItem.id),
        };
        const remainingLists = state.todoLists.data.filter(
          (list) => list.id !== todoItem.todoListId
        );
        state.todoLists.data = [todoListWithoutItem, ...remainingLists];
        state.todoLists.errors = "";
        state.todoLists.isLoading = false;
      } else {
        state.todoLists.errors = "Cannot remove item to list";
        state.todoLists.isLoading = false;
      }
    },
  },
});

export const {
  createTodoListAction,
  deleteTodoListAction,
  editTodoListAction,
  addItemToTodoListAction,
  editItemToTodoListAction,
  deleteItemToTodoListAction,
} = todoListsSlice.actions;
export default todoListsSlice.reducer;
