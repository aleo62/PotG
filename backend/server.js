const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "/db.json");
    res.sendFile(filePath);
});

app.post("/", (req, res) => {
    const newLetter = req.body;
    if (!newLetter.id || !newLetter.body) {
        return res
            .status(400)
            .json({ error: "Letter id and body are required" });
    }
    const filePath = path.join(__dirname, "/db.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.letters.push(newLetter);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newLetter);
});

app.delete("/:id", (req, res) => {
    const filePath = path.join(__dirname, "/db.json");
    try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const initialLength = data.letters.length;
        data.letters = data.letters.filter(
            (letter) => letter.id != req.params.id
        );

        if (data.letters.length === initialLength) {
            return res.status(404).json({ message: "Carta não encontrada." });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: "Carta deletada com sucesso." });
    } catch (err) {
        res.status(500).json({ message: "Erro ao processar o arquivo." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
