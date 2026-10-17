import { useState } from "react";
import { CalendarDays, MapPin, Search, Users, X, Building2 } from "lucide-react";
import HasSearchedHospedagem from "../../components/hospedagem/HasSearchedHospedagem";
import { formatCurrency } from "../../data/Flights";

interface SearchHospedagemInfo {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

function getInitialSearch(): { searchInfo: SearchHospedagemInfo; hasSearched: boolean } {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get("destino") || "";
    const checkIn = params.get("checkIn") || "";
    const hasSearched = Boolean(destination && checkIn);

    return {
        searchInfo: {
            destination: destination || "",
            checkIn: checkIn || "",
            checkOut: params.get("checkOut") || "",
            guests: Number(params.get("hospedes")) || 2,
        },
        hasSearched,
    };
}

const Hospedagem = () => {
    const initial = getInitialSearch();

    const [searchInfo, setSearchInfo] = useState<SearchHospedagemInfo>(initial.searchInfo);
    const [hasSearched, setHasSearched] = useState<boolean>(initial.hasSearched);

    const [destination, setDestination] = useState(initial.searchInfo.destination);
    const [checkIn, setCheckIn] = useState(initial.searchInfo.checkIn);
    const [checkOut, setCheckOut] = useState(initial.searchInfo.checkOut);
    const [guests, setGuests] = useState(initial.searchInfo.guests);

    const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!destination.trim() || !checkIn || !checkOut) {
            alert("Preencha o destino e as datas de check-in e check-out.");
            return;
        }

        const data: SearchHospedagemInfo = { destination, checkIn, checkOut, guests };
        setSearchInfo(data);
        setHasSearched(true);

        const params = new URLSearchParams({
            destino: destination,
            checkIn,
            checkOut,
            hospedes: guests.toString(),
        });

        window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);

        setTimeout(() => {
            document.getElementById("ofertas-hospedagem")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg text-white selection:bg-brand-lime selection:text-brand-dark-bg">
            <main className="min-h-screen bg-passagem bg-cover bg-center bg-no-repeat text-white pt-20">
                <section className="relative isolate overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-brand-dark-bg/65" />

                    <div className="container-travel flex min-h-[480px] flex-col justify-center pb-12 pt-16 sm:pt-20">
                        <div className="mb-8 text-center">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-brand-lime">
                                <Building2 size={15} aria-hidden="true" />
                                Hotéis, resorts e pousadas selecionadas
                            </p>

                            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Encontre o lugar perfeito para ficar
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300 sm:text-lg">
                                Reserve acomodações incríveis com cancelamento gratuito na maioria dos quartos.
                            </p>
                        </div>

                        {/* Formulário de Busca de Hospedagem */}
                        <form onSubmit={handleSearch} className="glass-panel rounded-3xl p-5 shadow-2xl md:p-7 grid gap-4 lg:grid-cols-12">
                            <label className="relative block lg:col-span-4">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">Destino ou Hotel</span>
                                <MapPin size={18} className="absolute left-4 top-[42px] text-brand-lime" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Para onde você vai?"
                                    required
                                    className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3.5 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime"
                                />
                            </label>

                            <label className="relative block lg:col-span-2">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">Check-in</span>
                                <CalendarDays size={18} className="absolute left-4 top-[42px] text-brand-lime" />
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3.5 pl-11 pr-2 text-sm text-white outline-none focus:border-brand-lime"
                                />
                            </label>

                            <label className="relative block lg:col-span-2">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">Check-out</span>
                                <CalendarDays size={18} className="absolute left-4 top-[42px] text-brand-lime" />
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3.5 pl-11 pr-2 text-sm text-white outline-none focus:border-brand-lime"
                                />
                            </label>

                            <label className="relative block lg:col-span-2">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">Hóspedes</span>
                                <Users size={18} className="absolute left-4 top-[42px] text-brand-lime" />
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="w-full rounded-xl border border-brand-card-border bg-brand-input-bg py-3.5 pl-11 pr-3 text-sm text-white outline-none focus:border-brand-lime"
                                />
                            </label>

                            <div className="lg:col-span-2 flex items-end">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-lime px-5 py-3.5 font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10"
                                >
                                    <Search size={18} />
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Exibido somente após o usuário buscar */}
                {hasSearched && (
                    <HasSearchedHospedagem searchInfo={searchInfo} onSelectHotel={setSelectedHotel} />
                )}
            </main>

            {/* Modal de Detalhes do Hotel */}
            {selectedHotel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setSelectedHotel(null)}>
                    <section className="w-full max-w-lg rounded-3xl border border-brand-card-border bg-brand-card-bg p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs font-bold text-brand-lime uppercase">Detalhes da Acomodação</p>
                                <h2 className="text-2xl font-extrabold text-white mt-1">{selectedHotel.name}</h2>
                            </div>
                            <button onClick={() => setSelectedHotel(null)} className="rounded-xl bg-zinc-800 p-2 text-zinc-300 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                        <p className="text-sm text-zinc-300 mb-4">{selectedHotel.location}</p>
                        <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-zinc-400">Valor total por noite</p>
                                <p className="text-2xl font-extrabold text-brand-lime">{formatCurrency(selectedHotel.pricePerNight)}</p>
                            </div>
                            <button onClick={() => { alert("Reserva de hospedagem simulada com sucesso!"); setSelectedHotel(null); }} className="rounded-xl bg-brand-lime px-5 py-3 font-bold text-brand-dark-bg hover:bg-brand-lime-hover">
                                Reservar agora
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Hospedagem;
