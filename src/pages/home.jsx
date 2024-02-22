import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Container, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import TableComp from "../components/table";
import { useNavigate } from "react-router-dom";
import ToastComp from "../components/toast";
import { useDispatch, useSelector } from "react-redux";
import service from "../service";
import { setPegawai, setUser } from "../reducers/pegawai";
import BasicModal from "../components/modal";
import { setConfirmModal, setToast } from "../reducers/component";
import PropTypes from "prop-types";

function Action({ id, nama }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.pegawaiReducer);

  const handleEdit = () =>
    navigate(`/edit-pegawai/${nama}`, { state: { id: id } });

  const handleDelete = () => {
    dispatch(
      setConfirmModal({
        open: true,
        textHeader: "Hapus Data",
        textBody: `Apakah anda yakin ingin menghapus data dengan nama "${nama}"?`,
      })
    );
    dispatch(setUser({ ...user, id: id, nama: nama }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <IconButton color="success" aria-label="edit" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
Action.propTypes = {
  id: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
};

function createData(no, id, nama, jalan, provinsi, kota, kecamatan, action) {
  return { no, id, nama, jalan, provinsi, kota, kecamatan, action };
}
function createRows(users) {
  const rows = users.map((user, index) =>
    createData(
      index + 1,
      user.id,
      user.nama,
      user.jalan,
      user.provinsi.name,
      user.kota.name,
      user.kecamatan.name,
      <Action id={user.id} nama={user.nama} />
    )
  );
  return rows;
}

export default function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const { pegawai, user } = useSelector((state) => state.pegawaiReducer);
  const columns = [
    { id: "no", label: "No", align: "center" },
    { id: "nama", label: "Nama", align: "center" },
    { id: "jalan", label: "Jalan", align: "center" },
    { id: "provinsi", label: "Provinsi", align: "center" },
    { id: "kota", label: "Kota/Kabupaten", align: "center" },
    { id: "kecamatan", label: "Kecamatan", align: "center" },
    { id: "action", label: "Aksi", align: "center" },
  ];
  const rows = createRows(pegawai);
  const { getData, deleteData } = service();
  const dispatch = useDispatch();

  async function getPegawai() {
    const url = "https://61601920faa03600179fb8d2.mockapi.io/pegawai";
    const { data, loading } = await getData(url);
    setLoading(loading);
    dispatch(setPegawai(data));
  }
  async function deletePegawai() {
    const url = `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${user.id}`;
    const { loading } = await deleteData(url);
    if (!loading) {
      dispatch(
        setToast({
          open: true,
          text: "Data berhasil dihapus",
        })
      );
    }
    getPegawai();
    return { loading };
  }

  useEffect(() => {
    getPegawai();

    // eslint-disable-next-line
  }, []);
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          margin: "20px 0",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/create-pegawai")}
          sx={{ textTransform: "capitalize" }}
        >
          <AddIcon /> Tambah Pegawai
        </Button>
      </Box>
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        Data Pegawai
      </h1>
      <TableComp columns={columns} rows={rows} loading={loading} />
      <ToastComp />
      <BasicModal handleAction={deletePegawai} />
    </Container>
  );
}
