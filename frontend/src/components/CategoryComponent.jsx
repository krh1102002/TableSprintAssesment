import { useState } from "react";
import TaskHeader from "../shared components/TaskHeaderComponent";
import TaskTable from "../shared components/TaskTableComponent";
import AddTaskModal from "../shared components/AddTaskModalComponent";
import EditTaskModal from "../shared components/EditTaskModalComponent";
import AlertModal from "../components/AlertModalComponent";
import ViewTaskModal from "../shared components/ViewTaskModalComponent";

const CategoryComponent = () => {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false);
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);
  return (
    <div>
      <AddTaskModal
        isOpen={addTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
      />
      <EditTaskModal
        isOpen={editTaskModalOpen}
        onClose={() => setEditTaskModalOpen(false)}
      />
      <AlertModal
        isOpen={deleteTaskModalOpen}
        onClose={() => setDeleteTaskModalOpen(false)}
      />
      <ViewTaskModal
        isOpen={viewTaskModalOpen}
        onClose={() => setViewTaskModalOpen(false)}
      />
      <div className="md:px-4 px-2.5 md:py-4 py-1.5">
        <TaskHeader setAddModalOpen={setAddTaskModalOpen} />
        <TaskTable
          setEditModalOpen={setEditTaskModalOpen}
          setDeleteModalOpen={setDeleteTaskModalOpen}
          setViewModalOpen={setViewTaskModalOpen}
        />
      </div>
    </div>
  );
};

export default CategoryComponent;
