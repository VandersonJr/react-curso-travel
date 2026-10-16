import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
    { to: "/passagens", label: "Passagens" },
    { to: "/hospedagem", label: "Hospedagem" },
    { to: "/destinos", label: "Destinos" },
    { to: "/novidades", label: "Novidades" },
];

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const fecharMenu = () => setMenuAberto(false);

    const botaoEntrar =
        "px-3 py-1.5 text-sm font-medium text-white bg-transparent hover:bg-white/10 rounded-lg transition-colors border border-white/20 whitespace-nowrap " +
        "sm:px-4 sm:py-2 xl:text-base";

    const botaoCadastrar =
        "px-3 py-1.5 text-sm font-semibold text-black bg-[#C6FF00] hover:bg-[#b0e000] rounded-lg transition-colors whitespace-nowrap " +
        "sm:px-4 sm:py-2 xl:text-base";

    return (
        <header className="relative w-full bg-[#111111] text-white shadow-md">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8 xl:px-12 2xl:px-16">
                {/* Lado esquerdo: logo e navegação */}
                <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={fecharMenu}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <Plane className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
                        <span className="text-lg font-bold tracking-tight sm:text-xl xl:text-2xl">
                            Travel.com
                        </span>
                    </Link>

                    {/* Navegação desktop (a partir do lg) */}
                    <nav className="hidden items-center gap-5 text-sm font-medium text-gray-300 lg:flex xl:gap-8 xl:text-base">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="transition-colors hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Lado direito: ações e botão do menu */}
                <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
                    {/* Botões de login/cadastro (a partir do sm) */}
                    <div className="hidden items-center gap-2 sm:flex sm:gap-3 xl:gap-4">
                        <Link to="/login" className={botaoEntrar}>
                            Entrar
                        </Link>
                        <Link to="/cadastro" className={botaoCadastrar}>
                            Cadastrar-se
                        </Link>
                    </div>

                    {/* Botão hambúrguer (abaixo do lg) */}
                    <button
                        type="button"
                        onClick={() => setMenuAberto((aberto) => !aberto)}
                        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menuAberto}
                        aria-controls="menu-mobile"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
                    >
                        {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Menu mobile/tablet (abaixo do lg) */}
            {menuAberto && (
                <div
                    id="menu-mobile"
                    className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-[#111111] px-4 pb-4 pt-2 shadow-xl sm:px-6 lg:hidden"
                >
                    <nav className="flex flex-col text-base font-medium text-gray-300">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={fecharMenu}
                                className="rounded-lg px-2 py-3 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Botões dentro do menu, só no mobile (< sm) */}
                    <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4 sm:hidden">
                        <Link
                            to="/login"
                            onClick={fecharMenu}
                            className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                        >
                            Entrar
                        </Link>
                        <Link
                            to="/cadastro"
                            onClick={fecharMenu}
                            className="rounded-lg bg-[#C6FF00] px-4 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-[#b0e000]"
                        >
                            Cadastrar-se
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}