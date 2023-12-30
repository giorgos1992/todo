import { I18nManager, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "@constants/styles";

export const styles = StyleSheet.create({
  containerCard: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.pureBlack,
    height: hp("10%"),
  },
  titleTextContainer: {
    marginLeft: wp("1%"),
  },
  actionContainer: {
    width: wp("60%"),
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  actionContainerDisabled: {
    width: 180,
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: hp("10%"),
    width: wp("100%"),
  },
  titleContainerDisabled: {
    backgroundColor: COLORS.backgroundGrey,
    display: "flex",
    flexDirection: "row",
    paddingVertical: hp("1%"),
    alignItems: "center",
    flex: 1,
    height: 64,
    width: wp("100%"),
  },
  cardTitle: {
    display: "flex",
    color: COLORS.pureBlack,
    fontSize: hp("2.2%"),
    marginLeft: wp("3%"),
  },
});
