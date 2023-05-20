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
  console.log(path);

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToCart = () => {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    const requestBody = { user, poster: apiResponse };
    fetch(`http://localhost:9000${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          //Success!
          alert("Poster added to cart!");
        } 
        else if (response.status === 400) {
          // Bad request
          alert("Error adding poster to cart: Poster already in cart!");}
          else {
          //Frick!
          alert("Please login to add poster to cart!");
        }
      })
  };

  return (
    <div className="h-full pt-[10%]">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div className="img mx-auto flex justify-center">
          <img
            className="max-w-sm shadow-md"
            src={apiResponse.img}
            alt="posterimg"
          ></img>
          {/**<PosterCard artist={apiResponse.artist} img={apiResponse.img} description={apiResponse.description} price={apiResponse.price} title={apiResponse.title} key={apiResponse.key}></PosterCard> **/}
        </div>
        <div>
          <p className="font-sans text-5xl text-indigo-900 ">
            {apiResponse.artist}
          </p>
          <p className="pb-[1rem] font-sans text-xl text-indigo-400">
            {apiResponse.title}
          </p>
          <p className="pb-[3rem] font-sans text-xl text-amber-700">
            {apiResponse.price} kr
          </p>
          <p className="mr-[20rem] w-3/4 md:mr-0 font-thin text-sky-800">
            {apiResponse.description}
          </p>
          <button
            className="mt-[18%] md:mt-0 rounded-md bg-indigo-400 px-[30%] py-1 text-sky-100 hover:bg-indigo-600 hover:text-sky
            -300"
            onClick={addToCart}
            >
            Add to cart
            </button>
            </div>
            </div>
            <div className="mt-[10%]">
            <HomeProducts
                   text="EXPLORE OTHER POSTERS"
                   apiResponse={randomPoster}
                 ></HomeProducts>
            </div>
            </div>
            );
            };
            
            export default PosterPage;