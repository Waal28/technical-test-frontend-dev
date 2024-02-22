import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmModal } from "../reducers/component";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
import PropTypes from "prop-types";

export default function BasicModal(props) {
  const { handleAction } = props;
  const { confirmModal } = useSelector((state) => state.componentReducer);
  const { open, textHeader, textBody } = confirmModal;
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => dispatch(setConfirmModal({ open: false }));
  const handleConfirm = async () => {
    setLoading(true);
    const { loading } = await handleAction();
    if (!loading) {
      setLoading(false);
      dispatch(setConfirmModal({ open: false }));
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {textHeader}
          </Typography>
          <Typography
            id="modal-modal-description"
            align="center"
            sx={{ mt: 2 }}
          >
            {textBody}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ textTransform: "capitalize", minWidth: "100px" }}
            >
              Tidak
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              sx={{ textTransform: "capitalize", minWidth: "100px" }}
            >
              {loading ? <CircularProgress color="inherit" size={22} /> : "Ya"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
BasicModal.propTypes = {
  handleAction: PropTypes.func.isRequired,
};
