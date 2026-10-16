
import type { Airline, FlightFilters as Filters } from "../../types/Travel";
import { formatCurrency } from "../../data/Flights";

interface FlightFiltersProps {
    filters: Filters;
    onChange: (filters: Filters) => void;
}

const airlines: Airline[] = ["LATAM", "GOL", "Azul"];

export default function FlightFilters({
    filters,
    onChange,
}: FlightFiltersProps) {
    function toggleStop(stops: number) {
        const nextStops = filters.stops.includes(stops)
            ? filters.stops.filter((item) => item !== stops)
            : [...filters.stops, stops];

        onChange({ ...filters, stops: nextStops });
    }

    function toggleAirline(airline: Airline) {
        const nextAirlines = filters.airlines.includes(airline)
            ? filters.airlines.filter((item) => item !== airline)
            : [...filters.airlines, airline];

        onChange({ ...filters, airlines: nextAirlines });
    }

    return (
        <aside className="glass-panel h-fit rounded-2xl p-5">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button
                    type="button"
                    onClick={() =>
                        onChange({
                            stops: [0, 1],
                            airlines: [...airlines],
                            maxPrice: 1500,
                        })
                    }
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Limpar
                </button>
            </div>

            <div className="border-b border-card-border pb-5">
                <h3 className="mb-4 font-semibold">Número de paradas</h3>

                {[
                    { value: 0, label: "Voo direto" },
                    { value: 1, label: "1 parada" },
                ].map((stop) => (
                    <label
                        key={stop.value}
                        className="mb-3 flex cursor-pointer items-center justify-between gap-3 text-sm text-zinc-300"
                    >
                        <span className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={filters.stops.includes(stop.value)}
                                onChange={() => toggleStop(stop.value)}
                            />
                            {stop.label}
                        </span>
                    </label>
                ))}
            </div>

            <div className="border-b border-card-border py-5">
                <h3 className="mb-4 font-semibold">Companhias aéreas</h3>

                {airlines.map((airline) => (
                    <label
                        key={airline}
                        className="mb-3 flex cursor-pointer items-center gap-3 text-sm text-zinc-300"
                    >
                        <input
                            type="checkbox"
                            checked={filters.airlines.includes(airline)}
                            onChange={() => toggleAirline(airline)}
                        />
                        {airline}
                    </label>
                ))}
            </div>

            <div className="pt-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="font-semibold">Preço máximo</h3>
                    <span className="text-sm font-bold text-brand">
                        {formatCurrency(filters.maxPrice)}
                    </span>
                </div>

                <input
                    type="range"
                    min={300}
                    max={1500}
                    step={50}
                    value={filters.maxPrice}
                    onChange={(event) =>
                        onChange({
                            ...filters,
                            maxPrice: Number(event.target.value),
                        })
                    }
                    className="w-full"
                />

                <div className="mt-2 flex justify-between text-xs text-zinc-500">
                    <span>R$ 300</span>
                    <span>R$ 1.500</span>
                </div>
            </div>
        </aside>
    );
}
