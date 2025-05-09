// src/pages/Letters.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import rabisco from "../assets/images/rasbisco.png";
import { Background } from "../components/Background";
import { Header } from "../components/Header";
import { Letter } from "../components/Letter";
import type { LetterType, WebSocketMessage } from "../utils/type/LetterType";

export default function Letters({ admin }: { admin: boolean }) {
    const [letters, setLetters] = useState<LetterType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // WebSocket setup
    const { lastJsonMessage } = useWebSocket("ws://localhost:8000/", {
        onOpen: () => console.log("Conectado ao WebSocket"),
        onError: (event) => {
            console.error("Erro de WebSocket:", event);
        },
        shouldReconnect: () => true,
        reconnectInterval: 3000,
    });

    useEffect(() => {
        if (lastJsonMessage) {
            const message = lastJsonMessage as WebSocketMessage;
            if (Array.isArray(message)) {
                // Initial state or full update
                setLetters(message);
            } else if (message.type === "new_letter") {
                // New letter received
                setLetters((prevLetters) => [...prevLetters, message.letter]);
            } else if (message.type === "delete_letter") {
                // Letter deleted
                setLetters((prevLetters) =>
                    prevLetters.filter((letter) => letter.id !== message.id)
                );
            }
            setIsLoading(false);
            console.log("Mensagem recebida:", message);
        }
    }, [lastJsonMessage, setLetters]);

    const deleteLetter = (id: string) => {
        if (admin) {
            axios.delete(`https://potg-ldpv.onrender.com/${id}`).then(() => {
                setLetters(letters.filter((letter) => letter.id !== id));
            });
        }
    };

    return (
        <>
            <Background />
            <Header />

            {isLoading ? (
                <div className="flex items-center justify-center mt-20">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900"></div>
                </div>
            ) : letters.length > 0 ? (
                <>
                    <h1 className="text-center text-6xl font-bold tracking-tighter text-zinc-900 drop-shadow-sm">
                        <span className="tracking-widest">Cartas</span>
                        <img
                            src={rabisco}
                            alt="Rabisco"
                            width={200}
                            className="mx-auto"
                        />
                    </h1>

                    <div className="mt-10 flex items-center justify-center p-4 py-10">
                        <div className="columns-1 md:columns-3 gap-4 gap-y-10">
                            {letters.map((letter: LetterType) => (
                                <Letter
                                    body={letter.body}
                                    id={letter.id}
                                    onDoubleClick={() =>
                                        deleteLetter(letter.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="relative mt-5 text-center text-6xl font-bold tracking-tighter text-zinc-900 drop-shadow-sm">
                        <span className="tracking-widest">
                            Nenhuma
                            <br /> carta enviada
                            <br />
                            <span className="text-yellow-500">ainda</span>.
                        </span>
                        <br />
                    </h1>
                    <img src={rabisco} alt="Rabisco" width={300} />
                </div>
            )}
        </>
    );
}
