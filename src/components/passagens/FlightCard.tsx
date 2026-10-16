import { ArrowRight, Clock3, PlaneTakeoff } from "lucide-react";

import type { Flight } from "../../types/Travel";
import { formatCurrency } from "../../data/Flights";

interface FlightCardProps {
    flight: Flight;
    onDetails: (flight: Flight) => void;
}

export default function FlightCard({
    flight,
    onDetails,
}: FlightCardProps) {
    return (
        <article className="rounded-2xl border border-brand-card-border bg-brand-card-bg/90 p-5 transition hover:border-zinc-500 sm:p-6 backdrop-blur-md shadow-xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-brand-lime">
                        <PlaneTakeoff size={21} />
                    </div>

                    <div>
                        <p className="font-bold text-white">{flight.airline}</p>
                        <p className="text-xs text-zinc-400">{flight.flightNum}</p>
                    </div>
                </div>

                {flight.badge && (
                    <span className="rounded-full bg-brand-lime/10 px-3 py-1.5 text-xs font-semibold text-brand-lime border border-brand-lime/20">
                        {flight.badge}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
                <div>
                    <p className="text-2xl font-bold text-white">{flight.departTime}</p>
                    <p className="mt-1 text-xs text-zinc-400">Partida</p>
                </div>

                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-xs text-zinc-300">
                        <Clock3 size={14} className="text-brand-lime" />
                        {flight.duration}
                    </div>

                    <div className="my-2 flex items-center gap-2">
                        <div className="h-px flex-1 bg-zinc-700" />
                        <ArrowRight size={16} className="text-brand-lime" />
                        <div className="h-px flex-1 bg-zinc-700" />
                    </div>

                    <p className="text-xs text-zinc-400">{flight.stopsText}</p>
                </div>

                <div className="text-right">
                    <p className="text-2xl font-bold text-white">{flight.arrivalTime}</p>
                    <p className="mt-1 text-xs text-zinc-400">Chegada</p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-brand-card-border pt-5">
                <div>
                    <p className="text-xs text-zinc-400">Preço por passageiro</p>
                    <p className="mt-1 text-2xl font-extrabold text-brand-lime">
                        {formatCurrency(flight.price)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                        Valor demonstrativo
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onDetails(flight)}
                    className="rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-brand-dark-bg transition hover:bg-brand-lime-hover shadow-lg shadow-brand-lime/10"
                >
                    Ver passagem
                </button>
            </div>
        </article>
    );
}