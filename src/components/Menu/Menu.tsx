import { Menu as RNPMenu, MenuProps, Divider } from "react-native-paper";
import Typography from "../Typography";
import { ITypography } from "../Typography/Typography.types";
import { styles } from "./Menu.styles";
import { View } from "react-native";

export type IMenuItem = {
  title: string;
  icon?: string;
  onPress: () => void;
};

export type IProps = Omit<MenuProps, "children"> & {
  items: { title: string; items: IMenuItem[] }[];
};

const Menu = (props: IProps) => {
  return (
    <RNPMenu {...props}>
      {props.items.map((item) => {
        return (
          <View key={item.title}>
            <Typography style={styles.groupItemTitle} variant={ITypography.p}>
              {item.title}
            </Typography>
            {item.items.map((subItem) => {
              return (
                <RNPMenu.Item
                  key={`${item.title}-${subItem.title}`}
                  testID={`menu-item-${item.title}-${subItem.title}`}
                  title={subItem.title}
                  leadingIcon={subItem.icon}
                  onPress={subItem.onPress}
                />
              );
            })}
            <Divider style={styles.groupDivider} />
          </View>
        );
      })}
    </RNPMenu>
  );
};

export default Menu;
