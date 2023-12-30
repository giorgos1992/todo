import React from "react";
import { View } from "react-native";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import { styles } from "./Checkbox.styles";

interface Props {
  status: "checked" | "indeterminate" | "unchecked";
  testID?: string;
}

export const Checkbox = ({ testID, status }: Props) => {
  return (
    <View testID={testID} style={styles.container}>
      <PaperCheckbox status={status} />
    </View>
  );
};

export default Checkbox;
