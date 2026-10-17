import { useState } from "react";
import { Newspaper, Search, Trash2, X, Calendar, Tag, ArrowRight } from "lucide-react";
import HasSearchedNovidades from "../../components/novidades/HasSearchedNovidades";

interface SearchNovidadesInfo {
    query: string;
}

function getInitialSearch(): { searchInfo: SearchNovidadesInfo; hasSearched: boolean } {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("pesquisa") || "";
    const hasSearched = Boolean(query);

    return {
        searchInfo: {
            query: query || "",
        },
        hasSearched,
    };
}

const Novidades = () => {
    const initial = getInitialSearch();

    const [searchInfo, setSearchInfo] = useState<SearchNovidadesInfo>(initial.searchInfo);
    const [hasSearched, setHasSearched] = useState<boolean>(initial.hasSearched);
    const [query, setQuery] = useState(initial.searchInfo.query);

    const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) {
            alert("Insira um termo para pesquisar nas novidades.");
            return;
        }

        const data: SearchNovidadesInfo = { query };
        setSearchInfo(data);
        setHasSearched(true);

        const params = new URLSearchParams({ pesquisa: query });
        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);

        setTimeout(() => {
            document.getElementById("ofertas-novidades")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    function handleClearSearch() {
        setQuery("");
        setHasSearched(false);
        window.history.replaceState(null, "", window.location.pathname);
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white pt-20">
                <section className="relative isolate overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-brand-dark-bg/65" />

                    <div className="container-travel flex min-h-[480px] flex-col justify-center pb-12 pt-16 sm:pt-20">
                        <div className="mb-8 text-center">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-brand-lime">
                                <Newspaper size={15} aria-hidden="true" />
                                Mantenha-se informado sobre o mundo das viagens
                            </p>

                            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Novidades e Comunicados
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300 sm:text-lg">
                                Conheça as atualizações recentes da Travel.com, dicas de turismo e promoções especiais.
                            </p>
                        </div>

                        {/* Formulário de Busca de Novidades com Flexbox Fluido */}
                        <form
                            onSubmit={handleSearch}
                            className="glass-panel rounded-3xl p-5 shadow-2xl max-w-2xl mx-auto w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-3"
                        >
                            <label className="relative block flex-1 min-w-0">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Pesquisar artigos
                                </span>
                                <Newspaper size={18} className="absolute left-4 top-[42px] text-brand-lime pointer-events-none" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ex: Promoções, Dicas..."
                                    required
                                    className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3.5 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime"
                                />
                            </label>

                            <div className="flex items-center gap-2 shrink-0">
                                {hasSearched && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        title="Limpar busca"
                                        aria-label="Limpar busca"
                                        className="flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 p-3.5 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-brand-lime px-5 py-3.5 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10"
                                >
                                    <Search size={18} />
                                    <span>Buscar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Exibido somente após o utilizador pesquisar */}
                {hasSearched && (
                    <HasSearchedNovidades
                        searchInfo={searchInfo}
                        onSelectArticle={setSelectedArticle}
                        onClearSearch={handleClearSearch}
                    />
                )}
            </main>

            {/* Modal de Detalhes do Artigo */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
                    <section className="w-full max-w-lg overflow-hidden rounded-3xl border border-brand-card-border bg-brand-card-bg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-56">
                            <img src={selectedArticle.image} alt={selectedArticle.title} className="h-full w-full object-cover" />
                            <button onClick={() => setSelectedArticle(null)} className="absolute right-4 top-4 rounded-xl bg-black/70 p-2 text-white hover:bg-black">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-lime bg-brand-lime/10 px-2.5 py-1 rounded-full border border-brand-lime/20">
                                    <Tag size={12} />
                                    {selectedArticle.category}
                                </span>
                                <span className="text-xs text-zinc-400 flex items-center gap-1">
                                    <Calendar size={13} />
                                    {selectedArticle.date}
                                </span>
                            </div>

                            <h2 className="mt-1 text-2xl font-extrabold text-white">{selectedArticle.title}</h2>
                            <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{selectedArticle.summary}</p>

                            <div className="mt-6 pt-4 border-t border-zinc-800">
                                <button onClick={() => setSelectedArticle(null)} className="w-full rounded-xl bg-brand-lime px-5 py-3 font-bold text-brand-dark-bg hover:bg-brand-lime-hover transition">
                                    Fechar leitura
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Novidades;