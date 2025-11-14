import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

interface Servicio {
    id: number;
    nombre_servicio: string;
    precio_kg: number;
}

export default function CrearPedido() {
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [selectedServicio, setSelectedServicio] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // Traer servicios del backend
    useEffect(() => {
        fetch("https://alan-back-aa7lyo-1d86f0-72-60-121-26.traefik.me/servicios", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(json => setServicios(json.servicios || []));
    }, []);

    // Calcular total cuando cambie servicio o cantidad
    useEffect(() => {
        if (selectedServicio !== null && cantidad > 0) {
            const servicio = servicios.find(s => s.id === selectedServicio);
            if (servicio) setTotal(servicio.precio_kg * cantidad);
        } else {
            setTotal(0);
        }
    }, [selectedServicio, cantidad, servicios]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (selectedServicio === null || cantidad <= 0) return;

        const res = await fetch("https://alan-back-aa7lyo-1d86f0-72-60-121-26.traefik.me/crear-pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                items: [{ id_servicio: selectedServicio, peso_kg: cantidad }],
            }),
        });

        const json = await res.json();
        setMensaje(json.mensaje);
        setSelectedServicio(null);
        setCantidad(0);
    };

    return (
        <>
        <Header />
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Crear Nuevo Pedido</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    value={selectedServicio ?? ""}
                    onChange={(e) => setSelectedServicio(Number(e.target.value))}
                    className="border p-2 rounded-xl"
                    required
                >
                    <option value="" disabled>
                        Selecciona un servicio
                    </option>
                    {servicios.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.nombre_servicio} (${s.precio_kg}/kg)
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min={0}
                    placeholder="Cantidad en kg"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="border p-2 rounded-xl"
                    required
                />

                <p className="font-semibold">Total: ${total.toFixed(2)}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-400 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold">Volver</button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                        Crear Pedido
                    </button>
                </div>
            </form>

            {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
        </div>
        </>
    );
}
