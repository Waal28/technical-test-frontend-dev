import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKecamatan,
  setKota,
  setProvinsi,
  setUser,
} from "../reducers/pegawai";
import service from "../service";
import PropTypes from "prop-types";
import API_ENDPOINTS from "../config/apiEndpoints";

export default function FormPegawai(props) {
  const wilayahIndoApiUrl = API_ENDPOINTS.WILAYAH_INDONESIA;
  const { loading, handleSave, handleCancle } = props;
  const { getData } = service();
  const { user, provinsi, kota, kecamatan } = useSelector(
    (state) => state.pegawaiReducer
  );
  const initialValue = {
    id: null,
    name: "",
  };

  const dispatch = useDispatch();
  async function getProvinsi() {
    const { data } = await getData(`${wilayahIndoApiUrl}/provinces.json`);
    const items = data.map((item) => ({ ...item, label: item.name }));
    dispatch(setProvinsi(items));
  }
  async function getKota() {
    if (user.provinsi.id !== null) {
      const { data } = await getData(
        `${wilayahIndoApiUrl}/regencies/${user.provinsi.id}.json`
      );
      dispatch(setKota(data));
    } else {
      dispatch(setKota([initialValue]));
    }
  }
  async function getKecamatan() {
    if (user.kota.id !== null && user.provinsi.id !== null) {
      const { data } = await getData(
        `${wilayahIndoApiUrl}/districts/${user.kota.id}.json`
      );
      dispatch(setKecamatan(data));
    } else {
      dispatch(setKecamatan([initialValue]));
    }
  }
  function handleChangeProv(event, newValue) {
    if (event.target.value === "" || newValue === null) {
      dispatch(
        setUser({
          ...user,
          provinsi: initialValue,
          kota: initialValue,
          kecamatan: initialValue,
        })
      );
    } else {
      dispatch(
        setUser({
          ...user,
          provinsi: newValue,
          kota: initialValue,
          kecamatan: initialValue,
        })
      );
    }
  }
  function handleChangeKota(event) {
    dispatch(setUser({ ...user, kota: JSON.parse(event.target.value) }));
  }
  function handleChangeKec(event) {
    dispatch(setUser({ ...user, kecamatan: JSON.parse(event.target.value) }));
  }

  React.useEffect(() => {
    getProvinsi();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    getKota();
    // eslint-disable-next-line
  }, [user.provinsi]);

  React.useEffect(() => {
    getKecamatan();
    // eslint-disable-next-line
  }, [user.kota]);

  return (
    <form onSubmit={handleSave}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 5px 20px 1px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
        }}
        maxWidth="sm"
      >
        <TextField
          id="nama"
          label="Nama"
          placeholder="input nama"
          multiline
          variant="filled"
          margin="normal"
          required
          value={user.nama}
          onChange={(event) =>
            dispatch(setUser({ ...user, nama: event.target.value }))
          }
        />
        <TextField
          id="jalan"
          label="Jalan"
          placeholder="input alamat jalan"
          multiline
          variant="filled"
          margin="normal"
          required
          value={user.jalan}
          onChange={(event) =>
            dispatch(setUser({ ...user, jalan: event.target.value }))
          }
        />
        <Autocomplete
          disablePortal
          id="provinsi"
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          value={user.provinsi}
          onChange={(event, newValue) => handleChangeProv(event, newValue)}
          options={provinsi}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provinsi"
              placeholder="input provinsi"
              variant="filled"
              margin="normal"
              required
            />
          )}
        />
        <FormControl fullWidth margin="normal" variant="filled" required>
          <InputLabel id="kota">Kota</InputLabel>
          <Select
            labelId="kota"
            label="Kota"
            id="kotaa"
            value={JSON.stringify(user.kota)}
            disabled={user.provinsi.id === null}
            onChange={handleChangeKota}
          >
            {kota.map((item) => (
              <MenuItem value={JSON.stringify(item)} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="filled" required>
          <InputLabel id="kecamatan">Kecamatan</InputLabel>
          <Select
            labelId="kecamatan"
            label="Kecamatan"
            id="kecamatann"
            value={JSON.stringify(user.kecamatan)}
            disabled={user.kota.id === null || user.provinsi.id === null}
            onChange={handleChangeKec}
          >
            {kecamatan.map((item) => (
              <MenuItem value={JSON.stringify(item)} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            disableElevation
            sx={{ m: 1, minWidth: "100px", textTransform: "capitalize" }}
            type="button"
            onClick={handleCancle}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{ m: 1, minWidth: "100px", textTransform: "capitalize" }}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="inherit" size={22} />
            ) : (
              "Simpan"
            )}
          </Button>
        </Box>
      </Container>
    </form>
  );
}
FormPegawai.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancle: PropTypes.func.isRequired,
};
