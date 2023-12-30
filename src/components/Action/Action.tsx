import React from "react";
import { Animated, Text } from "react-native";
import { styles } from "./Action.styles";
import { RectButton } from "react-native-gesture-handler";

export type IProps = {
  onPress: () => void;
  text: string;
  color: string;
  x: number;
  progress: Animated.AnimatedInterpolation<number>;
  icon?: React.ReactNode;
  testId?: string;
};

const Action = ({
  onPress,
  text,
  color,
  x,
  progress,
  icon,
  testId,
}: IProps) => {
  const trans = progress?.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  return (
    <Animated.View
      testID={`${testId}-window`}
      style={[styles.flex, { transform: [{ translateX: trans }] }]}
    >
      <RectButton
        testID={`${testId}-button`}
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={onPress}
      >
        {icon}
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

export default Action;
