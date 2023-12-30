import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  rightAction: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  flex: {
    flex: 1,
  },
  actionText: {
    color: "white",
    fontSize: wp("3.5%"),
    backgroundColor: "transparent",
    padding: hp("0.2%"),
  },
});
