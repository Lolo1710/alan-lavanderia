import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";

export default function Perfil() {
    const [datos, setDatos] = useState({
        nombre_completo: "",
        correo: "",
        telefono: "",
        direccion: ""
    });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
    const [passMensaje, setPassMensaje] = useState("");
    const [passError, setPassError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:3001/profile", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setDatos({
                        nombre_completo: data.user.nombre_completo || "",
                        correo: data.user.correo || "",
                        telefono: data.user.telefono || "",
                        direccion: data.user.direccion || ""
                    });
                } else setError("No se pudieron cargar tus datos");
            });
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const handlePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const actualizarDatos = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(""); setError("");
        try {
            const res = await fetch("http://localhost:3001/usuario", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(datos)
            });
            const data = await res.json();
            data.ok ? toast.success(data.mensaje) : toast.error(data.mensaje);
        } catch {
            setError("Error al actualizar los datos");
        }
    };

    const cambiarPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPassMensaje(""); setPassError("");
        try {
            const res = await fetch("http://localhost:3001/usuario/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(passwords)
            });
            const data = await res.json();
            data.ok ? toast.success(data.mensaje) : toast.error(data.mensaje);
        } catch {
            setPassError("Error al cambiar la contraseña");
        }
    };

    return (
        <>
        <Header />
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Actualizar Datos</h2>
            {mensaje && <p className="text-green-600 mb-2">{mensaje}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={actualizarDatos} className="flex flex-col gap-4 mb-8">
                <input name="nombre_completo" value={datos.nombre_completo} onChange={handleChange} placeholder="Nombre completo" className="border p-3 rounded-lg" />
                <input name="correo" value={datos.correo} onChange={handleChange} placeholder="Correo electrónico" className="border p-3 rounded-lg" />
                <input name="telefono" value={datos.telefono} onChange={handleChange} placeholder="Teléfono" className="border p-3 rounded-lg" />
                <input name="direccion" value={datos.direccion} onChange={handleChange} placeholder="Dirección" className="border p-3 rounded-lg" />
                <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Actualizar Datos</button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
            {passMensaje && <p className="text-green-600 mb-2">{passMensaje}</p>}
            {passError && <p className="text-red-600 mb-2">{passError}</p>}
            <form onSubmit={cambiarPassword} className="flex flex-col gap-4">
                <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswords} placeholder="Contraseña actual" className="border p-3 rounded-lg" required />
                <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswords} placeholder="Nueva contraseña" className="border p-3 rounded-lg" required />
                <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">Cambiar Contraseña</button>
            </form>
            <ToastContainer position="top-right" />
        </div>
        </>
    );
}
