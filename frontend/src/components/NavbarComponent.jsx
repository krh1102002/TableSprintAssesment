import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/reducers/userReducer";
import { clearTasks } from "../redux/reducers/taskReducer";
import { Modal } from "@mui/material";
import { IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../assets/images/white_logo.png";
import alertIcon from "../assets/images/alert.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(clearUser());
    dispatch(clearTasks());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <div
      className="flex justify-between items-center lg:px-8 px-4 py-3 shadow flex-shrink-0"
      style={{ background: "#662671", fontFamily: "Poppins, sans-serif" }}
    >
      <img src={logo} alt="Logo" className="h-10" />
      {user && (
        <div className="flex items-center">
          <IconButton onClick={handleModalOpen}>
            <AccountCircleOutlinedIcon
              style={{ color: "white", fontSize: 35 }}
            />
          </IconButton>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm mx-4">
            <div className="flex items-center justify-center mb-2">
              <img src={alertIcon} alt="Alert Icon" className="h-6 mr-2" />
              <h2 id="logout-modal-title" className="text-xl font-bold">
                Log Out
              </h2>
            </div>
            <p
              id="logout-modal-description"
              className="mt-2"
              style={{ color: "#A9A9A9" }}
            >
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleModalClose}
                className="border border-gray-300 px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 rounded-full"
                style={{ background: "#662671" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
