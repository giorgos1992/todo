import { FlatList, View } from "react-native";
import Input from "../../components/Input/Input";
import TodoItem from "../../components/TodoItem";
import Typography from "../../components/Typography";
import { ITypography } from "../../components/Typography/Typography.types";
import { styles } from "./TodoList.styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, THEME } from "@constants/styles";
import { Button } from "react-native-paper";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddNewItem from "../../components/Dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootState } from "src/store";
import { AppNavigatorParamList } from "src/navigation/AppNavigation";
import {
  INewTodoItem,
  IStatus,
  ITodoItem,
} from "src/store/todoLists/todoLists.types";
import {
  addItemToTodoListAction,
  editItemToTodoListAction,
} from "src/store/todoLists/todoLists.slice";
import Menu from "src/components/Menu";

enum ITODO_LISTS_MANIPULATION {
  ALPHABETICAL = "alphabetical",
  DATE = "date",
  HIDE_COMPLETED = "hideCompleted",
}

const TodoList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [todoItemsManipulation, setTodoItemsManipulation] = useState<
    ITODO_LISTS_MANIPULATION | undefined
  >();
  const [hideCompleted, setHideCompleted] = useState(false);
  const route = useRoute<RouteProp<AppNavigatorParamList, "TodoList">>();
  const todoListId = route.params?.id;
  const todoList = useSelector((state: RootState) =>
    state.todoLists.todoLists.data.find(
      (todoList) => todoList.id === todoListId
    )
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoItemTitle, setTodoItemTitle] = useState("");
  const dispatch = useDispatch();

  const hadldeDataManipulation = (
    dataManipulationType: ITODO_LISTS_MANIPULATION
  ) => {
    setTodoItemsManipulation(dataManipulationType);
    setShowMenu(false);
  };

  const handleDone = () => {
    const itemToAdd = {
      title: todoItemTitle,
      status: IStatus.ACTIVE,
      todoListId: todoList?.id ?? "",
    } as INewTodoItem;
    dispatch(addItemToTodoListAction(itemToAdd));
  };

  const handleClose = () => {
    setTodoItemTitle("");
    setIsModalVisible(false);
  };

  const chooseRenderer = (todoItem: ITodoItem) => {
    if (todoItem.status === IStatus.EDIT) {
      const handleDoneEdit = (newTitle: string) => {
        dispatch(
          editItemToTodoListAction({
            ...todoItem,
            status: IStatus.ACTIVE,
            title: newTitle,
          })
        );
      };
      return (
        <Input
          key={todoItem.title}
          value={todoItemTitle}
          setValue={setTodoItemTitle}
          onCompleteEdit={handleDoneEdit}
          testID={`todo-item-edit-${todoItem.id}`}
          shouldShowIcon
        />
      );
    } else {
      return (
        <TodoItem
          testID={`todo-item-${todoItem.id}`}
          key={todoItem.title}
          item={todoItem}
          setTodoItemTitle={setTodoItemTitle}
        />
      );
    }
  };

  const todoItems = () => {
    if (todoItemsManipulation === ITODO_LISTS_MANIPULATION.ALPHABETICAL) {
      return todoList?.items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (todoItemsManipulation === ITODO_LISTS_MANIPULATION.DATE) {
      return todoList?.items.sort((a, b) => a.dateAdded - b.dateAdded);
    } else if (
      todoItemsManipulation === ITODO_LISTS_MANIPULATION.HIDE_COMPLETED &&
      hideCompleted
    ) {
      return todoList?.items.filter((item) => item.status !== IStatus.INACTIVE);
    } else {
      return todoList?.items;
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Typography
        testID={`list-title-${todoList?.id}`}
        variant={ITypography.H1}
        style={{ textAlign: "center" }}
      >
        {todoList?.name}
      </Typography>
      <View
        style={{
          flexDirection: "row",
          marginVertical: hp("1%"),
          justifyContent: "space-between",
        }}
      >
        <Menu
          theme={THEME}
          anchor={
            <Button
              testID="menu-button"
              icon={"filter-menu-outline"}
              onPress={() => {
                setShowMenu((sm) => !sm);
              }}
            >
              {""}
            </Button>
          }
          visible={showMenu}
          onDismiss={() => {
            setShowMenu(false);
          }}
          items={[
            {
              title: "Sort",
              items: [
                {
                  title: "A-Z",
                  onPress: () => {
                    hadldeDataManipulation(
                      ITODO_LISTS_MANIPULATION.ALPHABETICAL
                    );
                  },
                },
                {
                  title: "Date added",
                  onPress: () => {
                    hadldeDataManipulation(ITODO_LISTS_MANIPULATION.DATE);
                  },
                },
              ],
            },
            {
              title: "Filters",
              items: [
                {
                  title: `${hideCompleted ? "Show" : "Hide"} Completed`,
                  onPress: () => {
                    setHideCompleted((hc) => !hc);
                    hadldeDataManipulation(
                      ITODO_LISTS_MANIPULATION.HIDE_COMPLETED
                    );
                  },
                },
              ],
            },
          ]}
        />
        <Button
          mode="text"
          icon={"plus-circle-outline"}
          textColor={COLORS.lightBlue}
          onPress={() => {
            setIsModalVisible(true);
          }}
          testID="add-new-item-button"
        >
          Add new item
        </Button>
      </View>
      <FlatList
        testID="todo-list"
        data={todoItems()}
        renderItem={({ item }) => (
          <View testID={"todo-item"}>{chooseRenderer(item)}</View>
        )}
      />
      {isModalVisible && (
        <AddNewItem
          title={"Add new Todo item"}
          onDone={handleDone}
          onClose={handleClose}
          visible={isModalVisible}
          value={todoItemTitle}
          setValue={setTodoItemTitle}
          testID="todo-item-input"
        />
      )}
    </SafeAreaProvider>
  );
};

export default TodoList;
