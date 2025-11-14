import { useEffect, useState } from "react";
import Header from "../components/Header";

interface Pedido {
    id: number;
    fecha_pedido: string;
    estado: string;
    total: number;
    detalles: string;
}

interface Entrega {
    id: number;
    id_pedido: number;
    fecha_entrega: string;
    encargado: string;
    observaciones: string;
}

export default function Pedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:3001/pedidos", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    setPedidos(data.pedidos);
                    setEntregas(data.entregas);
                } else {
                    setError(data.mensaje || "Error al obtener pedidos");
                }
            })
            .catch(() => setError("Error de conexión con el servidor"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-20">Cargando pedidos...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    // Filtrar pedidos en curso
    const pedidosEnCurso = pedidos.filter(p => p.estado === "pendiente" || p.estado === "en_proceso");
    const historialPedidos = pedidos.filter(p => p.estado === "entregado" || p.estado === "cancelado");

    const renderPedido = (p: Pedido) => (
        <div key={p.id} className="bg-white p-6 rounded-2xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-2">Pedido #{p.id}</h2>
            <p><b>Fecha:</b> {new Date(p.fecha_pedido).toLocaleDateString()}</p>
            <p><b>Estado:</b> {p.estado}</p>
            <p><b>Total:</b> ${p.total}</p>
            <p><b>Servicios:</b> {p.detalles}</p>

            <div className="mt-4">
                <h3 className="font-semibold mb-1">Entregas:</h3>
                <ul className="list-disc pl-5">
                    {entregas
                        .filter(e => e.id_pedido === p.id)
                        .map(e => (
                            <li key={e.id}>
                                {e.fecha_entrega} - {e.encargado} - {e.observaciones}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );

    return (
        <>
        <Header />
        <div className="min-h-screen p-6 bg-gray-100 font-sans">
            <h1 className="text-3xl font-bold mb-6 text-center">Pedidos en Curso</h1>
            {pedidosEnCurso.length === 0 ? (
                <p className="text-center">No tienes pedidos en curso.</p>
            ) : (
                pedidosEnCurso.map(renderPedido)
            )}

            <h1 className="text-3xl font-bold mb-6 mt-12 text-center">Historial de Pedidos</h1>
            {historialPedidos.length === 0 ? (
                <p className="text-center">No hay pedidos históricos.</p>
            ) : (
                historialPedidos.map(renderPedido)
            )}
        </div>
        </>
    );
}