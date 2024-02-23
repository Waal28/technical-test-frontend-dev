import { Box, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/pegawai";
import { setToast } from "../reducers/component";
import FormAndTableWrapper from "../components/FormAndTableWrapper";
import FormPegawai from "../components/FormPegawai";
import API_ENDPOINTS from "../config/apiEndpoints";

export default function EditPegawai() {
  const pegawaiApiUrl = API_ENDPOINTS.PEGAWAI;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getData, updateData } = service();
  const { user, initialValueUser } = useSelector(
    (state) => state.pegawaiReducer
  );
  const [loading, setLoading] = React.useState(false);

  const location = useLocation();
  const id = location.state.id;
  const [userSelected, setUserSelected] = React.useState({});
  const [loadGetData, setLoadGetData] = React.useState(true);

  async function getOnePegawai() {
    const { data, loading } = await getData(`${pegawaiApiUrl}/${id}`);
    setUserSelected(data);
    dispatch(setUser(data));

    setLoadGetData(loading);
  }
  async function updatePegawai(event) {
    event.preventDefault();
    setLoading(true);

    if (
      user.provinsi.id === null ||
      user.kota.id === null ||
      user.kecamatan.id === null
    ) {
      dispatch(
        setToast({
          open: true,
          text: "Provinsi, Kota, dan Kecamatan harus diisi",
          severity: "error",
        })
      );
      setLoading(false);
    } else {
      const params = {
        url: `${pegawaiApiUrl}/${id}`,
        body: user,
      };
      const { success } = await updateData(params);

      if (success) {
        dispatch(
          setToast({
            open: true,
            text: "Data berhasil diubah",
            severity: "success",
          })
        );
        dispatch(setUser(initialValueUser));
        setLoading(false);
        navigate("/");
      }
    }
  }
  function handleCancle() {
    dispatch(setUser(userSelected));
  }
  function handleBack() {
    dispatch(setUser(initialValueUser));

    navigate("/");
  }
  useEffect(() => {
    getOnePegawai();
    // eslint-disable-next-line
  }, []);

  if (loadGetData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit" size={80} />
      </Box>
    );
  } else {
    return (
      <FormAndTableWrapper
        textHeader="Edit Data Pegawai"
        handleNavigate={handleBack}
        textButton={<ArrowBackIcon />}
      >
        <FormPegawai
          loading={loading}
          handleSave={updatePegawai}
          handleCancle={handleCancle}
        />
      </FormAndTableWrapper>
    );
  }
}
