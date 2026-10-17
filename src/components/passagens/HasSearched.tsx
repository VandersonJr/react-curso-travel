import { useState, useMemo } from "react";
import { ArrowDownUp, ArrowRight, Plane, Trash2 } from "lucide-react";

import type {
    Flight,
    FlightFilters as Filters,
    SortOption,
} from "../../types/Travel";

import { sampleFlights } from "../../data/Flights";
import FlightFilters from "./FlightFilters";
import FlightCard from "./FlightCard";

interface SearchInfo {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    tripType: string;
    passengers: { adults: number; children: number };
    cabin: string;
}

interface HasSearchedProps {
    searchInfo: SearchInfo;
    onSelectFlight: (flight: Flight) => void;
    onClearSearch: () => void;
}

export default function HasSearched({ searchInfo, onSelectFlight, onClearSearch }: HasSearchedProps) {
    const [filters, setFilters] = useState<Filters>({
        stops: [0, 1],
        airlines: ["LATAM", "GOL", "Azul"],
        maxPrice: 1500,
    });

    const [sortBy, setSortBy] = useState<SortOption>("price");

    const filteredFlights = useMemo(() => {
        const result = sampleFlights.filter((flight) => {
            const matchesPrice = flight.price <= filters.maxPrice;
            const matchesStops = filters.stops.includes(flight.stops);
            const matchesAirline = filters.airlines.includes(flight.airline);

            return matchesPrice && matchesStops && matchesAirline;
        });

        return result.sort((a, b) => {
            if (sortBy === "price") return a.price - b.price;
            if (sortBy === "duration") return a.durationMinutes - b.durationMinutes;
            return a.departTime.localeCompare(b.departTime);
        });
    }, [filters, sortBy]);

    function formatDate(date: string) {
        if (!date) return "Data não selecionada";
        return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    function clearFilters() {
        setFilters({
            stops: [0, 1],
            airlines: ["LATAM", "GOL", "Azul"],
            maxPrice: 1500,
        });
    }

    return (
        <section
            id="ofertas"
            aria-labelledby="titulo-resultados"
            className="container-travel py-12 animate-fadeIn"
        >
            <div className="mb-8 rounded-3xl border border-brand-card-border bg-brand-card-bg/90 p-6 backdrop-blur-md flex flex-col justify-between gap-5 lg:flex-row lg:items-center shadow-xl">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-lime">
                            Resultados da Busca
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

                    <h2 id="titulo-resultados" className="text-2xl font-extrabold sm:text-3xl text-white">
                        Passagens para sua viagem
                    </h2>

                    <p className="mt-2 text-sm text-zinc-200 flex items-center gap-2">
                        <span className="font-semibold text-white">{searchInfo.origin}</span>
                        <ArrowRight size={14} className="text-brand-lime shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-white">{searchInfo.destination}</span>
                    </p>

                    <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium">
                        Ida: {formatDate(searchInfo.departureDate)}
                        {searchInfo.tripType === "round" && ` • Volta: ${formatDate(searchInfo.returnDate)}`}
                        {" • "}
                        {searchInfo.passengers.adults + searchInfo.passengers.children} passageiro(s) • {searchInfo.cabin}
                    </p>
                </div>

                <label className="flex items-center gap-3 self-start lg:self-auto rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm shadow-inner">
                    <span className="flex items-center gap-2 text-zinc-300 shrink-0">
                        <ArrowDownUp size={17} aria-hidden="true" />
                        Ordenar:
                    </span>

                    <select
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value as SortOption)}
                        className="bg-transparent font-semibold text-white outline-none cursor-pointer"
                    >
                        <option value="price" className="bg-brand-card-bg text-white">Menor preço</option>
                        <option value="duration" className="bg-brand-card-bg text-white">Menor duração</option>
                        <option value="departure" className="bg-brand-card-bg text-white">Horário de saída</option>
                    </select>
                </label>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <FlightFilters filters={filters} onChange={setFilters} />

                <div className="min-w-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm bg-white p-2 rounded-xl text-black" aria-live="polite">
                            <strong>{filteredFlights.length} resultados encontrados</strong>
                        </p>
                        <span className="text-xs text-zinc-400">Valores por passageiro</span>
                    </div>

                    {filteredFlights.length > 0 ? (
                        <div className="grid gap-4 flight-scrollbar max-h-[900px] overflow-y-auto pr-1">
                            {filteredFlights.map((flight) => (
                                <FlightCard key={flight.id} flight={flight} onDetails={onSelectFlight} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 px-6 py-12 text-center backdrop-blur-md">
                            <Plane size={36} className="mx-auto mb-4 text-zinc-500" aria-hidden="true" />
                            <h3 className="text-lg font-bold text-white">Nenhum voo encontrado</h3>
                            <p className="mt-2 text-sm text-zinc-400">
                                Experimente alterar o preço máximo ou os filtros selecionados.
                            </p>
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-5 rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}