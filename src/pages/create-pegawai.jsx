import React from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../reducers/component";
import { setUser } from "../reducers/pegawai";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormAndTableWrapper from "../components/FormAndTableWrapper";
import FormPegawai from "../components/FormPegawai";
import API_ENDPOINTS from "../config/apiEndpoints";

export default function CreatePegawai() {
  const pegawaiApiUrl = API_ENDPOINTS.PEGAWAI;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData } = service();
  const { user, initialValueUser } = useSelector(
    (state) => state.pegawaiReducer
  );
  const [loading, setLoading] = React.useState(false);

  async function createPegawai(event) {
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
        url: pegawaiApiUrl,
        body: user,
      };
      const { success } = await postData(params);

      if (success) {
        dispatch(
          setToast({
            open: true,
            text: "Data berhasil ditambahkan",
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
    dispatch(setUser(initialValueUser));
  }
  function handleBack() {
    dispatch(setUser(initialValueUser));

    navigate("/");
  }
  return (
    <FormAndTableWrapper
      textHeader="Tambah Data Pegawai"
      handleNavigate={handleBack}
      textButton={<ArrowBackIcon />}
    >
      <FormPegawai
        loading={loading}
        handleSave={createPegawai}
        handleCancle={handleCancle}
      />
    </FormAndTableWrapper>
  );
}
