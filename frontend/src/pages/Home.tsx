import axios from "axios";
import confetti from "canvas-confetti";
import { useState } from "react";
import Swal from "sweetalert2";
import IconArrowRight from "../assets/icons/arrow-right.svg";
import cartaroxa from "../assets/images/cartaroxa.png";
import rabisco from "../assets/images/rasbisco.png";
import { Background } from "../components/Background";
import { Header } from "../components/Header";
import { preventableWord } from "../utils/badwordsfilter/preventBadWords";
import type { LetterType } from "../utils/type/LetterType";

export default function Home() {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (value.trim() === "") return;

        console.log("aasdasdasd")

        try {
            const now = new Date();
            const newId = `letter-${now.toISOString()}`;

            console.log(newId);
            const newLetter: LetterType = {
                id: newId,
                body: value.trim(),
            };

            console.log(newLetter);

            axios
                .post("https://potg-ldpv.onrender.com/", newLetter)
                .then((response) => {
                    console.log("Enviado com sucesso:", response.data);
                })
                .catch((error) => {
                    console.error("Erro ao enviar:", error);
                });

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
            });

            Swal.fire({
                title: "Cartinha enviada!",
                text: "Obrigado por compartilhar sua gratidão 💜",
                icon: "success",
                confirmButtonText: "Ver as cartas",
                cancelButtonText: "fechar",
                confirmButtonColor: "#000000",
            });

            setValue("");
        } catch (error) {
            console.error("Erro ao salvar carta:", error);
        }
    };

    return (
        <>
            <Background />
            <Header />
            <div className="flex flex-col items-center">
                <h1 className="relative mt-5 text-center text-5xl md:text-8xl font-bold tracking-tighter text-zinc-900 drop-shadow-sm">
                    <span className="tracking-widest">Bem vindo!</span>
                    <br />
                    Ao que <span className="text-yellow-500">Você</span> é{" "}
                    <br />
                    <span className="text-purple">Grato</span>?
                    <img
                        src={rabisco}
                        className="absolute bottom-[-50px] left-[50%] -z-1 translate-x-[-50%]"
                        width={400}
                        alt=""
                    />
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-30 w-full max-w-xl rounded-4xl bg-zinc-300/20 p-2 backdrop-blur-md"
                >
                    <div className="flex items-center rounded-4xl bg-white pr-2">
                        <input
                            type="text"
                            placeholder="Sou grato por... pão com banana"
                            className="w-full px-5 py-5 text-lg font-semibold placeholder-zinc-400 outline-none"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button className="group grid h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-lg text-zinc-900 shadow-[-5px_5px_0px_0px_rgba(0,_0,_0,_0.9)] ring-3 ring-zinc-800 transition-shadow duration-300 hover:shadow-[-10px_10px_0px_0px_rgba(0,_0,_0,_0.9)]">
                            <img src={IconArrowRight} alt="" />
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-sm font-medium text-zinc-700">
                    É Curtinho. Poucas palavras que valem por muitas.
                </p>

                <div className="relative md:fixed md:bottom-5 md:right-10 mt-10 mb-5 flex items-center justify-center gap-4">
                    <a href="/letters">
                        <button className="group relative flex cursor-pointer items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-xl text-white shadow-md transition-all duration-300 hover:shadow-xl">
                            Ver Todas as Cartas
                            <img
                                src={cartaroxa}
                                alt="Carta amarela"
                                className="absolute top-50px left-[-25px] w-10 rotate-25 drop-shadow-md transition-all duration-600 group-hover:-top-[10px] group-hover:left-[210px] group-hover:-rotate-805"
                            />
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}
