import { Link } from "react-router-dom"; // opcional si usas React Router

export default function DashboardHeader() {
    return (
        <header className="bg-blue-600 text-white shadow-md mb-2">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">Lavandería Dashboard</h1>
                <nav className="flex gap-4">
                    {/* Usando React Router */}
                    <Link
                        to="/dashboard"
                        className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/crear-pedido"
                        className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Crear Pedido
                    </Link>
                    <Link
                        to="/historial"
                        className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Historial
                    </Link>
                    <Link
                        to="/perfil"
                        className="px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Perfil
                    </Link>
                </nav>
            </div>
        </header>
    );
}