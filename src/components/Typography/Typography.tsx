import { Text, TextStyle } from "react-native";
import { ITypography } from "./Typography.types";
import { styles } from "./Typography.styles";

type IProps = {
  children: React.ReactNode;
  variant: ITypography;
  style?: TextStyle;
  testID?: string;
};

const Typography = ({ children, variant, style, testID }: IProps) => {
  const stylesToUse = (): TextStyle => {
    switch (variant) {
      case ITypography.H1:
        return styles.h1;
      case ITypography.body:
        return styles.body;
      default:
        return styles.p;
    }
  };

  return (
    <Text style={[stylesToUse(), style]} testID={testID}>
      {children}
    </Text>
  );
};

export default Typography;
