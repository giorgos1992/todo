import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoList from "src/screens/TodoList";
import TodoLists from "src/screens/TodoLists";

export type AppNavigatorParamList = {
  TodoLists: undefined;
  TodoList: { id: string };
};

const AppNavigator = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigation = () => {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen name="TodoLists" component={TodoLists} />
      <AppNavigator.Screen name="TodoList" component={TodoList} />
    </AppNavigator.Navigator>
  );
};

export default AppNavigation;
