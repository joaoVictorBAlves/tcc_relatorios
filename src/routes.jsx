import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Relatorios from "./pages/Relatorios";
import Devolutivas from "./pages/Devolutivas";
import Login from "./pages/Login";
import Launcher from "./pages/Launcher";
import Layout from "./Layout";
import MatrixStudentItem from "./pages/Devolutivas/Matriz";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/relatorios"
          element={
            <Layout>
              <Relatorios />
            </Layout>
          }
        />
        <Route
          path="/devolutivas"
          element={
            <Layout>
              <Devolutivas />
            </Layout>
          }
        />
        <Route
          path="/devolutivas/matriz"
          element={
            <Layout>
              <MatrixStudentItem />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Launcher />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage;
