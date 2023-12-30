import { Dispatch } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import Typography from "../Typography";
import { ITypography } from "../Typography/Typography.types";
import Input from "../Input";
import { COLORS } from "@constants/styles";

type IProps = {
  title: string;
  visible: boolean;
  testID?: string;
  value: string;
  setValue: Dispatch<string>;
  onClose: () => void;
  onDone: () => void;
};

const AddNewItem = (props: IProps) => {
  return (
    <Portal>
      <Dialog
        testID="Dialog-view"
        visible={props.visible}
        onDismiss={props.onClose}
      >
        <Dialog.Title>
          <Typography variant={ITypography.H1}>{props.title}</Typography>
        </Dialog.Title>
        <Dialog.Content>
          <Input
            testID={props.testID ?? "new-item-input"}
            value={props.value}
            setValue={props.setValue}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            testID="left-button"
            textColor={COLORS.pureBlack}
            onPress={props.onClose}
          >
            Cancel
          </Button>
          <Button
            testID="right-button"
            mode={"contained"}
            buttonColor={COLORS.lightBlue}
            disabled={props.value?.length === 0}
            onPress={() => {
              props.onDone();
              props.onClose();
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddNewItem;
