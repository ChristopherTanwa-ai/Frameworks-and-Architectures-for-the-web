import PosterCard from "@/shared/PosterCard";
import { Poster, SelectedPage } from "@/shared/types";
import React, { useEffect, useState } from "react";
import HomeProducts from "../home/HomeProducts";

type PosterCardProps = {
  key: string;
  artist: string;
  title: string;
  price: number;
  description: string;
  img: string;
};

const PosterPage = () => {
  const [apiResponse, setApiResponse] = useState<PosterCardProps>({
    key: "",
    artist: "",
    title: "",
    price: 0,
    description: "",
    img: "",
  });
  const [randomPoster, setRandomPoster] = useState<Record<string, Poster>>({});
  const path = window.location.pathname;
  
  useEffect(() => {
    fetch(`http://localhost:9000${path}`)
      .then((response) => response.json()) // Parse the response body as JSON data
      .then((data) => {
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [path]);

  useEffect(() => {
    fetch("http://localhost:9000/randomPosters")
      .then((response) => response.json())
      .then((data) => {
        setRandomPoster(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="h-full  pt-[10%]">
        <div className=" sm:columns-2 columns-1 ">
          <div className="mt-10 md:ml-[20rem]">
            <img
              className="max-w-xs mx-auto md:max-w-sm shadow-md"
              src={apiResponse.img}
              alt="posterimg"
            ></img>
            {/**<PosterCard artist={apiResponse.artist} img={apiResponse.img} description={apiResponse.description} price={apiResponse.price} title={apiResponse.title} key={apiResponse.key}></PosterCard> **/}
          </div>
          <div id="container" className="sm:text-center justify-center mx-auto">
            <p className="font-sans text-3xl md:text-5xl text-indigo-900 ">
              {apiResponse.artist}
            </p>
            <p className="pb-[1rem] font-sans text-base text-center md:text-xl text-indigo-400">
              {apiResponse.title}
            </p>
            <p className="md:pb-[3rem] text-center font-sans text-xl text-amber-700">
              {apiResponse.price} kr
            </p>
            <p className=" mx-8 text-center font-thin text-sky-800">
              {apiResponse.description}
            </p>
            <button className="ml-[16%] md:mt-[18%] md:ml-[0%] mt-2 rounded-md bg-indigo-400 px-[30%] py-1 text-sky-100 hover:bg-indigo-600 hover:text-sky-300">
              Buy
            </button>
          </div>
        </div>
        <div className="mx-auto mt-[10%]">
        <HomeProducts text="EXPLORE OTHER POSTERS" apiResponse={randomPoster} ></HomeProducts>
        </div>
      </div>
    </>
  );
};

export default PosterPage;
