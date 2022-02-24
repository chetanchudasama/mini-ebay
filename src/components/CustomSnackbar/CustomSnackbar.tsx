import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface CustomSnackbarProps {
  message: string;
  handleClose: (isClosed: boolean) => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  handleClose,
}) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={5000}
        onClose={() => handleClose(false)}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => handleClose(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
export default CustomSnackbar;
