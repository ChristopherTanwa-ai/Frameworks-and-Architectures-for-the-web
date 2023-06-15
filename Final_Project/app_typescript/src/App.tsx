import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import { useEffect, useState } from "react";
import { Poster, SelectedPage } from "./shared/types";
import Shop from "./scenes/shop";
import PosterPage from "@/scenes/product";
import Cart from "./scenes/cart";
import Register from "./scenes/Register";
import { UserChangeStateContext, useUserChangeState } from "./hooks/useUser";
import Account from "./scenes/account";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, SetIsTopOfPage] = useState<boolean>(true);
  const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});
  const userContext = useUserChangeState();

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

  return (
    <UserChangeStateContext.Provider value={userContext}>
      <Router>
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setSelectedPage={setSelectedPage}
                apiResponse={apiResponse}
                isTopOfPage={isTopOfPage}
              />
            }
          />
          <Route
            path="/shop"
            element={<Shop setSelectedPage={setSelectedPage} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/product/:param"
            element={<PosterPage setSelectedPage={setSelectedPage} />}
          />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </UserChangeStateContext.Provider>
  );
}

export default App;
