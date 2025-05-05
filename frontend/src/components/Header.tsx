import confetti from "canvas-confetti";
import titulo from "../assets/images/titulo.png";
export const Header = () => {
    const sendConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    return (
        <header className="" onDoubleClick={sendConfetti}>
            <div className="mx-auto my-2 mb-10 flex w-full max-w-7xl items-center justify-between md:mb-2">
                <h1 className="">
                    <img
                        src={titulo}
                        className="w-35 drop-shadow-md md:w-45"
                        alt="Pote da Gratidão"
                    />
                </h1>

                <a
                    href="/pote.pdf"
                    className="font-semibold text-2xl hover:text-yellow-500 transition-all duration-300 hover:underline hover:bg-white/50 px-4 py-2 rounded-md"
                    download
                >
                    PorQue?
                </a>
            </div>
        </header>
    );
};
