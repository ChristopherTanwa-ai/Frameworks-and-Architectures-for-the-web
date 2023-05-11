import { Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import HomeProducts from "@/scenes/home/HomeProducts";
import { useEffect, useState, Fragment } from "react";
import { Poster, SelectedPage } from "./shared/types";
import Shop from "./scenes/shop";
import Product from "@/scenes/product"
import PosterPage from "@/scenes/product";
import Cart from "./scenes/cart";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage,SetIsTopOfPage] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0){
        SetIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home)
      }
      if(window.scrollY !== 0){
        SetIsTopOfPage(false);
      } 
    }
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll",handleScroll)
   
  }, []);

  useEffect(() => {
    fetch('http://localhost:9000/randomPosters')
      .then(response => response.json())
      .then(data => {
        setApiResponse(data);
      
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage} 
      />
      <Routes>
        <Route path="/" element={<Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />} />
        <Route path="/home" element={<Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:param" element={<PosterPage  />} />
      </Routes>
    </Router>
  );
}

export default App;