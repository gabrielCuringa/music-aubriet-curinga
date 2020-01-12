import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const useDialog = props => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const dialog = (
    <Dialog
      open={visible}
      onClose={hideDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props && props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props && props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props &&
          props.actions.map(action => {
            return (
              <Button
                onClick={() => {
                  action.onClick();
                  hideDialog();
                }}
                color={action.color}
              >
                {action.text}
              </Button>
            );
          })}
      </DialogActions>
    </Dialog>
  );

  return [dialog, showDialog, hideDialog];
};

export default useDialog;
