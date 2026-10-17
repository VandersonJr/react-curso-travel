import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Passagens from "./pages/passagens/Passagens";
import Hospedagem from "./pages/hospedagem/Hospedagem";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passagens" element={<Passagens />} />
          <Route path="/hospedagem" element={<Hospedagem />} />
          {/* Adicione outras rotas aqui, se necessário */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  )
}

export default App