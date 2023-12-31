import { COLORS, MEDIUM_ICON } from "@constants/styles";
import { Animated, FlatList, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dispatch, useState } from "react";
import {
  createTodoListAction,
  deleteTodoListAction,
  editTodoListAction,
} from "src/store/todoLists/todoLists.slice";
import AddNewItem from "../../components/Dialog/Dialog";
import { styles } from "./TodoLists.styles";
import { useNavigation } from "@react-navigation/native";
import EditIcon from "@assets/icons/edit-icon.svg";
import DeleteIcon from "@assets/icons/deleteIcon.svg";
import Swipeable from "../../components/Swipeable/Swipeable";
import Action from "../../components/Action";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigatorParamList } from "src/navigation/AppNavigation";
import { ITodoList } from "src/store/todoLists/todoLists.types";
import { formatDate } from "@utils/dateUtils";

type ITodoListsActionsProps = {
  progress: Animated.AnimatedInterpolation<number>;
  close: () => void;
  todoList: ITodoList;
  setEditTodoList: Dispatch<ITodoList | undefined>;
  setValue: Dispatch<string>;
  setIsModalVisible: Dispatch<boolean>;
};

const TodoListActions = ({
  progress,
  close,
  todoList,
  setEditTodoList,
  setValue,
  setIsModalVisible,
}: ITodoListsActionsProps) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.actionContainer}>
      <Action
        testId="delete-action"
        text={"Delete"}
        color={COLORS.red}
        onPress={() => {
          dispatch(deleteTodoListAction(todoList));
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
          setEditTodoList(todoList);
          setValue(todoList.name);
          setIsModalVisible(true);
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

const TodoLists = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTodoList, setEditTodoList] = useState<ITodoList | undefined>();
  const todoLists = useSelector(
    (state: RootState) => state.todoLists.todoLists.data
  );
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const handleNewTodoList = () => {
    dispatch(createTodoListAction(value));
  };

  const handleEditTodoList = () => {
    dispatch(editTodoListAction({ id: editTodoList?.id ?? "", name: value }));
  };

  return (
    <SafeAreaProvider>
      <View
        testID="todo-lists-container"
        style={{ flexDirection: "row-reverse" }}
      >
        <Button
          mode="text"
          icon={"plus-circle-outline"}
          textColor={COLORS.lightBlue}
          onPress={() => {
            setEditTodoList(undefined);
            setIsModalVisible(true);
          }}
        >
          Add new item
        </Button>
      </View>
      <FlatList
        data={todoLists}
        renderItem={({ item }) => (
          <Swipeable
            id={item.id}
            friction={1}
            Action={TodoListActions}
            props={{
              todoList: item,
              setEditTodoList,
              setValue,
              setIsModalVisible,
            }}
          >
            <RectButton
              style={styles.card}
              onPress={() => {
                navigation.navigate("TodoList", { id: item.id });
              }}
            >
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text style={{ ...styles.title }}>{item.name}</Text>
                  <Text style={styles.subTitle}>
                    Date created: {formatDate(item.creationDate)}
                  </Text>
                  <Text style={styles.subTitle}>
                    Last item added: {item.items[item.items.length - 1]?.title}
                  </Text>
                </View>
              </View>
            </RectButton>
          </Swipeable>
        )}
      />
      {isModalVisible && (
        <AddNewItem
          title={editTodoList ? "Edit Todo List" : "Add new Todo List item"}
          visible={isModalVisible}
          onClose={() => {
            setValue("");
            setIsModalVisible(false);
          }}
          value={value}
          setValue={setValue}
          onDone={() => {
            editTodoList ? handleEditTodoList() : handleNewTodoList();
          }}
        />
      )}
    </SafeAreaProvider>
  );
};

export default TodoLists;
