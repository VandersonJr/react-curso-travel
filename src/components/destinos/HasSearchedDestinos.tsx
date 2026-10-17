import { useState, useMemo } from "react";
import { ArrowUpRight, MapPin, Compass, Trash2, Search } from "lucide-react";
import { formatCurrency } from "../../data/Flights";

interface DestinationItem {
    id: string;
    title: string;
    airport: string;
    description: string;
    price: number;
    images: string[];
}

const sampleDestinationsList: DestinationItem[] = [
    {
        id: "d1",
        title: "Rio de Janeiro, Brasil",
        airport: "GIG / SDU",
        description: "Explore praias icônicas, o Cristo Redentor e paisagens inesquecíveis.",
        price: 350,
        images: [
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=600&q=80",
        ],
    },
    {
        id: "d2",
        title: "Fernando de Noronha, Brasil",
        airport: "FEN",
        description: "Mergulhe nas águas mais cristalinas do Atlântico e praias paradisíacas.",
        price: 1200,
        images: [
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        ],
    },
    {
        id: "d3",
        title: "Lisboa, Portugal",
        airport: "LIS",
        description: "Descubra a história, a gastronomia única e o charme europeu à beira do Tejo.",
        price: 2800,
        images: [
            "https://images.unsplash.com/photo-1513603523312-36c927f8a91c?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1548711645-22595080b0d3?auto=format&fit=crop&w=600&q=80",
        ],
    },
];

interface SearchDestinosInfo {
    query: string;
}

interface HasSearchedDestinosProps {
    searchInfo: SearchDestinosInfo;
    onSelectDestination: (dest: DestinationItem) => void;
    onClearSearch: () => void;
}

export default function HasSearchedDestinos({
    searchInfo,
    onSelectDestination,
    onClearSearch,
}: HasSearchedDestinosProps) {
    const [maxPrice, setMaxPrice] = useState(3000);

    const filteredDestinations = useMemo(() => {
        return sampleDestinationsList.filter((item) => {
            const matchesQuery = item.title.toLowerCase().includes(searchInfo.query.toLowerCase()) ||
                item.description.toLowerCase().includes(searchInfo.query.toLowerCase());
            const matchesPrice = item.price <= maxPrice;
            return matchesQuery && matchesPrice;
        });
    }, [searchInfo.query, maxPrice]);

    return (
        <section id="ofertas-destinos" className="container-travel py-12 animate-fadeIn">
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
                        Destinos para "{searchInfo.query || "Todos"}"
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium">
                        Encontre pacotes e sugestões personalizadas para o seu roteiro.
                    </p>
                </div>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="glass-panel h-fit rounded-2xl p-5">
                    <h3 className="mb-4 font-semibold text-white">Orçamento Máximo</h3>
                    <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Até {formatCurrency(maxPrice)}</span>
                    </div>
                    <input
                        type="range"
                        min={300}
                        max={5000}
                        step={200}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-brand-lime"
                    />
                </aside>

                <div className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm bg-white p-2 rounded-xl text-black" aria-live="polite">
                            <strong>{filteredDestinations.length} destinos encontrados</strong>
                        </p>
                        <span className="text-xs text-zinc-400">Valores a partir de</span>
                    </div>

                    {filteredDestinations.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredDestinations.map((dest) => (
                                <article
                                    key={dest.id}
                                    className="group overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card-bg transition hover:-translate-y-1 hover:border-zinc-600 shadow-xl"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={dest.images[0]}
                                            alt={dest.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                        <span className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                                            <MapPin size={16} className="text-brand-lime" />
                                            {dest.airport}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-white">{dest.title}</h3>
                                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                                            {dest.description}
                                        </p>

                                        <div className="mt-5 flex items-end justify-between gap-3">
                                            <div>
                                                <p className="text-xs text-zinc-500">A partir de</p>
                                                <p className="mt-1 text-xl font-extrabold text-brand-lime">
                                                    {formatCurrency(dest.price)}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => onSelectDestination(dest)}
                                                aria-label={`Explorar destino: ${dest.title}`}
                                                className="rounded-xl bg-zinc-800 p-3 text-brand-lime transition hover:bg-zinc-700"
                                            >
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 px-6 py-12 text-center backdrop-blur-md">
                            <Compass size={36} className="mx-auto mb-4 text-zinc-500" aria-hidden="true" />
                            <h3 className="text-lg font-bold text-white">Nenhum destino encontrado</h3>
                            <p className="mt-2 text-sm text-zinc-400">Tente ajustar o termo pesquisado ou o orçamento máximo.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}