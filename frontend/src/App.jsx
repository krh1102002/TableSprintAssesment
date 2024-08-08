import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Taskpage from "./pages/Taskpage";
import { getUserDetail } from "./redux/actions/userActions";
import "./App.css";
import SignIn from "./pages/signInPage";
import SignUp from "./pages/signUpPage";
import DashboardComponent from "./components/DashboardComponent";
import CategoryComponent from "./components/CategoryComponent";
import SubCategoryComponent from "./components/SubCategoryComponent";
import ProductComponent from "./components/ProductComponent";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.userToken) {
      dispatch(getUserDetail());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Taskpage />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardComponent />} />
          <Route path="category" element={<CategoryComponent />} />
          <Route path="subcategory" element={<SubCategoryComponent />} />
          <Route path="products" element={<ProductComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
