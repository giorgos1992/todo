import { COLORS } from "@constants/styles";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp("10%"),
  },
  input: {
    fontSize: 20,
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    width: "95%",
    backgroundColor: COLORS.backgroundGrey,
  },
  inputBoxStyle: {
    height: hp("7%"),
    alignContent: "center",
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    zIndex: 1,
    flexDirection: "row",
    height: hp("6%"),
    marginHorizontal: 5,
  },
});
