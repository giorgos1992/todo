import { todoListsSlice } from "./todoLists.slice";
import { IStatus, ITodoListsStateType } from "./todoLists.types";

describe("todoListsSlice", () => {
  const initialState: ITodoListsStateType = {
    todoLists: {
      isLoading: false,
      data: [],
      errors: "",
    },
    todoList: {
      isLoading: false,
      data: null,
      errors: "",
    },
  };

  it("should handle createTodoListAction", () => {
    const name = "New Todo List";
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.createTodoListAction(name)
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name,
          creationDate: expect.any(Number),
          items: [],
        },
      ])
    );
    expect(state.todoLists.errors).toBe("");
  });
  it("should handle createTodoListAction when title is empty", () => {
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.createTodoListAction("")
    );
    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.errors).toBe("Name cannot be empty");
  });

  it("should handle deleteTodoListAction", () => {
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [],
    };
    initialState.todoLists.data = [todoList];
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.deleteTodoListAction(todoList)
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data).toEqual([]);
    expect(state.todoLists.errors).toBe("");
  });

  it("should handle editItemToTodoListAction", async () => {
    const payload = {
      id: "1",
      todoListId: "1",
      title: "An Item",
      dateAdded: Date.now(),
      status: IStatus.ACTIVE,
    };
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [
        {
          id: "1",
          todoListId: "1",
          title: "An Item",
          dateAdded: Date.now(),
          status: IStatus.ACTIVE,
        },
      ],
    };
    initialState.todoLists.data = [todoList];

    const state = todoListsSlice.reducer(
      {
        ...initialState,
        todoLists: { ...initialState.todoLists, data: [todoList] },
      },
      todoListsSlice.actions.editItemToTodoListAction({
        ...payload,
        title: "Updated Item",
      })
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data[0].items[0].title).toBe("Updated Item");
    expect(state.todoLists.errors).toBe("");
  });

  it("should error when editItemToTodoListAction without title", async () => {
    const payload = {
      id: "1",
      todoListId: "1",
      title: "",
      dateAdded: Date.now(),
      status: IStatus.ACTIVE,
    };
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [
        {
          id: "1",
          todoListId: "1",
          title: "An Item",
          dateAdded: Date.now(),
          status: IStatus.ACTIVE,
        },
      ],
    };
    initialState.todoLists.data = [todoList];

    const state = todoListsSlice.reducer(
      {
        ...initialState,
        todoLists: { ...initialState.todoLists, data: [todoList] },
      },
      todoListsSlice.actions.editItemToTodoListAction({
        ...payload,
        title: "",
      })
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.errors).toBe("Title cannot be empty");
  });

  it("should handle editTodoListAction", () => {
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [],
    };
    initialState.todoLists.data = [todoList];
    const payload = { id: "1", name: "Updated Todo List" };
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.editTodoListAction(payload)
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data[0].name).toBe("Updated Todo List");
    expect(state.todoLists.errors).toBe("");
  });

  it("should handle addItemToTodoListAction", () => {
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [],
    };
    initialState.todoLists.data = [todoList];
    const payload = {
      todoListId: "1",
      title: "New Item",
      status: IStatus.ACTIVE,
      dateAdded: Date.now(),
      id: "1",
    };
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.addItemToTodoListAction(payload)
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data[0].items).toEqual(
      expect.arrayContaining([
        { ...payload, dateAdded: expect.any(Number), id: expect.any(String) },
      ])
    );
    expect(state.todoLists.errors).toBe("");
  });

  it("should handle deleteItemToTodoListAction", () => {
    const todoList = {
      id: "1",
      name: "Todo List 1",
      creationDate: Date.now(),
      items: [
        {
          id: "1",
          todoListId: "1",
          title: "Item 1",
          dateAdded: Date.now(),
          status: IStatus.ACTIVE,
        },
      ],
    };
    initialState.todoLists.data = [todoList];
    const payload = {
      id: "1",
      todoListId: "1",
      title: "Item 1",
      dateAdded: Date.now(),
      status: IStatus.ACTIVE,
    };
    const state = todoListsSlice.reducer(
      initialState,
      todoListsSlice.actions.deleteItemToTodoListAction(payload)
    );

    expect(state.todoLists.isLoading).toBe(false);
    expect(state.todoLists.data[0].items).toEqual([]);
    expect(state.todoLists.errors).toBe("");
  });
});
