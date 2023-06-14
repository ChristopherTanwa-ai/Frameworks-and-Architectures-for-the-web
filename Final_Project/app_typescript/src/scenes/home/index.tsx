import { Poster, SelectedPage } from "@/shared/types";
import HomePageText from "@/assets/HomePageText.png";
import HomePageGraphic from "@/assets/HomePageGraphic.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import HomeProducts from "./HomeProducts";
import MainAbout from "./indexAbout";
import { Link } from "react-router-dom";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import useUser from "@/hooks/useUser";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  apiResponse: Record<string, Poster>;
  isTopOfPage: boolean;
};


const index = ({ setSelectedPage, apiResponse, isTopOfPage }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:9000/users")
      .then((response) => response.json())
      .then((data) => {
        if (user && user.email) {
          const userFound = data.find(
            (u: { email: any }) => u.email === user.email
          );
          const username2 = userFound.firstName;
          setUsername(username2);}})});

  return (
    <>
      <section id="home" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
        {/**Image and main header */}
        <motion.div
          className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
          onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        >
          {/** main header */}
          <div className="z-10 mt-12 md:mt-32 md:basis-3/5">
            {/**Heading */}
            <motion.div
              className="md:-mt-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div>
                <div>
                  <img src={HomePageText} alt="home-page-text" />
                </div>
              </div>

              {/* Welcoming message */}
      {user !== undefined && (
        <div className="text mt-8">
          <h2 className="text-2xl font-bold">Welcome, {username}!</h2>
        </div>
      )}

              <p className="mt-8 text-sm ">
                Discover our vibrant, artistic poster collection, perfect for
                transforming any space. Affordable, exclusive designs,
                high-quality prints, and fast shipping await you. Elevate your
                wall decor today!
              </p>
            </motion.div>
            {/** Actions */}
            <motion.div
              className="mt-8 flex items-center gap-8 md:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Link
                to="/register"
                className="rounded-md bg-secondary-500 px-10 py-2 text-white hover:bg-primary-500 hover:text-white"
              >
                Login
              </Link>
              <AnchorLink
                className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
                onClick={() => setSelectedPage(SelectedPage.About)}
                href={`#${SelectedPage.About}`}
              >
                <p>Learn more</p>
              </AnchorLink>
            </motion.div>
          </div>

          {/** Image */}
          <div className="basis 3/5 ,d:ml-40 md: flex justify-center justify-items-end md:z-10 md:mt-16">
            <img src={HomePageGraphic} alt="home-pageGraphic" />
          </div>
        </motion.div>
        {isTopOfPage && (
          <motion.div
            className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 transform"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <AnchorLink
              className="text-primary-500 hover:text-secondary-500"
              onClick={() => setSelectedPage(SelectedPage.HomeProducts)}
              href={`#${SelectedPage.HomeProducts}`}
            >
              <ArrowDownCircleIcon className="h-10 w-10 animate-bounce" />
            </AnchorLink>
          </motion.div>
        )}
      </section>
      <HomeProducts
        text="EXPLORE NEW POSTERS"
        apiResponse={apiResponse}
        setSelectedPage={setSelectedPage}
      ></HomeProducts>

      <MainAbout setSelectedPage={setSelectedPage} />
    </>
  );
};

export default index;
