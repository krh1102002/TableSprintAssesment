import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import Loading from "../components/LoadingComponent";
import { getAllTasks } from "../redux/actions/taskActions";
import Layout from "../Layout";
import SidebarComponent from "../components/SidebarComponent";

const Taskpage = () => {
  const user = useSelector((state) => state.user?.user);
  const { loading, allTasks } = useSelector((state) => state.task);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && allTasks?.length <= 0) dispatch(getAllTasks());
    if (!user) {
      navigate("/signin");
    }
  }, [user, dispatch, navigate, allTasks]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-2 h-full">
        <SidebarComponent />
      </div>
      <div className="col-span-8 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout(Taskpage);
