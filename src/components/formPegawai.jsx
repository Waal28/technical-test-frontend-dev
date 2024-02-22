import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormComp from "../components/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/pegawai";
import PropTypes from "prop-types";

export default function FormPegawai(props) {
  const { loading, textHeader, handleSave, handleCancle } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValue = {
    id: null,
    name: "",
  };
  function handleBack() {
    dispatch(
      setUser({
        nama: "",
        jalan: "",
        provinsi: initialValue,
        kota: initialValue,
        kecamatan: initialValue,
      })
    );

    navigate(-1);
  }
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          margin: "20px 0",
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={handleBack}>
          <ArrowBackIcon />
        </Button>
      </Box>
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        {textHeader}
      </h1>
      <FormComp
        loading={loading}
        handleSave={handleSave}
        handleCancle={handleCancle}
      />
    </Container>
  );
}
FormPegawai.propTypes = {
  loading: PropTypes.bool.isRequired,
  textHeader: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancle: PropTypes.func.isRequired,
};
