import { combineReducers } from "@reduxjs/toolkit";
import todoListsSlice from "./todoLists/todoLists.slice";

export default combineReducers({
  todoLists: todoListsSlice,
});
