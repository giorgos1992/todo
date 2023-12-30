import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  h1: {
    fontSize: wp("7%"),
    fontWeight: "bold",
  },
  body: {
    fontSize: wp("5%"),
  },
  p: {
    fontSize: wp("3.5%"),
  },
});
