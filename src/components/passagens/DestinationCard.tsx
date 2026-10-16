
import { ArrowUpRight, MapPin } from "lucide-react";

import type { Destination } from "../../types/Travel";
import { formatCurrency } from "../../data/Flights";

interface DestinationCardProps {
    destination: Destination;
    onSelect: (destination: Destination) => void;
}

export default function DestinationCard({
    destination,
    onSelect,
}: DestinationCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-card-border bg-card-bg transition hover:-translate-y-1 hover:border-zinc-600">
            <div className="relative h-52 overflow-hidden">
                <img
                    src={destination.images[0]}
                    alt={destination.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <span className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                    <MapPin size={16} className="text-brand" />
                    {destination.airport}
                </span>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold">{destination.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">
                    {destination.description}
                </p>

                <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-zinc-500">Passagens a partir de</p>
                        <p className="mt-1 text-xl font-extrabold text-brand">
                            {formatCurrency(destination.price)}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => onSelect(destination)}
                        aria-label={`Consultar destino: ${destination.title}`}
                        className="rounded-xl bg-zinc-800 p-3 text-brand transition hover:bg-zinc-700"
                    >
                        <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
}
