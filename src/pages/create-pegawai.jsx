import React from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../reducers/component";
import { setUser } from "../reducers/pegawai";
import FormPegawai from "../components/formPegawai";

export default function CreatePegawai() {
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
      url: "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
      urlGetData: "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
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

  return (
    <FormPegawai
      loading={loading}
      textHeader="Tambah Data Pegawai"
      handleSave={createPegawai}
      handleCancle={handleCancle}
    />
  );
}
