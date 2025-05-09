export type LetterType = {
    id: string;
    body: string;
    onDoubleClick?: () => void;
};

export type WebSocketMessage =
    | LetterType[]
    | { type: "new_letter"; letter: LetterType }
    | { type: "delete_letter"; id: string };
