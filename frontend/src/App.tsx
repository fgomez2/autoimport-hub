import './App.css'
import { Navigate, Route, Routes } from 'react-router';
import DetalleEmpleado from './pages/DetalleEmpleado';
import ListaEmpleados from './pages/ListaEmpleados';

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/empleados" />} />
        <Route path="/empleados" element={<ListaEmpleados />} />
        <Route path="/empleados/:id" element={<DetalleEmpleado />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </div>
  )
}

export default App
