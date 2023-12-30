export enum IStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EDIT = "edit",
}

export type ITodoItem = {
  id: string;
  todoListId: string;
  title: string;
  status: IStatus;
  dateAdded: number;
};

export type INewTodoItem = Exclude<ITodoItem, "id" | "dateAdded">;

export type ITodoList = {
  id: string;
  name: string;
  creationDate: number;
  items: ITodoItem[];
};

export type ITodoListState = {
  data: ITodoList | null;
  isLoading: boolean;
  errors: string;
};

export type ITodoListsState = {
  data: ITodoList[];
  isLoading: boolean;
  errors: string;
};

export const TODO_LISTS = "TODO_LISTS";
export type TODO_LISTS = typeof TODO_LISTS;

export type ITodoListsStateType = {
  todoList: ITodoListState;
  todoLists: ITodoListsState;
};
