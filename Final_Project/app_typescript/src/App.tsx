import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import HomeProducts from "@/scenes/home/HomeProducts";
import { useEffect, useState, Fragment } from "react";
import { Poster, SelectedPage } from "./shared/types";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Shop from "./scenes/shop";
function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage,SetIsTopOfPage] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});
  
  let component
  
  switch (window.location.pathname) {
    case "/home":
        component = <Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />
      break;
    case "/":
        component = <Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />
      break;
    case "/#shop":
        component = <Shop></Shop>
      break;
    default:
      break;
  }

  

  
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
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
  
    <>
      <div className='app bg-200'>
        
           <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage} 
        /> 
      
      {component}      
            
        
         
     
      </div>
      
    </>
  )
}


export default App
