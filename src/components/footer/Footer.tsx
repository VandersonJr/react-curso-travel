import React from 'react'
import { Plane } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-brand-dark-bg py-8">
            <div className="container-travel flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <a href="/" className="flex items-center gap-2">
                    <Plane size={21} className="text-brand-lime" aria-hidden="true" />
                    <span className="font-extrabold">
                        Travel<span className="text-brand-lime">.com</span>
                    </span>
                </a>

                <p className="text-xs leading-5 text-zinc-400">
                    Projeto demonstrativo. Preços, voos e destinos são ilustrativos.
                </p>

                <p className="text-xs text-zinc-400">
                    © {new Date().getFullYear()} Travel.com
                </p>
            </div>
        </footer>
    )
}

export default Footer
