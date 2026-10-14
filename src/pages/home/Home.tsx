import { useState } from "react";
import { Plane, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

    return (
        <main className="h-screen flex items-center justify-center bg-fundo bg-no-repeat bg-center bg-cover">
            <section className="max-w-3xl w-full px-6 text-center">
                <section className="flex flex-col items-center gap-3">
                    <div className="flex flex-row items-center gap-2 text-white">
                        <Plane
                            className={`w-8 h-8 shrink-0 ${aviaoDecolando
                                ? "animate-decolar"
                                : ""
                                }`}
                        />

                        <h1 className="font-inter text-3xl font-bold">
                            Travel.com
                        </h1>
                    </div>

                    <p className="text-zinc-200 text-lg">
                        Convide seus amigos e planeje sua próxima viagem
                    </p>
                </section>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        planejarViagem();
                    }}
                    className="w-full max-w-7xl min-h-16 bg-zinc-950/40 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex flex-col md:flex-row items-center justify-between gap-2 mt-6 mx-auto shadow-2xl"
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
                        className="bg-transparent text-zinc-100 placeholder-zinc-400 outline-none px-2 py-2 flex-1 min-w-0 w-full text-sm md:text-base"
                    />

                    <div className="w-full h-px bg-zinc-700/50 md:w-px md:h-6" />

                    {/* Destino */}
                    <input
                        type="text"
                        placeholder="Para onde você vai?"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        aria-label="Destino da viagem"
                        required
                        disabled={aviaoDecolando}
                        className="bg-transparent text-zinc-100 placeholder-zinc-400 outline-none px-2 py-2 flex-1 min-w-0 w-full text-sm md:text-base"
                    />

                    <div className="w-full h-px bg-zinc-700/50 md:w-px md:h-6" />

                    {/* Data da viagem */}
                    <input
                        type="date"
                        value={dataIda}
                        onChange={(e) => setDataIda(e.target.value)}
                        aria-label="Data de ida"
                        min={new Date().toLocaleDateString("en-CA")}
                        required
                        disabled={aviaoDecolando}
                        className="bg-transparent text-zinc-100 outline-none px-1 py-2 w-full md:w-auto md:shrink-0 text-sm cursor-pointer"
                    />

                    {/* Botão de planejamento */}
                    <button
                        type="submit"
                        disabled={aviaoDecolando}
                        className="bg-lime-300 text-lime-950 rounded-lg py-2 px-4 font-medium flex items-center justify-center gap-2 hover:bg-lime-400 whitespace-nowrap transition-colors shadow-md w-full md:w-auto md:shrink-0 text-sm md:text-base disabled:opacity-70 disabled:cursor-wait"
                    >
                        {aviaoDecolando
                            ? "Preparando decolagem..."
                            : "Planejar viagem"}

                        <ArrowRight
                            className={`size-5 transition-opacity ${aviaoDecolando
                                ? "opacity-0"
                                : "opacity-100"
                                }`}
                        />
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Home;

