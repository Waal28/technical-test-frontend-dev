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
  const { user } = useSelector((state) => state.pegawaiReducer);
  const [loading, setLoading] = React.useState(false);
  const initialValue = {
    id: null,
    name: "",
  };
  async function createPegawai(event) {
    event.preventDefault();
    setLoading(true);
    const params = {
      url: pegawaiApiUrl,
      body: user,
    };
    const { loading } = await postData(params);
    setLoading(loading);
    if (!loading) {
      dispatch(
        setToast({
          open: true,
          text: "Data berhasil ditambahkan",
        })
      );
      dispatch(
        setUser({
          nama: "",
          jalan: "",
          provinsi: initialValue,
          kota: initialValue,
          kecamatan: initialValue,
        })
      );
      navigate("/");
    }
  }
  function handleCancle() {
    dispatch(
      setUser({
        id: null,
        nama: "",
        jalan: "",
        provinsi: {
          id: null,
          name: "",
        },
        kota: {
          id: null,
          name: "",
        },
        kecamatan: {
          id: null,
          name: "",
        },
      })
    );
  }
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
