import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Adicione outras rotas aqui, se necessário */}
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App