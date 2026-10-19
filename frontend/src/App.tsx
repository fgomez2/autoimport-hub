import { useEffect, useState } from 'react'
import './App.css'

interface DetallesInfo {
  titulo: string;
  servidor: string;
  ip: string;
}

function App() {
  const [info, setInfo] = useState<DetallesInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/detalles_info")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json() as Promise<DetallesInfo>;
    })
    .then(setInfo)
    .catch(() => setError("Error al intentar conectar con el backend"));
  }, []);

  if (error) return <p>{error}</p>;
  if (!info) return <p>Cargando...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{info.titulo}</h1>
      <p>Servidor {info.servidor}</p>
      <p>IP: {info.ip}</p>
    </div>
  )
}

export default App
