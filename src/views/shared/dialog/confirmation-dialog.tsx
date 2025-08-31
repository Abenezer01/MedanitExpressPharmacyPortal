import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ComponentType, Fragment } from "react";

export interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationDialog: ComponentType<ConfirmationDialogProps> = ({
  open,
  handleClose,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions-dense">
          <Button onClick={onCancel}>Disagree</Button>
          <Button onClick={onConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmationDialog;
