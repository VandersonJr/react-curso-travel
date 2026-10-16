import { useMemo, useState } from "react";
import {
    ArrowDownUp,
    ArrowRight,
    Headphones,
    Plane,
    ShieldCheck,
    User,
    UserPlus,
    X,
    Zap,
} from "lucide-react";

import type {
    Destination,
    Flight,
    FlightFilters as Filters,
    Passengers,
    SortOption,
    TripType,
} from "../../types/Travel";

import {
    destinations,
    formatCurrency,
    sampleFlights,
} from "../../data/Flights";

import FlightSearch from "../../components/passagens/FlightSearch";
import FlightFilters from "../../components/passagens/FlightFilters";
import FlightCard from "../../components/passagens/FlightCard";
import DestinationCard from "../../components/passagens/DestinationCard";

interface SearchInfo {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    tripType: TripType;
    passengers: Passengers;
    cabin: string;
}

function getInitialSearch(): SearchInfo {
    const params = new URLSearchParams(window.location.search);

    return {
        origin: params.get("origem") || "São Paulo (GRU)",
        destination: params.get("destino") || "Rio de Janeiro (GIG)",
        departureDate: params.get("dataIda") || "2026-11-15",
        returnDate: params.get("dataVolta") || "2026-11-22",
        tripType: (params.get("tipo") as TripType) || "round",
        passengers: { adults: 1, children: 0 },
        cabin: "Econômica",
    };
}

const Passagens = () => {
    const initialSearch = getInitialSearch();

    const [filters, setFilters] = useState<Filters>({
        stops: [0, 1],
        airlines: ["LATAM", "GOL", "Azul"],
        maxPrice: 1500,
    });

    const [sortBy, setSortBy] = useState<SortOption>("price");

    const [searchInfo, setSearchInfo] = useState<SearchInfo>(initialSearch);

    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [selectedDestination, setSelectedDestination] =
        useState<Destination | null>(null);

    // Estado do Modal de Autenticação
    const [authModal, setAuthModal] = useState<{
        open: boolean;
        mode: "login" | "register";
    }>({ open: false, mode: "login" });

    const filteredFlights = useMemo(() => {
        const result = sampleFlights.filter((flight) => {
            const matchesPrice = flight.price <= filters.maxPrice;
            const matchesStops = filters.stops.includes(flight.stops);
            const matchesAirline = filters.airlines.includes(flight.airline);

            return matchesPrice && matchesStops && matchesAirline;
        });

        return result.sort((a, b) => {
            if (sortBy === "price") {
                return a.price - b.price;
            }

            if (sortBy === "duration") {
                return a.durationMinutes - b.durationMinutes;
            }

            return a.departTime.localeCompare(b.departTime);
        });
    }, [filters, sortBy]);

    function handleSearch(data: SearchInfo) {
        setSearchInfo(data);

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
    }

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
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">

            {/* Conteúdo principal */}
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white pt-20">
                {/* Introdução e formulário de pesquisa */}
                <section
                    aria-labelledby="titulo-passagens"
                    className="relative isolate overflow-hidden"
                >
                    <div className="absolute inset-0 -z-10 bg-brand-dark-bg/65" />

                    <div className="container-travel flex min-h-[500px] flex-col justify-center pb-12 pt-16 sm:pt-20">
                        <div className="mb-8 text-center">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-brand-lime">
                                <Zap size={15} aria-hidden="true" />
                                As melhores ofertas do dia garantidas
                            </p>

                            <h1
                                id="titulo-passagens"
                                className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
                            >
                                Encontre sua próxima jornada
                            </h1>

                            <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300 sm:text-lg">
                                Compare centenas de companhias aéreas e viaje com os melhores
                                preços.
                            </p>
                        </div>

                        <div id="buscar-passagens">
                            <FlightSearch
                                initialOrigin={initialSearch.origin}
                                initialDestination={initialSearch.destination}
                                initialDate={initialSearch.departureDate}
                                onSearch={handleSearch}
                            />
                        </div>

                        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-zinc-200 sm:text-sm">
                            <li className="flex items-center gap-2">
                                <ShieldCheck
                                    size={17}
                                    className="text-brand-lime"
                                    aria-hidden="true"
                                />
                                Compare opções de voos
                            </li>

                            <li className="flex items-center gap-2">
                                <ArrowDownUp
                                    size={17}
                                    className="text-brand-lime"
                                    aria-hidden="true"
                                />
                                Ordene por preço e duração
                            </li>

                            <li className="flex items-center gap-2">
                                <Headphones
                                    size={17}
                                    className="text-brand-lime"
                                    aria-hidden="true"
                                />
                                Planeje sua próxima viagem
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Lista de passagens e filtros */}
                <section
                    id="ofertas"
                    aria-labelledby="titulo-resultados"
                    className="container-travel py-12"
                >
                    {/* Cabeçalho da Seção com Fundo de Vidro para Contraste Perfeito */}
                    <div className="mb-8 rounded-3xl border border-brand-card-border bg-brand-card-bg/90 p-6 backdrop-blur-md flex flex-col justify-between gap-5 lg:flex-row lg:items-center shadow-xl">
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-lime">
                                Resultados da Busca
                            </p>

                            <h2
                                id="titulo-resultados"
                                className="text-2xl font-extrabold sm:text-3xl text-white"
                            >
                                Passagens para sua viagem
                            </h2>

                            <p className="mt-2 text-sm text-zinc-200 flex items-center gap-2">
                                <span className="font-semibold text-white">{searchInfo.origin}</span>
                                <ArrowRight
                                    size={14}
                                    className="text-brand-lime shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="font-semibold text-white">{searchInfo.destination}</span>
                            </p>

                            <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-medium">
                                Ida: {formatDate(searchInfo.departureDate)}
                                {searchInfo.tripType === "round" &&
                                    ` • Volta: {formatDate(searchInfo.returnDate)}`}
                                {" • "}
                                {searchInfo.passengers.adults +
                                    searchInfo.passengers.children}{" "}
                                passageiro(s) • {searchInfo.cabin}
                            </p>
                        </div>

                        {/* Ordenação */}
                        <label className="flex items-center gap-3 self-start lg:self-auto rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm shadow-inner">
                            <span className="flex items-center gap-2 text-zinc-300 shrink-0">
                                <ArrowDownUp size={17} aria-hidden="true" />
                                Ordenar:
                            </span>

                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(event.target.value as SortOption)
                                }
                                className="bg-transparent font-semibold text-white outline-none cursor-pointer"
                            >
                                <option value="price" className="bg-brand-card-bg text-white">
                                    Menor preço
                                </option>
                                <option value="duration" className="bg-brand-card-bg text-white">
                                    Menor duração
                                </option>
                                <option value="departure" className="bg-brand-card-bg text-white">
                                    Horário de saída
                                </option>
                            </select>
                        </label>
                    </div>

                    <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                        <FlightFilters filters={filters} onChange={setFilters} />

                        <div className="min-w-0">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <p className="text-sm bg-white p-2 rounded-xl" aria-live="polite">
                                    <strong className="text-black">
                                        {filteredFlights.length} resultados encontrados
                                    </strong>{" "}

                                </p>

                                <span className="text-xs text-zinc-400">
                                    Valores por passageiro
                                </span>
                            </div>

                            {filteredFlights.length > 0 ? (
                                <div className="grid gap-4 flight-scrollbar max-h-[900px] overflow-y-auto pr-1">
                                    {filteredFlights.map((flight) => (
                                        <FlightCard
                                            key={flight.id}
                                            flight={flight}
                                            onDetails={setSelectedFlight}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 px-6 py-12 text-center backdrop-blur-md">
                                    <Plane
                                        size={36}
                                        className="mx-auto mb-4 text-zinc-500"
                                        aria-hidden="true"
                                    />

                                    <h3 className="text-lg font-bold text-white">
                                        Nenhum voo encontrado
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        Experimente alterar o preço máximo ou os filtros
                                        selecionados.
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

                {/* Sugestões de destinos */}
                <section
                    id="destinos"
                    aria-labelledby="titulo-destinos"
                    className="border-t border-white/10 bg-brand-dark-bg/70 py-14 backdrop-blur-sm md:py-20"
                >
                    <div className="container-travel">
                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold text-brand-lime">
                                INSPIRE-SE
                            </p>

                            <h2
                                id="titulo-destinos"
                                className="text-2xl font-extrabold sm:text-3xl"
                            >
                                Ofertas e sugestões de destinos
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                                Descubra lugares incríveis e comece a planejar sua próxima
                                viagem.
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
                                <p className="text-sm font-semibold text-brand-lime">
                                    DETALHES DO VOO
                                </p>

                                <h2
                                    id="titulo-modal-voo"
                                    className="mt-2 text-2xl font-extrabold"
                                >
                                    {selectedFlight.airline}
                                </h2>

                                <p className="mt-1 text-sm text-zinc-300">
                                    Voo {selectedFlight.flightNum}
                                </p>
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
                                    <p className="text-2xl font-bold">
                                        {selectedFlight.departTime}
                                    </p>
                                    <p className="text-xs text-zinc-400">Partida</p>
                                </div>

                                <div className="text-center text-xs text-zinc-300">
                                    <p>{selectedFlight.duration}</p>
                                    <div className="my-2 h-px bg-zinc-700" />
                                    <p>{selectedFlight.stopsText}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold">
                                        {selectedFlight.arrivalTime}
                                    </p>
                                    <p className="text-xs text-zinc-400">Chegada</p>
                                </div>
                            </div>

                            <p className="text-sm text-zinc-300">
                                Data de ida: {formatDate(searchInfo.departureDate)}
                            </p>

                            <p className="mt-3 text-sm text-zinc-300">
                                Passageiros:{" "}
                                {searchInfo.passengers.adults +
                                    searchInfo.passengers.children}
                            </p>

                            <div className="mt-5 border-t border-brand-card-border pt-5">
                                <p className="text-sm text-zinc-300">
                                    Preço por passageiro
                                </p>

                                <p className="mt-1 text-3xl font-extrabold text-brand-lime">
                                    {formatCurrency(selectedFlight.price)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                alert(
                                    "Esta é uma demonstração. Para realizar reservas, é necessária uma integração com uma API ou serviço de passagens."
                                );
                                setSelectedFlight(null);
                            }}
                            className="mt-6 w-full rounded-xl bg-brand-lime px-5 py-4 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover"
                        >
                            Continuar
                        </button>
                    </section>
                </div>
            )}

            {/* Modal: detalhes do destino */}
            {selectedDestination && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedDestination(null)}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-destino"
                        className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-brand-card-border bg-brand-card-bg"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="relative h-56">
                            <img
                                src={
                                    selectedDestination.images[1] ||
                                    selectedDestination.images[0]
                                }
                                alt={selectedDestination.title}
                                className="h-full w-full object-cover"
                            />

                            <button
                                type="button"
                                aria-label="Fechar detalhes do destino"
                                onClick={() => setSelectedDestination(null)}
                                className="absolute right-4 top-4 rounded-xl bg-black/70 p-2 text-white"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-sm font-semibold text-brand-lime">
                                SUGESTÃO DE DESTINO
                            </p>

                            <h2
                                id="titulo-modal-destino"
                                className="mt-2 text-2xl font-extrabold"
                            >
                                {selectedDestination.title}
                            </h2>

                            <p className="mt-3 text-sm text-zinc-300">
                                {selectedDestination.description}
                            </p>

                            <p className="mt-4 text-sm text-zinc-200">
                                Aeroporto: {selectedDestination.airport}
                            </p>

                            <p className="mt-4 text-2xl font-extrabold text-brand-lime">
                                A partir de {formatCurrency(selectedDestination.price)}
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDestination(null);
                                    document
                                        .getElementById("buscar-passagens")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="mt-6 w-full rounded-xl bg-brand-lime px-5 py-4 font-bold text-brand-dark-bg hover:bg-brand-lime-hover"
                            >
                                Planejar viagem
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* Modal: Autenticação (Entrar / Cadastrar-se) */}
            {authModal.open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setAuthModal({ ...authModal, open: false })}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-auth"
                        className="w-full max-w-md rounded-3xl border border-brand-card-border bg-brand-card-bg p-6 sm:p-8 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-brand-lime mb-1">
                                    {authModal.mode === "login" ? <User size={20} /> : <UserPlus size={20} />}
                                </div>

                                <h2
                                    id="titulo-modal-auth"
                                    className="text-2xl font-extrabold"
                                >
                                    {authModal.mode === "login" ? "Acessar sua Conta" : "Criar uma Conta"}
                                </h2>

                                <p className="mt-1 text-xs text-zinc-400">
                                    {authModal.mode === "login"
                                        ? "Digite suas credenciais para continuar na Travel.com"
                                        : "Cadastre-se para obter ofertas e passagens exclusivas."}
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label="Fechar janela de acesso"
                                onClick={() => setAuthModal({ ...authModal, open: false })}
                                className="rounded-xl bg-zinc-800 p-2 text-zinc-400 hover:text-white hover:bg-zinc-700"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setAuthModal({ ...authModal, open: false });
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    placeholder="seuemail@exemplo.com"
                                    required
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-lime focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-brand-lime focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-brand-lime px-5 py-3.5 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10"
                            >
                                {authModal.mode === "login" ? "Entrar" : "Cadastrar"}
                            </button>
                        </form>

                        <div className="mt-5 text-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setAuthModal({
                                        open: true,
                                        mode: authModal.mode === "login" ? "register" : "login",
                                    })
                                }
                                className="text-xs text-brand-lime hover:underline"
                            >
                                {authModal.mode === "login"
                                    ? "Não possui uma conta? Cadastre-se"
                                    : "Já tem uma conta? Faça login"}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Passagens;