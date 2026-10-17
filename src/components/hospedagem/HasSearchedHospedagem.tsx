import { useState, useMemo } from "react";
import { ArrowDownUp, MapPin, Star, Building2, Trash2 } from "lucide-react";

import { formatCurrency } from "../../data/Flights";

interface Hotel {
    id: string;
    name: string;
    location: string;
    pricePerNight: number;
    rating: number;
    reviewsCount: number;
    image: string;
    badge?: string;
}

const sampleHotels: Hotel[] = [
    {
        id: "h1",
        name: "Copacabana Palace Hotel",
        location: "Rio de Janeiro, RJ • A 200m da praia",
        pricePerNight: 1250,
        rating: 4.9,
        reviewsCount: 320,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        badge: "Mais bem avaliado",
    },
    {
        id: "h2",
        name: "Grand Mercure SP Itaim",
        location: "São Paulo, SP • Próximo à Faria Lima",
        pricePerNight: 580,
        rating: 4.6,
        reviewsCount: 190,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        badge: "Excelente custo-benefício",
    },
    {
        id: "h3",
        name: "Emiliano Rio",
        location: "Copacabana, Rio de Janeiro • Vista para o mar",
        pricePerNight: 1650,
        rating: 4.8,
        reviewsCount: 145,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    },
];

interface SearchHospedagemInfo {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

interface HasSearchedHospedagemProps {
    searchInfo: SearchHospedagemInfo;
    onSelectHotel: (hotel: Hotel) => void;
    onClearSearch: () => void;
}

export default function HasSearchedHospedagem({
    searchInfo,
    onSelectHotel,
    onClearSearch,
}: HasSearchedHospedagemProps) {
    const [maxPrice, setMaxPrice] = useState(2000);
    const [sortBy, setSortBy] = useState<"price" | "rating">("price");

    const filteredHotels = useMemo(() => {
        const result = sampleHotels.filter((hotel) => hotel.pricePerNight <= maxPrice);

        return result.sort((a, b) => {
            if (sortBy === "price") return a.pricePerNight - b.pricePerNight;
            return b.rating - a.rating;
        });
    }, [maxPrice, sortBy]);

    function formatDate(date: string) {
        if (!date) return "Data não selecionada";
        return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <section id="ofertas-hospedagem" className="container-travel py-12 animate-fadeIn">
            <div className="mb-8 rounded-3xl border border-brand-card-border bg-brand-card-bg/90 p-6 backdrop-blur-md flex flex-col justify-between gap-5 lg:flex-row lg:items-center shadow-xl">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-lime">
                            Hospedagens Disponíveis
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
                        Opções em {searchInfo.destination || "Destino selecionado"}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium">
                        Check-in: {formatDate(searchInfo.checkIn)} • Check-out: {formatDate(searchInfo.checkOut)} • {searchInfo.guests} hóspede(s)
                    </p>
                </div>

                <label className="flex items-center gap-3 self-start lg:self-auto rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm shadow-inner">
                    <span className="flex items-center gap-2 text-zinc-300 shrink-0">
                        <ArrowDownUp size={17} aria-hidden="true" />
                        Ordenar:
                    </span>
                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value as "price" | "rating")}
                        className="bg-transparent font-semibold text-white outline-none cursor-pointer"
                    >
                        <option value="price" className="bg-brand-card-bg text-white">Menor preço por noite</option>
                        <option value="rating" className="bg-brand-card-bg text-white">Melhor avaliação</option>
                    </select>
                </label>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="glass-panel h-fit rounded-2xl p-5">
                    <h3 className="mb-4 font-semibold">Filtrar por Preço</h3>
                    <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Até {formatCurrency(maxPrice)}</span>
                    </div>
                    <input
                        type="range"
                        min={300}
                        max={3000}
                        step={100}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-brand-lime"
                    />
                </aside>

                <div className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm bg-white p-2 rounded-xl text-black" aria-live="polite">
                            <strong>{filteredHotels.length} acomodações encontradas</strong>
                        </p>
                        <span className="text-xs text-zinc-400">Valores por diária</span>
                    </div>

                    {filteredHotels.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredHotels.map((hotel) => (
                                <article
                                    key={hotel.id}
                                    className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 p-5 backdrop-blur-md flex flex-col md:flex-row gap-5 items-center justify-between transition hover:border-zinc-500 shadow-xl"
                                >
                                    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
                                        <img
                                            src={hotel.image}
                                            alt={hotel.name}
                                            className="w-full md:w-48 h-36 object-cover rounded-xl"
                                        />
                                        <div className="flex-1">
                                            {hotel.badge && (
                                                <span className="inline-block rounded-full bg-brand-lime/10 px-3 py-1 mb-2 text-xs font-semibold text-brand-lime border border-brand-lime/20">
                                                    {hotel.badge}
                                                </span>
                                            )}
                                            <h3 className="text-lg font-bold text-white">{hotel.name}</h3>
                                            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                                                <MapPin size={14} className="text-brand-lime" />
                                                {hotel.location}
                                            </p>
                                            <div className="flex items-center gap-1 mt-3 text-xs text-amber-400 font-bold">
                                                <Star size={14} fill="currentColor" />
                                                <span>{hotel.rating}</span>
                                                <span className="text-zinc-500 font-normal">({hotel.reviewsCount} avaliações)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-zinc-800 flex md:flex-col justify-between items-center md:items-end">
                                        <div>
                                            <p className="text-xs text-zinc-400">Diária a partir de</p>
                                            <p className="text-2xl font-extrabold text-brand-lime">{formatCurrency(hotel.pricePerNight)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => onSelectHotel(hotel)}
                                            className="mt-3 rounded-xl bg-brand-lime px-5 py-2.5 text-sm font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10"
                                        >
                                            Ver quarto
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 px-6 py-12 text-center backdrop-blur-md">
                            <Building2 size={36} className="mx-auto mb-4 text-zinc-500" aria-hidden="true" />
                            <h3 className="text-lg font-bold text-white">Nenhum hotel encontrado</h3>
                            <p className="mt-2 text-sm text-zinc-400">Tente expandir o valor máximo do filtro de preço.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}