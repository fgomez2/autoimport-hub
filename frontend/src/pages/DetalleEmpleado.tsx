import { useState, useEffect } from "react";
import { API, getJson, HttpError, type Empleado } from "../api";
import { Link, useParams } from "react-router";

function DetalleEmpleado() {
    const { id } = useParams();
    const [empleado, setEmpleado] = useState<Empleado | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            setError(null);
            setEmpleado(null);

            try {
                setEmpleado(await getJson<Empleado>(`${API}/empleados/${id}`));
            } catch (err) {
                if (err instanceof HttpError && (err.status === 404 || err.status === 400)) {
                    setError(`No existe ningún empleado con id ${id}`);
                } else {
                    setError("Error al intentar conectar con el backend");
                }
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [id]);

    if (cargando) return <p>Cargando...</p>;

    return (
        <>
        {error ? (
            <p style={{ color: "red" }}>{error}</p>
        ) : empleado && (
            <>
            <h2>{empleado.nombre} {empleado.apellido}</h2>
            <p>Puesto: {empleado.puesto}</p>
            <p>Edad: {empleado.edad}</p>
            <p>Teléfono: {empleado.telefono}</p>
            <p>Dirección: {empleado.direccion}</p>
            </>
        )}
        <p><Link to="/empleados">← Volver a la lista</Link></p>
    </>
    )
}

export default DetalleEmpleado