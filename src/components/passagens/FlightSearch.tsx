
import { useState } from "react";
import { ArrowRightLeft, CalendarDays, MapPin, Plane, Search, Users } from "lucide-react";

import type { Passengers, TripType } from "../../types/Travel";

interface FlightSearchProps {
    initialOrigin: string;
    initialDestination: string;
    initialDate: string;
    onSearch: (search: {
        origin: string;
        destination: string;
        departureDate: string;
        returnDate: string;
        tripType: TripType;
        passengers: Passengers;
        cabin: string;
    }) => void;
}

export default function FlightSearch({
    initialOrigin,
    initialDestination,
    initialDate,
    onSearch,
}: FlightSearchProps) {
    const [tripType, setTripType] = useState<TripType>("round");
    const [origin, setOrigin] = useState(initialOrigin);
    const [destination, setDestination] = useState(initialDestination);
    const [departureDate, setDepartureDate] = useState(
        initialDate || "2026-11-15"
    );
    const [returnDate, setReturnDate] = useState("2026-11-22");
    const [passengers, setPassengers] = useState<Passengers>({
        adults: 1,
        children: 0,
    });
    const [cabin, setCabin] = useState("Econômica");

    function swapAirports() {
        setOrigin(destination);
        setDestination(origin);
    }

    function handleSearch() {
        if (!origin.trim() || !destination.trim() || !departureDate) {
            alert("Informe a origem, o destino e a data da viagem.");
            return;
        }

        if (tripType === "round" && returnDate < departureDate) {
            alert("A data de volta não pode ser anterior à data de ida.");
            return;
        }

        onSearch({
            origin,
            destination,
            departureDate,
            returnDate,
            tripType,
            passengers,
            cabin,
        });
    }

    return (
        <section
            id="buscar-passagens"
            className="glass-panel rounded-3xl p-5 shadow-2xl md:p-7"
        >
            <div className="mb-6 flex flex-wrap gap-2">
                {[
                    { value: "round", label: "Ida e volta" },
                    { value: "oneWay", label: "Apenas ida" },
                    { value: "multi", label: "Múltiplos destinos" },
                ].map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setTripType(option.value as TripType)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tripType === option.value
                            ? "bg-brand text-dark-bg"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
                <label className="relative block lg:col-span-3">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Origem
                    </span>
                    <MapPin
                        size={18}
                        className="absolute left-4 top-[42px] text-brand"
                    />
                    <input
                        value={origin}
                        onChange={(event) => setOrigin(event.target.value)}
                        placeholder="Cidade ou aeroporto"
                        className="w-full rounded-xl border border-card-border bg-input-bg py-3.5 pl-11 pr-3 text-sm outline-none transition focus:border-brand"
                    />
                </label>

                <div className="flex items-end justify-center lg:col-span-1">
                    <button
                        type="button"
                        onClick={swapAirports}
                        aria-label="Inverter origem e destino"
                        title="Inverter origem e destino"
                        className="mb-1 rounded-full border border-card-border bg-zinc-800 p-3 text-brand transition hover:bg-zinc-700"
                    >
                        <ArrowRightLeft size={19} />
                    </button>
                </div>

                <label className="relative block lg:col-span-3">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Destino
                    </span>
                    <Plane
                        size={18}
                        className="absolute left-4 top-[42px] text-brand"
                    />
                    <input
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                        placeholder="Para onde você vai?"
                        className="w-full rounded-xl border border-card-border bg-input-bg py-3.5 pl-11 pr-3 text-sm outline-none transition focus:border-brand"
                    />
                </label>

                <label className="relative block lg:col-span-2">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Ida
                    </span>
                    <CalendarDays
                        size={18}
                        className="absolute left-4 top-[42px] text-brand"
                    />
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(event) => setDepartureDate(event.target.value)}
                        className="w-full rounded-xl border border-card-border bg-input-bg py-3.5 pl-11 pr-2 text-sm text-white outline-none focus:border-brand"
                    />
                </label>

                <label className="relative block lg:col-span-3">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Volta
                    </span>
                    <CalendarDays
                        size={18}
                        className="absolute left-4 top-[42px] text-brand"
                    />
                    <input
                        type="date"
                        value={returnDate}
                        disabled={tripType === "oneWay"}
                        onChange={(event) => setReturnDate(event.target.value)}
                        className="w-full rounded-xl border border-card-border bg-input-bg py-3.5 pl-11 pr-2 text-sm text-white outline-none focus:border-brand disabled:opacity-40"
                    />
                </label>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-card-border bg-input-bg p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        <Users size={16} />
                        Passageiros
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-zinc-200">
                            {passengers.adults} adulto(s), {passengers.children} criança(s)
                        </span>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Remover adulto"
                                onClick={() =>
                                    setPassengers((current) => ({
                                        ...current,
                                        adults: Math.max(1, current.adults - 1),
                                    }))
                                }
                                className="h-8 w-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                            >
                                −
                            </button>
                            <button
                                type="button"
                                aria-label="Adicionar adulto"
                                onClick={() =>
                                    setPassengers((current) => ({
                                        ...current,
                                        adults: Math.min(9, current.adults + 1),
                                    }))
                                }
                                className="h-8 w-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-sm text-zinc-400">Crianças</span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Remover criança"
                                onClick={() =>
                                    setPassengers((current) => ({
                                        ...current,
                                        children: Math.max(0, current.children - 1),
                                    }))
                                }
                                className="h-8 w-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                            >
                                −
                            </button>
                            <button
                                type="button"
                                aria-label="Adicionar criança"
                                onClick={() =>
                                    setPassengers((current) => ({
                                        ...current,
                                        children: Math.min(8, current.children + 1),
                                    }))
                                }
                                className="h-8 w-8 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <label className="block rounded-xl border border-card-border bg-input-bg p-3">
                    <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Classe
                    </span>
                    <select
                        value={cabin}
                        onChange={(event) => setCabin(event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none"
                    >
                        <option className="bg-zinc-900">Econômica</option>
                        <option className="bg-zinc-900">Econômica Premium</option>
                        <option className="bg-zinc-900">Executiva</option>
                        <option className="bg-zinc-900">Primeira Classe</option>
                    </select>
                </label>

                <button
                    type="button"
                    onClick={handleSearch}
                    className="flex min-h-16 items-center justify-center gap-3 rounded-xl bg-brand px-5 py-4 font-bold text-dark-bg transition hover:bg-brand-hover"
                >
                    <Search size={20} />
                    Buscar passagens
                </button>
            </div>
        </section>
    );
}
