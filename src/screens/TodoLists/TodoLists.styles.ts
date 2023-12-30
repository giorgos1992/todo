import { COLORS } from "@constants/styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: hp("0.3%"),
  },
  title: {
    color: COLORS.pureBlack,
    fontSize: hp("2%"),
    marginVertical: hp("0.5%"),
  },
  actionContainer: {
    marginTop: wp("4%"),
    paddingVertical: hp("-1.5%"),
    alignSelf: "center",
    width: wp("60%"),
    height: hp("11%"),
    flexDirection: "row",
  },
  subTitle: {
    color: COLORS.pureBlack,
    marginBottom: hp("0.2%"),
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 7,
    flexDirection: "row",
    width: wp("90%"),
  },
  contentContainer: {
    marginHorizontal: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp("1.5%"),
    paddingLeft: wp("4%"),
    paddingRight: wp("1%"),
    backgroundColor: "white",
  },
  card: {
    marginTop: wp("2%"),
    display: "flex",
  },
});
