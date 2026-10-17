import { useMemo } from "react";
import { Newspaper, ArrowRight, Trash2, Calendar, Tag } from "lucide-react";

interface Article {
    id: string;
    title: string;
    category: string;
    date: string;
    summary: string;
    image: string;
}

const sampleArticles: Article[] = [
    {
        id: "n1",
        title: "Novas rotas internacionais diretas com descontos exclusivos",
        category: "Promoções",
        date: "14 de Outubro, 2026",
        summary: "A Travel.com anuncia parcerias com novas companhias aéreas para oferecer voos semanais para a Europa com preços imperdíveis.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "n2",
        title: "Dicas essenciais para viajar com segurança no final de ano",
        category: "Dicas de Viagem",
        date: "10 de Outubro, 2026",
        summary: "Planeia antecipadamente a sua bagagem, documentação necessária e conheça os melhores truques para evitar filas nos aeroportos.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "n3",
        title: "Expansão da rede de hotéis parceiros na América do Sul",
        category: "Plataforma",
        date: "05 de Outubro, 2026",
        summary: "Adicionamos mais de 500 novos hotéis e resorts com cancelamento gratuito na nossa secção de hospedagem.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    },
];

interface SearchNovidadesInfo {
    query: string;
}

interface HasSearchedNovidadesProps {
    searchInfo: SearchNovidadesInfo;
    onSelectArticle: (article: Article) => void;
    onClearSearch: () => void;
}

export default function HasSearchedNovidades({
    searchInfo,
    onSelectArticle,
    onClearSearch,
}: HasSearchedNovidadesProps) {
    const filteredArticles = useMemo(() => {
        return sampleArticles.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchInfo.query.toLowerCase()) ||
                item.summary.toLowerCase().includes(searchInfo.query.toLowerCase()) ||
                item.category.toLowerCase().includes(searchInfo.query.toLowerCase())
            );
        });
    }, [searchInfo.query]);

    return (
        <section id="ofertas-novidades" className="container-travel py-12 animate-fadeIn">
            <div className="mb-8 rounded-3xl border border-brand-card-border bg-brand-card-bg/90 p-6 backdrop-blur-md flex flex-col justify-between gap-5 lg:flex-row lg:items-center shadow-xl">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-lime">
                            Resultados da Pesquisa
                        </p>
                        <button
                            type="button"
                            onClick={onClearSearch}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                        >
                            <Trash2 size={12} />
                            Limpar busca
                        </button>
                    </div>

                    <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
                        Artigos para "{searchInfo.query || "Todos"}"
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium">
                        Fique a par das últimas novidades, comunicados e dicas de viagem.
                    </p>
                </div>
            </div>

            <div className="min-w-0">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm bg-white p-2 rounded-xl text-black" aria-live="polite">
                        <strong>{filteredArticles.length} artigos encontrados</strong>
                    </p>
                </div>

                {filteredArticles.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredArticles.map((article) => (
                            <article
                                key={article.id}
                                className="group overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card-bg transition hover:-translate-y-1 hover:border-zinc-600 shadow-xl flex flex-col justify-between"
                            >
                                <div>
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-brand-lime bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm border border-brand-lime/20">
                                            <Tag size={12} />
                                            {article.category}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                                            <Calendar size={13} className="text-brand-lime" />
                                            <span>{article.date}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white group-hover:text-brand-lime transition">
                                            {article.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                                            {article.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 pt-0">
                                    <button
                                        type="button"
                                        onClick={() => onSelectArticle(article)}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-sm font-bold text-brand-lime transition hover:bg-zinc-700"
                                    >
                                        <span>Ler artigo completo</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 px-6 py-12 text-center backdrop-blur-md">
                        <Newspaper size={36} className="mx-auto mb-4 text-zinc-500" aria-hidden="true" />
                        <h3 className="text-lg font-bold text-white">Nenhum artigo encontrado</h3>
                        <p className="mt-2 text-sm text-zinc-400">Tente pesquisar por outro termo ou palavra-chave.</p>
                    </div>
                )}
            </div>
        </section>
    );
}