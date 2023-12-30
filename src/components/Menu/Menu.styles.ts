import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  groupItemTitle: {
    marginHorizontal: wp("2%"),
  },
  groupDivider: {
    marginBottom: hp("1%"),
  },
});
