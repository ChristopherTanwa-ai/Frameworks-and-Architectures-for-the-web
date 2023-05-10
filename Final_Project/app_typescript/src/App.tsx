import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import HomeProducts from "@/scenes/homeProducts";
import { useEffect, useState } from "react";
import { SelectedPage } from "./shared/types";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage,SetIsTopOfPage] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<string>("");

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
    fetch('http://localhost:9000/testAPI')
      .then(response => response.text())
      .then(data => {
        setApiResponse(data);
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
        <Home setSelectedPage={setSelectedPage} />
      {/** <HomeProducts setSelectedPage={setSelectedPage} selectedPage={selectedPage} /> */} 
      </div>
    </>
  )
}

export default App
