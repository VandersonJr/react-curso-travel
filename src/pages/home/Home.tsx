import { useState } from "react";
import { Plane, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SugestoesViagem from "../../components/sugestoes/SugestoesViagem";

const Home = () => {
    const navigate = useNavigate();

    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [dataIda, setDataIda] = useState("");
    const [aviaoDecolando, setAviaoDecolando] = useState(false);

    function planejarViagem() {
        if (!origem.trim() || !destino.trim() || !dataIda) {
            alert("Informe a origem, o destino e a data da viagem.");
            return;
        }

        if (aviaoDecolando) return;

        setAviaoDecolando(true);

        const parametros = new URLSearchParams({
            origem: origem.trim(),
            destino: destino.trim(),
            dataIda,
        });

        setTimeout(() => {
            navigate(`/passagens?${parametros.toString()}`);
        }, 1000);
    }

    // Classes reutilizadas nos campos para manter consistência entre breakpoints
    const campo =
        "w-full min-w-0 bg-transparent text-zinc-100 placeholder-zinc-400 outline-none " +
        "px-2 py-2 text-sm md:text-base " +
        "sm:bg-zinc-900/40 sm:rounded-lg sm:px-3 " +
        "lg:bg-transparent lg:rounded-none lg:px-2 lg:flex-1";

    const divisor =
        "w-full h-px bg-zinc-700/50 sm:hidden lg:block lg:w-px lg:h-6 lg:shrink-0";

    return (
        <main className="min-h-dvh flex items-center justify-center bg-fundo bg-no-repeat bg-center bg-cover py-8 sm:py-12 lg:py-16">
            <section className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <section className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="flex flex-row items-center gap-2">
                        <Plane
                            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0 text-black ${aviaoDecolando ? "animate-decolar" : ""
                                }`}
                        />

                        <h1 className="text-black font-inter text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                            Travel.com
                        </h1>
                    </div>

                    <p className="text-black text-base sm:text-lg lg:text-xl 2xl:text-2xl">
                        Convide seus amigos e planeje sua próxima viagem
                    </p>
                </section>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        planejarViagem();
                    }}
                    className="
                        w-full mx-auto mt-5 sm:mt-6 lg:mt-8
                        bg-zinc-950/40 backdrop-blur-md border border-white/10
                        rounded-xl shadow-2xl px-3 py-3 sm:px-4 sm:py-4 lg:py-2
                        flex flex-col gap-2
                        sm:grid sm:grid-cols-2 sm:gap-3
                        lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-2
                    "
                >
                    {/* Origem */}
                    <input
                        type="text"
                        placeholder="Onde você está?"
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                        aria-label="Local de origem"
                        required
                        disabled={aviaoDecolando}
                        className={campo}
                    />

                    <div className={divisor} />

                    {/* Destino */}
                    <input
                        type="text"
                        placeholder="Para onde você vai?"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        aria-label="Destino da viagem"
                        required
                        disabled={aviaoDecolando}
                        className={campo}
                    />

                    <div className={divisor} />

                    {/* Data da viagem */}
                    <input
                        type="date"
                        value={dataIda}
                        onChange={(e) => setDataIda(e.target.value)}
                        aria-label="Data de ida"
                        min={new Date().toLocaleDateString("en-CA")}
                        required
                        disabled={aviaoDecolando}
                        className={`${campo} cursor-pointer lg:flex-none lg:w-auto lg:shrink-0`}
                    />

                    {/* Botão de planejamento */}
                    <button
                        type="submit"
                        disabled={aviaoDecolando}
                        className="
                            w-full lg:w-auto lg:shrink-0
                            bg-lime-300 text-lime-950 hover:bg-lime-400
                            rounded-lg py-2.5 px-4 lg:px-5 font-medium
                            flex items-center justify-center gap-2
                            whitespace-nowrap transition-colors shadow-md
                            text-sm md:text-base
                            disabled:opacity-70 disabled:cursor-wait
                        "
                    >
                        {aviaoDecolando
                            ? "Preparando decolagem..."
                            : "Planejar viagem"}

                        <ArrowRight
                            className={`size-5 transition-opacity ${aviaoDecolando ? "opacity-0" : "opacity-100"
                                }`}
                        />
                    </button>
                </form>

                <SugestoesViagem />
            </section>
        </main>
    );
};

export default Home;