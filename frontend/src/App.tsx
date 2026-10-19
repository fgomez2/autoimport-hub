import { useEffect, useState } from 'react'
import './App.css'

interface SaludoResponse {
  mensaje: string;
}

function App() {
  const [mensaje, setMensaje] = useState<string>("Cargando...");

  useEffect(() => {
    fetch("http://localhost:8080/api/detalles_info")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json() as Promise<SaludoResponse>;
    })
    .then((data) => setMensaje(data.mensaje))
    .catch(() => setMensaje("Error al intentar conectar con el backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{mensaje}</h1>
    </div>
  )
}

export default App
