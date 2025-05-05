let badWords: string[] = [];

export async function loadBadWords() {
    const res = await fetch("badWords.json");
    const json = await res.json();
    badWords = json.words;
}

export function preventableWord(input: string) {
    if (!input) return false;

    const words = input.toLowerCase().trim().split(/\s+/);
    return words.some((word) => badWords.includes(word));
}
