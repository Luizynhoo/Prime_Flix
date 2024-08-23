import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/Favoritos";

import Error from "./pages/Error";

import Header from "./components/Header";

function RoutesApp() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }></Route>
        <Route path="/filme/:id" element={ <Filme/> }></Route>
        <Route path="/favoritos" element={ <Favoritos/> }></Route>
        
        <Route path="*" element={ <Error/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
