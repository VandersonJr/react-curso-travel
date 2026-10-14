import { Plane, Bell, User } from 'lucide-react'; // Certifique-se de ter o lucide-react instalado ou use seus próprios ícones
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full bg-[#111111] text-white px-6 py-4 flex items-center justify-between shadow-md">
            {/* Lado Esquerdo: Logo e Navegação */}
            <div className="flex items-center space-x-8">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="text-white text-black p-1.5 rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6" />
                    </div>
                    <Link to="/" className="text-xl font-bold tracking-tight">Travel.com</Link>
                </div>

                {/* Links de Navegação */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                    <Link to="/passagens" className="hover:text-white transition-colors">Passagens</Link>
                    <Link to="/hospedagem" className="hover:text-white transition-colors">Hospedagem</Link>
                    <Link to="/destinos" className="hover:text-white transition-colors">Destinos</Link>
                    <Link to="/novidades" className="hover:text-white transition-colors">Novidades</Link>
                </nav>
            </div>

            {/* Lado Direito: Botões de Ação e Perfil */}
            <div className="flex items-center space-x-4">
                {/* Botão Entrar */}
                <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-transparent hover:bg-white/10 rounded-lg transition-colors border border-white/20"
                >
                    Entrar
                </Link>

                {/* Botão Cadastrar-se */}
                <Link
                    to="/cadastro"
                    className="px-4 py-2 text-sm font-semibold text-black bg-[#C6FF00] hover:bg-[#b0e000] rounded-lg transition-colors"
                >
                    Cadastrar-se
                </Link>

            </div>
        </header>
    );
}