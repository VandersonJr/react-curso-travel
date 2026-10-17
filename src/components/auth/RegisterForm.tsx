import { useState } from "react";
import { User, UserPlus, Lock, Mail, ArrowRight, ShieldCheck, CheckSquare, Square } from "lucide-react";

interface RegisterFormProps {
    onSuccess: (email: string) => void;
    onNavigateToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onNavigateToLogin }: RegisterFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem. Verifique e tente novamente.");
            return;
        }

        if (!acceptTerms) {
            alert("Você precisa aceitar os Termos de Uso para criar uma conta.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            onSuccess(email);
        }, 1000);
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-card-border bg-brand-card-bg/90 backdrop-blur-md">

                {/* Cabeçalho do Card */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-brand-lime mb-3 shadow-inner">
                        <UserPlus size={24} />
                    </div>

                    <h2 className="text-2xl font-extrabold text-white">
                        Criar sua Conta
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                        Cadastre-se na Travel.com e garanta ofertas exclusivas
                    </p>
                </div>

                {/* Formulário de Cadastro */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                            Nome completo
                        </label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-3.5 text-zinc-500" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome"
                                required
                                className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                            E-mail
                        </label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-3.5 text-zinc-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seuemail@exemplo.com"
                                required
                                className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                            Senha
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-3.5 text-zinc-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                            Confirmar senha
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-3.5 text-zinc-500" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime transition"
                            />
                        </div>
                    </div>

                    {/* Termos de Uso */}
                    <div className="flex items-start gap-2.5 pt-1">
                        <button
                            type="button"
                            onClick={() => setAcceptTerms(!acceptTerms)}
                            className="mt-0.5 text-brand-lime shrink-0 focus:outline-none"
                        >
                            {acceptTerms ? <CheckSquare size={18} /> : <Square size={18} className="text-zinc-500" />}
                        </button>
                        <label className="text-xs text-zinc-400 leading-relaxed cursor-pointer select-none" onClick={() => setAcceptTerms(!acceptTerms)}>
                            Li e concordo com os{" "}
                            <span className="text-brand-lime underline">Termos de Uso</span> e{" "}
                            <span className="text-brand-lime underline">Política de Privacidade</span>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-lime px-5 py-3.5 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10 disabled:opacity-50 cursor-pointer"
                    >
                        <span>{loading ? "Criando conta..." : "Criar conta"}</span>
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                {/* Link para redirecionamento à página de login */}
                {onNavigateToLogin && (
                    <div className="mt-6 text-center text-xs text-zinc-400">
                        Já possui uma conta?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToLogin}
                            className="font-bold text-brand-lime hover:underline cursor-pointer"
                        >
                            Faça login aqui
                        </button>
                    </div>
                )}

                {/* Rodapé de Segurança */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck size={14} className="text-brand-lime" />
                    <span>Seus dados estão protegidos</span>
                </div>
            </div>
        </div>
    );
}