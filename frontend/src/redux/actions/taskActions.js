import axios from "axios";
import {
  addTaskSuccess,
  allTaskSuccess,
  deleteTaskSuccess,
  taskFail,
  taskRequest,
  updateTaskSuccess,
} from "../reducers/taskReducer";
import { updateUserSuccess } from "../reducers/userReducer";

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch(taskRequest());

    const task = await axios({
      method: "GET",
      url: "http://localhost:4000/task",
    });
    dispatch(allTaskSuccess(task.data));
  } catch (error) {
    dispatch(taskFail(error.response.data.message));
  }
};

export const addTask = (data) => async (dispatch) => {
  try {
    const task = await axios({
      method: "POST",
      url: "http://localhost:4000/task",
      data,
    });

    dispatch(updateUserSuccess("created"));

    dispatch(addTaskSuccess(task.data));
  } catch (error) {
    dispatch(taskFail(error.response.data.message));
  }
};

export const updateTask = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: "PUT",
      url: "http://localhost:4000/task",
      data,
    });
    dispatch(updateTaskSuccess(response.data));
    if (data.status === "completed") {
      dispatch(updateUserSuccess("completed"));
    }
  } catch (error) {
    dispatch(taskFail(error.response?.data.message || "Update failed"));
  }
};

export const deleteTask = (task) => async (dispatch) => {
  try {
    await axios({
      method: "DELETE",
      url: "http://localhost:4000/task",
      data: { id: task.id },
    });
    if (task.status === "completed")
      dispatch(updateUserSuccess("deleteCompleted"));
    else dispatch(updateUserSuccess("deleteCreated"));

    dispatch(deleteTaskSuccess(task.id));
  } catch (error) {
    dispatch(taskFail(error.response.data.message));
  }
};
