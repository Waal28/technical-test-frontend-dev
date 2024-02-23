import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import TablePegawai from "../components/TablePegawai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import service from "../service";
import { setPegawai, setUser } from "../reducers/pegawai";
import ModalConfirm from "../components/ModalConfirm";
import { setConfirmModal, setToast } from "../reducers/component";
import PropTypes from "prop-types";
import FormAndTableWrapper from "../components/FormAndTableWrapper";
import API_ENDPOINTS from "../config/apiEndpoints";

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
      <Tooltip title="Edit">
        <IconButton color="success" aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
  const pegawaiApiUrl = API_ENDPOINTS.PEGAWAI;
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { pegawai, user, initialValueUser } = useSelector(
    (state) => state.pegawaiReducer
  );
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
    const { data, success } = await getData(pegawaiApiUrl);
    if (success) {
      setLoading(false);
      dispatch(setPegawai(data));
    }
  }
  async function deletePegawai() {
    const { success } = await deleteData(`${pegawaiApiUrl}/${user.id}`);
    if (success) {
      dispatch(
        setToast({
          open: true,
          text: "Data berhasil dihapus",
          severity: "success",
        })
      );
      dispatch(setUser(initialValueUser));
      getPegawai();
      return { loading: false };
    }
  }

  useEffect(() => {
    getPegawai();

    // eslint-disable-next-line
  }, []);
  return (
    <FormAndTableWrapper
      textHeader="Data Pegawai"
      handleNavigate={() => navigate("/create-pegawai")}
      textButton={<AddDataButon />}
    >
      <TablePegawai columns={columns} rows={rows} loading={loading} />
      <ModalConfirm handleAction={deletePegawai} />
    </FormAndTableWrapper>
  );
}

function AddDataButon() {
  return (
    <>
      <AddIcon /> Tambah Pegawai
    </>
  );
}
