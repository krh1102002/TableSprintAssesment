import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTask } from "../redux/reducers/taskReducer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EyeIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import { deleteTask } from "../redux/actions/taskActions";
import { toast } from "react-toastify";

const TaskTable = ({ setEditModalOpen, setViewModalOpen }) => {
  const [currentTask, setCurrentTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task.currentTask);

  const handleView = (row) => {
    dispatch(setCurrentTask(row));
    setViewModalOpen(true);
  };

  const handleEdit = (row) => {
    dispatch(setCurrentTask(row));
    setEditModalOpen(true);
  };

  const handleDelete = (row) => {
    dispatch(setCurrentTask(row));
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const confirmDelete = () => {
    if (task) {
      dispatch(deleteTask(task));
      toast.success("Task Deleted");
      setOpenDeleteDialog(false);
    }
  };

  const { allTasks } = useSelector((state) => state.task);

  useEffect(() => {
    if (allTasks) {
      setCurrentTasks(allTasks);
    }
  }, [allTasks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (currentTask.length === 0) {
    return (
      <Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
        No data added
      </Typography>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1e293b",
                borderBottom: "3px solid #dee2e6",
              }}
            >
              <TableCell sx={{ fontWeight: "bolder" }}>Sr No</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTask
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    border: 1,
                    borderColor: "grey.300",
                  }}
                >
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.createdAt?.substring(0, 10)}</TableCell>
                  <TableCell>
                    {row.status[0].toUpperCase() + row.status.substring(1)}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(row)} title="View">
                      <EyeIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(row)} title="Edit">
                      <EditIcon color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row)}
                      title="Delete"
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={currentTask.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ marginBottom: "15px", borderBottom: "0.5px solid #1e293b" }}
        >
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: "#1e293b" }}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            autoFocus
            sx={{
              color: "white",
              background: "#1e293b",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#1e293b",
                color: "white",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskTable;
