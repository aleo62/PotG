import type { LetterType } from "../utils/type/LetterType";

export const Letter = ({ body, id, onDoubleClick }: LetterType) => {
    const isoDate = id.replace("letter-", "");
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });

    return (
        <div
            className="relative w-90 rounded bg-white p-2 shadow-md mb-4 break-inside-avoid"
            onDoubleClick={onDoubleClick}
        >
            <div className="flex h-full w-full items-center flex-col justify-center border-2 border-dashed p-1 border-gray-300">
                <p className="text-3xl w-full text-center break-words whitespace-normal p-8">
                    {body}
                </p>

                <p className="text-sm text-gray-500 mt-3 mr-1 self-end">
                    <span className="font-bold">Enviado em:</span>{" "}
                    {formattedDate}
                </p>
            </div>
        </div>
    );
};
