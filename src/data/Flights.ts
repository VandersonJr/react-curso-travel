
import type { Destination, Flight } from "../types/Travel";

export const sampleFlights: Flight[] = [
  {
    id: 1,
    airline: "LATAM",
    departTime: "07:30",
    arrivalTime: "08:30",
    duration: "1h 00m",
    durationMinutes: 60,
    stops: 0,
    stopsText: "Direto",
    price: 380,
    flightNum: "LA3021",
    badge: "Mais rápido",
  },
  {
    id: 2,
    airline: "GOL",
    departTime: "10:15",
    arrivalTime: "11:20",
    duration: "1h 05m",
    durationMinutes: 65,
    stops: 0,
    stopsText: "Direto",
    price: 410,
    flightNum: "G31420",
    badge: "Melhor custo-benefício",
  },
  {
    id: 3,
    airline: "Azul",
    departTime: "14:00",
    arrivalTime: "15:10",
    duration: "1h 10m",
    durationMinutes: 70,
    stops: 0,
    stopsText: "Direto",
    price: 450,
    flightNum: "AD4280",
    badge: null,
  },
  {
    id: 4,
    airline: "LATAM",
    departTime: "18:45",
    arrivalTime: "21:30",
    duration: "2h 45m",
    durationMinutes: 165,
    stops: 1,
    stopsText: "1 parada (VCP)",
    price: 350,
    flightNum: "LA3892",
    badge: "Menor preço",
  },
];

export const destinations: Destination[] = [
  {
    id: 1,
    title: "Explore praias no Rio de Janeiro",
    description: "Voos diretos a partir de SP",
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=600&auto=format&fit=crop",
    ],
    price: 380,
    airport: "Rio de Janeiro (GIG)",
  },
  {
    id: 2,
    title: "Descubra paisagens em Florianópolis",
    description: "Ilha da Magia e praias paradisíacas",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop",
    ],
    price: 490,
    airport: "Florianópolis (FLN)",
  },
  {
    id: 3,
    title: "Explore destinos inesquecíveis em Lisboa",
    description: "Sua porta de entrada para a Europa",
    images: [
      "https://globalreceptivo.com/wp-content/uploads/2016/07/LISBOA-1.jpg",
      "https://images.unsplash.com/photo-1548707309-dcebeab9ec98?q=80&w=600&auto=format&fit=crop",
    ],
    price: 2890,
    airport: "Lisboa (LIS)",
  },
];

export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
