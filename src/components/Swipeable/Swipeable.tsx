import React, { useRef } from "react";
import { Animated } from "react-native";
import { Swipeable as RNGHSwipeable } from "react-native-gesture-handler";

export type IProps = {
  id: string;
  children: React.ReactNode;
  Action: React.FC<any>;
  props?: any;
  friction?: number;
  testID?: string;
};

const Swipeable = ({
  children,
  Action,
  props = {},
  friction = 2,
  testID: testId,
}: IProps) => {
  const _swipeableRow = useRef<RNGHSwipeable | null>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => <Action {...props} close={close} progress={progress} />;

  const close = () => {
    _swipeableRow.current?.close();
  };

  return (
    <RNGHSwipeable
      ref={_swipeableRow}
      enableTrackpadTwoFingerGesture
      friction={friction}
      renderRightActions={renderRightActions}
      testID={testId}
    >
      {children}
    </RNGHSwipeable>
  );
};

export default Swipeable;
