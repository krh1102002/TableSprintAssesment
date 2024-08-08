import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTask } from "../redux/actions/taskActions";
import Modal from "./ModalComponent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

const EditTaskModal = ({ isOpen, onClose }) => {
  const task = useSelector((data) => data.task.currentTask);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("status", task.status);
      setValue("id", task.id);
    }
  }, [task, setValue]);

  const onSubmit = (data) => {
    dispatch(updateTask(data));
    toast.success("Task Updated");
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="font-semibold text-xl pb-2.5 mb-3">Update Task</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title of Task"
          variant="outlined"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description of Task"
          variant="outlined"
          fullWidth
          multiline
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-semibold mb-2.5">
            Update Status
          </label>
          <select
            id="status"
            className="py-2 px-2 pr-8 focus:outline-none border border-slate-800 rounded"
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-2 items-center pt-2">
          <Button
            variant="outlined"
            onClick={() => {
              reset();
              onClose();
            }}
            sx={{
              borderColor: "#cccccc",
              color: "#333333",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#bbbbbb",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1e293b",
              color: "white",
              "&:hover": {
                backgroundColor: "#1e293b",
              },
            }}
          >
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
