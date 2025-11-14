import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResultadoRegistro {
    ok: boolean;
    mensaje?: string;
    acceso?: { email: string; password: string };
}

export default function FormRegistroCliente() {
    const [empresa, setEmpresa] = useState("");
    const [contacto, setContacto] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [enviando, setEnviando] = useState(false);

    const enviarFormulario = async (e: any) => {
        e.preventDefault();
        setEnviando(true);

        const data = { empresa, contacto, email, telefono, descripcion };

        try {
            const res = await fetch("http://localhost:3001/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json: ResultadoRegistro = await res.json();

            if (json.ok) {
                toast.success(
                    `Cliente registrado exitosamente. Revisa tu correo para más detalles.`,
                    { autoClose: 8000 }
                );
                // Limpiar formulario
                setEmpresa("");
                setContacto("");
                setEmail("");
                setTelefono("");
                setDescripcion("");
            } else {
                toast.error(json.mensaje || "Error al registrar cliente");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error al registrar cliente");
        }

        setEnviando(false);
    };

    return (
        <section id="formulario" className="max-w-3xl mx-auto py-20 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center mb-10">
                Registro de Cliente Corporativo
            </h2>

            <form
                onSubmit={enviarFormulario}
                className="grid gap-6 bg-white shadow p-10 rounded-2xl"
            >
                <input
                    className="border p-3 rounded-xl"
                    type="text"
                    placeholder="Nombre de la Empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    required
                />

                <input
                    className="border p-3 rounded-xl"
                    type="text"
                    placeholder="Nombre del Contacto"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    required
                />

                <input
                    className="border p-3 rounded-xl"
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="border p-3 rounded-xl"
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />

                <textarea
                    className="border p-3 rounded-xl"
                    rows={4}
                    placeholder="Direccion de la Empresa"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>

                <button
                    disabled={enviando}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
                >
                    {enviando ? "Enviando..." : "Registrar Cliente"}
                </button>
            </form>

            <ToastContainer position="top-right" />
        </section>
    );
}