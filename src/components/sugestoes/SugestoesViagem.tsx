import { ArrowRight } from "lucide-react";

const sugestoes = [
    {
        id: 1,
        titulo: "Explore praias no Rio de Janeiro",
        imagens: [
            {
                src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=500&q=80",
                alt: "Vista panorâmica do Rio de Janeiro",
            },
            {
                src: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=500&q=80",
                alt: "Paisagem costeira do Rio de Janeiro",
            },
        ],
        destino: "Rio de Janeiro",
    },
    {
        id: 2,
        titulo: "Descubra paisagens incríveis",
        imagens: [
            {
                src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=80",
                alt: "Praia de águas azuis",
            },
            {
                src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=500&q=80",
                alt: "Praia tropical",
            },
        ],
        destino: "Praias tropicais",
    },
    {
        id: 3,
        titulo: "Explore destinos inesquecíveis",
        imagens: [
            {
                src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
                alt: "Praia paradisíaca",
            },
            {
                src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=500&q=80",
                alt: "Montanhas e natureza",
            },
        ],
        destino: "Destinos naturais",
    },
];

const SugestoesViagem = () => {
    function explorarDestino(destino: string) {
        const parametros = new URLSearchParams({ destino });

        window.location.href = `/passagens?${parametros.toString()}`;
    }

    return (
        <section className="w-full px-0 py-6 sm:px-2 sm:py-8 lg:px-0 lg:py-10 xl:py-12">
            <h2 className="mb-4 text-left text-base font-medium text-zinc-300 sm:mb-5 sm:text-lg md:text-xl xl:text-2xl">
                Sugestões nos destinos
            </h2>

            {/* 1 coluna no mobile, 2 no sm/md, 3 a partir do lg */}
            <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:gap-6 2xl:gap-8">
                {sugestoes.map((sugestao, indice) => (
                    <article
                        key={sugestao.id}
                        className={`group rounded-2xl border border-white/5 bg-zinc-950/85 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-zinc-900 sm:p-5 xl:p-6 ${
                            // No sm/md a grade tem 2 colunas: o 3º card ocupa a linha inteira
                            // para não ficar sozinho e desalinhado. No lg volta ao normal.
                            indice === sugestoes.length - 1 &&
                                sugestoes.length % 2 !== 0
                                ? "sm:col-span-2 lg:col-span-1"
                                : ""
                            }`}
                    >
                        <h3 className="mb-3 text-lg font-medium leading-snug text-white sm:mb-4 sm:min-h-14 sm:text-xl xl:text-2xl">
                            {sugestao.titulo}
                        </h3>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {sugestao.imagens.map((imagem) => (
                                <img
                                    key={imagem.src}
                                    src={imagem.src}
                                    alt={imagem.alt}
                                    loading="lazy"
                                    className="h-24 w-full rounded-xl object-cover transition duration-300 group-hover:brightness-110 sm:h-28 md:h-32 lg:h-28 xl:h-32 2xl:h-40"
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => explorarDestino(sugestao.destino)}
                            className="mt-3 flex w-full items-center justify-between text-sm font-medium text-lime-300 transition-colors hover:text-lime-200 sm:mt-4 md:text-base"
                        >
                            Explorar destino
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default SugestoesViagem;