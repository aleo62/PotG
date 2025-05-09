import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Letters from "./pages/Letters";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";

function App() {
    const [admin, setAdmin] = useState(false);

    // Ativação/desativação do admin com atalho
    useHotkeys("ctrl+shift+y", () => {
        admin ? alert("Adm desativado") : alert("Adm ativado");
        setAdmin(!admin);
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/letters" element={<Letters admin={admin} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
