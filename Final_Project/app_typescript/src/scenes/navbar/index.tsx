import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.svg";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link2 from "./Link2";
import { motion } from "framer-motion";
import Login from "@/scenes/login";
import { Button } from "react-bootstrap";
import useUserChange from "@/hooks/useUser";
import useUser from "@/hooks/useUser";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexbetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  const navigate = useNavigate();

  const { user, signOut } = useUser();

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexbetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexbetween} mx-auto w-5/6`}>
          <div className={`${flexbetween} w-full gap-16 `}>
            {/* Left side */}
            <Link to="/">
              <img src={Logo} alt="logo" className="max-w-8 max-h-8" />
            </Link>

            {/* Right side */}
            {isAboveMediumScreens ? (
              <div className={`${flexbetween} w-full`}>
                <div className={`flex w-full items-center gap-8 text-sm`}>
                  <Link2
                    page=""
                    name="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link2
                    page="Shop"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link2
                    page="Cart"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  {!user?.email && (
                    <Link2
                      page="Register"
                      name="Login"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  )}
                  {user?.email && (
                    <Link2
                      page="Account"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                  )}

                  {user?.email && (
                    <>
                      <div style={{ flex: 1 }}></div>
                      <button
                        className="rounded-full bg-red-500 px-4 py-1 text-white hover:bg-red-400"
                        onClick={() => {
                          // setIsLoggedIn(!isLoggedIn);
                          signOut();
                          navigate("/");
                        }}
                      >
                        Logout
                      </button>
                    </>
                  )}

                  {/* {isLoggedIn ? (
                                        <>
                                        <p> Welcome {username}</p>
                                        <button onClick={handleLogout}> Log out </button>
                                        </>
                                        
                                    ) : (
                                        <button onClick={handleLoginButtonClick}>Login</button>
                                    )}

                                    {showLogin && (
                                        <div className="fixed top-20 right-10">
                                            <Login
                                                isLoggedIn={isLoggedIn}
                                                handleLogin={handleLogin}
                                            />
                                        </div>
                                    )} */}
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-secondary-500 p-2"
                onClick={() => {
                  setIsMenuToggled(!isMenuToggled);
                }}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/** Mobile Menu Modal */}
      {!isAboveMediumScreens && isMenuToggled && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.0, duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="fixed bottom-0 right-0 z-40 flex h-full w-[300px] flex-col bg-primary-100 drop-shadow-xl"
        >
          {/**Close icon */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-black" />
            </button>
          </div>
          {/** Menu items */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link2
              page=""
              name="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            />
            <Link2
              page="Shop"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            />
            <Link2
              page="Cart"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            />
            {!user?.email && (
              <Link2
                page="Register"
                name="Login"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              />
            )}
            {user?.email && (
              <Link2
                page="Account"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              />
            )}
          </div>
          {user?.email && (
            <>
              <div style={{ flex: 1 }}></div>
              <button
                className="mx-20 mb-10 rounded-full bg-red-500 px-4 py-1 text-white hover:bg-red-400"
                onClick={() => {
                  // setIsLoggedIn(!isLoggedIn);
                  signOut();
                  navigate("/");
                  setIsMenuToggled(!isMenuToggled);
                }}
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
