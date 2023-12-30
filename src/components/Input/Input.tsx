import React, { Dispatch, FC, useRef } from "react";
import { View, TextInput as NativeTextInput } from "react-native";
import { styles } from "./Input.styles";
import { COLORS } from "@constants/styles";
import { TextInput } from "react-native-paper";

export type IProps = {
  onCompleteEdit?: (e: string) => void;
  shouldShowIcon?: boolean;
  value: string;
  setValue: Dispatch<string>;
  testID?: string;
};

const Input: FC<IProps> = ({
  value,
  setValue,
  shouldShowIcon,
  onCompleteEdit,
  testID: testId,
}) => {
  const inputRef = useRef<NativeTextInput | null>(null);
  const onChangeHandler = (searchValue: string) => {
    setValue(searchValue);
  };

  return (
    <View
      style={{
        ...styles.inputContainer,
      }}
    >
      <TextInput
        ref={inputRef}
        error={value?.length === 0}
        testID={testId ?? "input"}
        value={value}
        onChangeText={onChangeHandler}
        style={styles.input}
        outlineColor={COLORS.pureBlack}
        mode={"outlined"}
        right={
          shouldShowIcon &&
          onCompleteEdit && (
            <TextInput.Icon
              disabled={value?.length === 0}
              icon="check-circle"
              testID="check-icon"
              color={COLORS.lightBlue}
              onPress={() => {
                onCompleteEdit(value);
                setValue("");
              }}
            />
          )
        }
        activeOutlineColor={COLORS.lightBlue}
        selectionColor={COLORS.pureBlack}
        blurOnSubmit={true}
        keyboardAppearance="light"
        autoFocus={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default Input;
