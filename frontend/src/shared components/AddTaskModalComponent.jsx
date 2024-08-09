import React from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "../components/ModalComponent";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions/taskActions";
import { toast } from "react-toastify";
import { TextField, Button } from "@mui/material";

const AddTaskModal = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTask(data));
    toast.success("Task Added");
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="font-semibold text-xl pb-2.5">Add New Task</h2>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title of Task"
              variant="outlined"
              placeholder="Enter Title"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description of Task"
              variant="outlined"
              placeholder="Enter Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="flex justify-end gap-2 items-center pt-2">
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
