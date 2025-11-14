import { useState } from "react";
import RegistroFormulario from "../components/RegistroFormulario";

export default function LandingLavanderia() {
    const [loginVisible, setLoginVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoginError("");

        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();

            if (json.ok) {
                // Guardar token en localStorage
                localStorage.setItem("token", json.token);

                // Redirigir al dashboard
                window.location.href = "/dashboard";
            } else {
                setLoginError(json.mensaje || "Email o contraseña incorrectos");
            }
        } catch (err) {
            console.error(err);
            setLoginError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <section className="w-full bg-white py-20 px-6 md:px-20 border-b">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Lavandería Industrial para Clientes Corporativos
                        </h1>
                        <p className="text-lg md:text-xl mb-8">
                            Servicios especializados para hoteles, moteles, restaurantes y
                            empresas que buscan calidad, rapidez y procesos higiénicos
                            certificados.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#registro"
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow"
                            >
                                Regístrate
                            </a>
                            <button
                                onClick={() => setLoginVisible(true)}
                                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-4 rounded-2xl shadow"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://img.freepik.com/vector-premium/fondo-lavanderia-lavanderia-domestica-concepto-lavandaria-dibujos-animados-lavanderia-minimalista-plastico_146957-1630.jpg"
                            alt="Lavandería Industrial"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="max-w-6xl mx-auto py-20 px-6 md:px-20" id="servicios">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Servicios Corporativos
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-white shadow p-8 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-4">Hoteles y Moteles</h3>
                        <p>
                            Lavado profesional de sábanas, toallas, fundas, cobertores y más.
                        </p>
                    </div>

                    <div className="bg-white shadow p-8 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-4">Restaurantes</h3>
                        <p>
                            Lavado y desinfección de mantelería, servilletas y textiles para
                            comedor.
                        </p>
                    </div>

                    <div className="bg-white shadow p-8 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-4">Empresas y Servicios</h3>
                        <p>
                            Procesos industriales para uniformes, textiles de alto uso y ropa
                            institucional.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                id="registro"
                className="w-full py-20 bg-blue-600 text-white text-center px-6 md:px-20"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    ¿Listo para recibir un servicio profesional?
                </h2>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Regístrate y uno de nuestros asesores corporativos te contactará para
                    brindarte una propuesta personalizada según tus necesidades.
                </p>

                <a
                    href="#formulario"
                    className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl shadow hover:bg-gray-100"
                >
                    Regístrate Ahora
                </a>
            </section>

            {/* Formulario simple */}
            <RegistroFormulario />

            {/* Login Modal */}
            {loginVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setLoginVisible(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold mb-6">Iniciar Sesión</h3>
                        {loginError && (
                            <p className="text-red-600 mb-4 font-semibold">{loginError}</p>
                        )}
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="border p-3 rounded-xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="border p-3 rounded-xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <footer className="bg-blue-600 text-white mt-20 py-10 px-6 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Lavandería Industrial. Todos los derechos
                    reservados.
                </p>
            </footer>
        </div>
    );
}