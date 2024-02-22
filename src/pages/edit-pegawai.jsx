import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/pegawai";
import { setToast } from "../reducers/component";
import FormPegawai from "../components/formPegawai";

export default function EditPegawai() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getData, updateData } = service();
  const { user, provinsi, kota, kecamatan } = useSelector(
    (state) => state.pegawaiReducer
  );
  const [loading, setLoading] = React.useState(false);

  const location = useLocation();
  const id = location.state.id;
  const [userSelected, setUserSelected] = React.useState({});
  const [loadGetData, setLoadGetData] = React.useState(true);

  async function getOnePegawai() {
    const { data, loading } = await getData(
      `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`
    );
    setUserSelected(data);
    dispatch(setUser(data));

    setLoadGetData(loading);
  }
  async function updatePegawai(event) {
    event.preventDefault();
    setLoading(true);
    const params = {
      url: `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`,
      urlGetData: "https://61601920faa03600179fb8d2.mockapi.io/pegawai",
      body: user,
    };
    const { loading } = await updateData(params);
    setLoading(loading);
    if (!loading) {
      dispatch(
        setToast({
          open: true,
          text: "Data berhasil diubah",
        })
      );
      dispatch(
        setUser({
          nama: "",
          jalan: "",
          provinsi: provinsi[0],
          kota: kota[0],
          kecamatan: kecamatan[0],
        })
      );

      navigate("/");
    }
  }
  function handleCancle() {
    dispatch(setUser(userSelected));
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
      <FormPegawai
        loading={loading}
        textHeader="Edit Data Pegawai"
        handleSave={updatePegawai}
        handleCancle={handleCancle}
      />
    );
  }
}
