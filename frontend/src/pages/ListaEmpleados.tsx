import { useState, useEffect } from "react";
import { API, getJson, type Empleado } from "../api";
import { Link } from "react-router";

function ListaEmpleados() {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setEmpleados(await getJson<Empleado[]>(`${API}/empleados`));
            } catch {
                setError("Error al intentar conectar con el backend");
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    if (error) return <p>{error}</p>;
    if (cargando) return <p>Cargando...</p>;

    return (
        <>
        <h2>Empleados</h2>
        <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                </tr>
            </thead>
            <tbody>
            {empleados.map((e) => (
                <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>
                        <Link to={`/empleados/${e.id}`}>{e.nombre} {e.apellido}</Link>
                    </td>
                    <td>{e.puesto}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}

export default ListaEmpleados