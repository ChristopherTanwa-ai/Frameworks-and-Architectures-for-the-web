import { Route, BrowserRouter as Router, Routes, useParams  } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import { useEffect, useState, Fragment } from "react";
import { Poster, SelectedPage } from "./shared/types";
import Shop from "./scenes/shop";
import PosterPage from "@/scenes/product";
import Cart from "./scenes/cart";
import Register from "./scenes/Register";



function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, SetIsTopOfPage] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for isLoggedIn
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
        setIsLoggedIn(true)
        const display = JSON.parse(user);
        setUsername(display.username)
    }
});


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        SetIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) {
        SetIsTopOfPage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("http://localhost:9000/randomPosters")
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    const user = sessionStorage.getItem("user");
    alert("Logged in succesfully")
    if (user) {
      const display = JSON.parse(user);
      setUsername(display.username);
    }
  };
  

const handleLogout = () => {
  setIsLoggedIn(false);
  sessionStorage.removeItem('user')
  setUsername(null);
  alert("Logged out succesfully")
}

  return (
    <Router>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isLoggedIn={isLoggedIn} // Pass the isLoggedIn state to the Navbar
        handleLogout={handleLogout} // Pass the handleLogout function to the Navbar
      />
      <Routes>
        <Route path="/" element={<Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />} />
        <Route path="/home" element={<Home setSelectedPage={setSelectedPage} apiResponse={apiResponse} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} username={username} />} />
        <Route path="/product/:param" element={<PosterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
