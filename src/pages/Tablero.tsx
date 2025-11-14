import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    role: number;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Verificar token al cargar
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/"; // redirigir si no hay token
            return;
        }

        // Obtener datos del usuario desde el backend
        fetch("https://alan-back-aa7lyo-1d86f0-72-60-121-26.traefik.me/dashboard-data", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    setUser(data.user);
                } else {
                    setError("Token inválido o expirado");
                    localStorage.removeItem("token");
                    setTimeout(() => (window.location.href = "/"), 2000);
                }
            })
            .catch(() => {
                setError("Error al conectar con el servidor");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    if (loading) return <p className="text-center mt-20">Cargando dashboard...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    return (
        <>
        <div className="min-h-screen bg-gray-100 p-6 font-sans">
            <header className="flex justify-center items-center mb-10">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </header>

            <section className="bg-white p-8 rounded-2xl shadow max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Bienvenido, {user?.name}</h2>
                <p className="mb-2">
                    <b>Email:</b> {user?.email}
                </p>
                <p className="mb-2">
                    <b>Rol:</b> {user?.role === 3 ? "Cliente" : "Administrador"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <button 
                    onClick={() => navigate("/crear-pedido")}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow">
                        Nuevo pedido
                    </button>

                    <button 
                    onClick={() => navigate("/perfil")}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold shadow">
                        Perfil
                    </button>

                    <button 
                    onClick={() => navigate("/historial")}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow">
                        Historial y pedidos
                    </button>
                </div>

            </section>

            <footer className="text-center mt-10">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-2xl shadow"
                >
                    Cerrar Sesión
                </button>
            </footer>
        </div>
        </>
    );
}