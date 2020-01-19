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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actions, setActions] = useState([]);

  const showDialog = (title, content, actions) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
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
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.length > 0 &&
          actions.map((action, index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  action.onClick && action.onClick();
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
