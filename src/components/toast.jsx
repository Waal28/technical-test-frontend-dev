import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../reducers/component";

export default function ToastComp() {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.componentReducer);
  const { open, text, severity, variant, duration, vertical, horizontal } =
    toast;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setToast({ ...toast, open: false }));
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant={variant}
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
