import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingLavanderia from "./pages/home";
import Dashboard from "./pages/dashboard";
import Pedidos from "./pages/Pedido";
import ProtectedRoute from "./components/ProtectedRoute";
import Historial from "./pages/Historial"
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLavanderia />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-pedido"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <ProtectedRoute>
              <Historial />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
