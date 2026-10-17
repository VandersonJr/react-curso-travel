import { useState } from "react";
import {
    ArrowDownUp,
    Headphones,
    Plane,
    ShieldCheck,
    X,
    Zap,
} from "lucide-react";

import type {
    Destination,
    Flight,
    Passengers,
    TripType,
} from "../../types/Travel"; // Ajuste o caminho relativo conforme sua estrutura de pastas

import {
    destinations,
    formatCurrency,
} from "../../data/Flights";

import FlightSearch from "../../components/passagens/FlightSearch";
import DestinationCard from "../../components/passagens/DestinationCard";
import HasSearched from "../../components/passagens/HasSearched";

interface SearchInfo {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    tripType: TripType;
    passengers: Passengers;
    cabin: string;
}

function getInitialSearch(): { searchInfo: SearchInfo; hasSearched: boolean } {
    const params = new URLSearchParams(window.location.search);
    const origin = params.get("origem") || "";
    const destination = params.get("destino") || "";
    const departureDate = params.get("dataIda") || "";

    const hasSearched = Boolean(origin && destination && departureDate);

    return {
        searchInfo: {
            origin: origin || "",
            destination: destination || "",
            departureDate: departureDate || "",
            returnDate: params.get("dataVolta") || "",
            tripType: (params.get("tipo") as TripType) || "round",
            passengers: { adults: 1, children: 0 },
            cabin: "Econômica",
        },
        hasSearched,
    };
}

const Passagens = () => {
    const initial = getInitialSearch();

    const [searchInfo, setSearchInfo] = useState<SearchInfo>(initial.searchInfo);
    const [hasSearched, setHasSearched] = useState<boolean>(initial.hasSearched);

    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

    function handleSearch(data: SearchInfo) {
        setSearchInfo(data);
        setHasSearched(true);

        const params = new URLSearchParams({
            origem: data.origin,
            destino: data.destination,
            dataIda: data.departureDate,
            dataVolta: data.returnDate,
            tipo: data.tripType,
        });

        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${params.toString()}`
        );

        setTimeout(() => {
            document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    function formatDate(date: string) {
        if (!date) return "Data não selecionada";
        return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white pt-20">
                {/* Introdução e formulário de pesquisa */}
                <section aria-labelledby="titulo-passagens" className="relative isolate overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-brand-dark-bg/65" />

                    <div className="container-travel flex min-h-[500px] flex-col justify-center pb-12 pt-16 sm:pt-20">
                        <div className="mb-8 text-center">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-brand-lime">
                                <Zap size={15} aria-hidden="true" />
                                As melhores ofertas do dia garantidas
                            </p>

                            <h1 id="titulo-passagens" className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Encontre sua próxima jornada
                            </h1>

                            <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300 sm:text-lg">
                                Compare centenas de companhias aéreas e viaje com os melhores preços.
                            </p>
                        </div>

                        <div id="buscar-passagens">
                            <FlightSearch
                                key={`${searchInfo.origin}-${searchInfo.destination}-${searchInfo.departureDate}`}
                                initialOrigin={searchInfo.origin}
                                initialDestination={searchInfo.destination}
                                initialDate={searchInfo.departureDate}
                                onSearch={handleSearch}
                            />
                        </div>

                        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-zinc-200 sm:text-sm">
                            <li className="flex items-center gap-2">
                                <ShieldCheck size={17} className="text-brand-lime" aria-hidden="true" />
                                Compare opções de voos
                            </li>
                            <li className="flex items-center gap-2">
                                <ArrowDownUp size={17} className="text-brand-lime" aria-hidden="true" />
                                Ordene por preço e duração
                            </li>
                            <li className="flex items-center gap-2">
                                <Headphones size={17} className="text-brand-lime" aria-hidden="true" />
                                Planeje sua próxima viagem
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Exibe o componente HasSearched apenas se a busca foi acionada */}
                {hasSearched && (
                    <HasSearched
                        searchInfo={searchInfo}
                        onSelectFlight={setSelectedFlight}
                    />
                )}

                {/* Sugestões de destinos */}
                <section id="destinos" aria-labelledby="titulo-destinos" className="border-t border-white/10 bg-brand-dark-bg/70 py-14 backdrop-blur-sm md:py-20">
                    <div className="container-travel">
                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold text-brand-lime">INSPIRE-SE</p>
                            <h2 id="titulo-destinos" className="text-2xl font-extrabold sm:text-3xl">
                                Ofertas e sugestões de destinos
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                                Descubra lugares incríveis e comece a planejar sua próxima viagem.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {destinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                    onSelect={setSelectedDestination}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal: detalhes da passagem */}
            {selectedFlight && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedFlight(null)}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-voo"
                        className="my-auto w-full max-w-lg rounded-3xl border border-brand-card-border bg-brand-card-bg p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-brand-lime">DETALHES DO VOO</p>
                                <h2 id="titulo-modal-voo" className="mt-2 text-2xl font-extrabold">
                                    {selectedFlight.airline}
                                </h2>
                                <p className="mt-1 text-sm text-zinc-300">Voo {selectedFlight.flightNum}</p>
                            </div>
                            <button
                                type="button"
                                aria-label="Fechar detalhes da passagem"
                                onClick={() => setSelectedFlight(null)}
                                className="rounded-xl bg-zinc-800 p-2 text-zinc-200 hover:bg-zinc-700"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="rounded-2xl border border-brand-card-border p-5">
                            <p className="text-sm text-zinc-300">
                                {searchInfo.origin} → {searchInfo.destination}
                            </p>
                            <div className="my-5 grid grid-cols-3 items-center gap-2">
                                <div>
                                    <p className="text-2xl font-bold">{selectedFlight.departTime}</p>
                                    <p className="text-xs text-zinc-400">Partida</p>
                                </div>
                                <div className="text-center text-xs text-zinc-300">
                                    <p>{selectedFlight.duration}</p>
                                    <div className="my-2 h-px bg-zinc-700" />
                                    <p>{selectedFlight.stopsText}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">{selectedFlight.arrivalTime}</p>
                                    <p className="text-xs text-zinc-400">Chegada</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-300">Data de ida: {formatDate(searchInfo.departureDate)}</p>
                            <p className="mt-3 text-sm text-zinc-300">
                                Passageiros: {searchInfo.passengers.adults + searchInfo.passengers.children}
                            </p>
                            <div className="mt-5 border-t border-brand-card-border pt-5">
                                <p className="text-sm text-zinc-300">Preço por passageiro</p>
                                <p className="mt-1 text-3xl font-extrabold text-brand-lime">
                                    {formatCurrency(selectedFlight.price)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                alert("Reserva efetuada com sucesso!");
                                setSelectedFlight(null);
                            }}
                            className="mt-6 w-full rounded-xl bg-brand-lime px-5 py-4 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover"
                        >
                            Continuar
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Passagens;