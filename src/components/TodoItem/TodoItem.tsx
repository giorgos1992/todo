import React, { Dispatch } from "react";
import { Animated, Text, View } from "react-native";
import { styles } from "./TodoItem.styles";

import Action from "../Action";
import Swipeable from "../Swipeable";
import { COLORS, MEDIUM_ICON } from "@constants/styles";
import EditIcon from "@assets/icons/edit-icon.svg";
import DeleteIcon from "@assets/icons/deleteIcon.svg";
import { useDispatch } from "react-redux";
import { IStatus, ITodoItem } from "src/store/todoLists/todoLists.types";
import { RectButton } from "react-native-gesture-handler";
import {
  deleteItemToTodoListAction,
  editItemToTodoListAction,
} from "src/store/todoLists/todoLists.slice";
import Checkbox from "../Checkbox";

export type IProps = {
  item: ITodoItem;
  setTodoItemTitle: Dispatch<string>;
  testID?: string;
};

type ITodoItemActionsProps = {
  progress: Animated.AnimatedInterpolation<number>;
  close: () => void;
  onDelete: () => void;
  onDone: () => void;
};

const TodoItemActions = ({
  progress,
  close,
  onDelete,
  onDone,
}: ITodoItemActionsProps) => {
  return (
    <View style={styles.actionContainer}>
      <Action
        testId="delete-action"
        text={"Delete"}
        color={COLORS.red}
        onPress={() => {
          onDelete();
          close();
        }}
        x={200}
        progress={progress}
        icon={<DeleteIcon width={MEDIUM_ICON} height={MEDIUM_ICON} />}
      />
      <Action
        text={"Edit"}
        testId="edit-action"
        color={COLORS.lightBlue}
        onPress={() => {
          onDone();
          close();
        }}
        x={200}
        progress={progress}
        icon={
          <EditIcon color="white" width={MEDIUM_ICON} height={MEDIUM_ICON} />
        }
      />
    </View>
  );
};

const TodoItem = ({ item, setTodoItemTitle, testID }: IProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      editItemToTodoListAction({
        ...item,
        status:
          item.status === IStatus.ACTIVE ? IStatus.INACTIVE : IStatus.ACTIVE,
      })
    );
  };

  const handleOnDelete = () => {
    dispatch(deleteItemToTodoListAction(item));
  };

  const handleOnEdit = () => {
    setTodoItemTitle(item.title);
    dispatch(editItemToTodoListAction({ ...item, status: IStatus.EDIT }));
  };

  return (
    <Swipeable
      id={item.id}
      friction={1}
      Action={TodoItemActions}
      testID={testID}
      props={{
        status: item.status,
        onDelete: handleOnDelete,
        onDone: handleOnEdit,
      }}
    >
      <RectButton
        testID={`todo-item-${item.id}`}
        style={styles.titleContainerDisabled}
        onPress={handleClick}
      >
        <Checkbox
          status={item.status === IStatus.ACTIVE ? "unchecked" : "checked"}
        />
        <View style={styles.titleTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

export default TodoItem;
