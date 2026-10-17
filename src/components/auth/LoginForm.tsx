import { useState } from "react";
import { User, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

interface LoginFormProps {
    onSuccess: (email: string) => void;
    onNavigateToRegister?: () => void;
}

export default function LoginForm({ onSuccess, onNavigateToRegister }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            alert("Preencha o e-mail e a senha.");
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
                        <User size={24} />
                    </div>

                    <h2 className="text-2xl font-extrabold text-white">
                        Acessar sua Conta
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                        Entre para gerenciar suas viagens na Travel.com
                    </p>
                </div>

                {/* Formulário de Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Senha
                            </label>
                            <button
                                type="button"
                                onClick={() => alert("Instruções de recuperação enviadas ao seu e-mail.")}
                                className="text-xs text-brand-lime hover:underline"
                            >
                                Esqueceu a senha?
                            </button>
                        </div>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-lime px-5 py-3.5 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10 disabled:opacity-50 cursor-pointer"
                    >
                        <span>{loading ? "Entrando..." : "Acessar conta"}</span>
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                {/* Link para redirecionamento à página de cadastro */}
                {onNavigateToRegister && (
                    <div className="mt-6 text-center text-xs text-zinc-400">
                        Ainda não possui uma conta?{" "}
                        <button
                            type="button"
                            onClick={onNavigateToRegister}
                            className="font-bold text-brand-lime hover:underline cursor-pointer"
                        >
                            Cadastre-se aqui
                        </button>
                    </div>
                )}

                {/* Rodapé de Segurança */}
                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck size={14} className="text-brand-lime" />
                    <span>Ambiente seguro e criptografado</span>
                </div>
            </div>
        </div>
    );
}