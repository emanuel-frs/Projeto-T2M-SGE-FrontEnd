import { Route, Routes } from "react-router-dom";
import Private from "./Private";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Add from "../pages/add/Add";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Private><Home /></Private>} />
            <Route path="/cadastrar" element={<Private><Add /></Private>} />
        </Routes>
    );
}

export default RoutesApp;