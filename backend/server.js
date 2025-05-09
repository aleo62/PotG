const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 8000;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

// Middleware para analisar JSON
app.use(express.json());

// Rota principal (API REST)
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

    // Notifica todos os clientes conectados via WebSocket
    broadcast({ type: "new_letter", letter: newLetter });
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

        // Notifica todos os clientes conectados via WebSocket
        broadcast({ type: "delete_letter", id: req.params.id });
    } catch (err) {
        res.status(500).json({ message: "Erro ao processar o arquivo." });
    }
});

// Função para enviar mensagens para todos os clientes WebSocket conectados
function broadcast(data) {
    const message = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Configura o servidor para escutar conexões WebSocket
wss.on("connection", (ws) => {
    console.log("Novo cliente conectado");

    const filePath = path.join(__dirname, "/db.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    ws.send(JSON.stringify(data.letters));

    console.log(data.letters);

    ws.on("close", () => {
        console.log("Cliente desconectado");
    });
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
