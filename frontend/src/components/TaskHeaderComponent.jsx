import React from "react";
import { useSelector } from "react-redux";

const TaskHeader = ({ setAddModalOpen }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex justify-end py-3">
      <button
        onClick={() => setAddModalOpen(true)}
        className="bg-slate-800 text-white font-semibold px-2.5 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskHeader;
