import Htext from "@/shared/Htext";
import PosterCard from "@/shared/PosterCard";
import { Poster, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Filtertext from "./Filtertext";
import useMediaQuery from "@/hooks/useMediaQuery";

PosterCard;

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Shop = ({ setSelectedPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});
  const [filteredApiResponse, setFilteredApiResponse] = useState<
    Record<string, Poster>
  >({});

  useEffect(() => {
    fetch("http://localhost:9000/allPosters")
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
        setFilteredApiResponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const uniqueArtists: string[] = [];
  Object.values(apiResponse).forEach((poster: Poster) => {
    if (!uniqueArtists.includes(poster.artist)) {
      uniqueArtists.push(poster.artist);
    }
  });

  const [artists, setArtists] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

  // create function for selecting artists
  const selectArtist = (artist: string) => {
    if (artists.includes(artist)) {
      setArtists(artists.filter((a) => a !== artist));
    } else {
      setArtists([...artists, artist]);
    }
  };

  const selectPrice = (price: string) => {
    if (prices.includes(price)) {
      setPrices(prices.filter((a) => a !== price));
    } else {
      setPrices([...prices, price]);
    }
  };

  useEffect(() => {
    // filter apiResponse based on artists and prices
    // if artists and prices are empty, return all posters
    // make artists primary filter
    // if prices are selected, filter artists based on prices

    const filteredPosters: Record<string, Poster> = {};
    if (artists.length === 0 && prices.length === 0) {
      setFilteredApiResponse(apiResponse);
    } else if (artists.length > 0 && prices.length === 0) {
      Object.entries(apiResponse).forEach(([key, value]) => {
        if (artists.includes(value.artist)) {
          filteredPosters[key] = value;
        }
      });
      setFilteredApiResponse(filteredPosters);
    } else if (artists.length === 0 && prices.length > 0) {
      Object.entries(apiResponse).forEach(([key, value]) => {
        if (prices.includes(value.price.toString())) {
          filteredPosters[key] = value;
        }
      });
      setFilteredApiResponse(filteredPosters);
    } else {
      Object.entries(apiResponse).forEach(([key, value]) => {
        if (
          artists.includes(value.artist) &&
          prices.includes(value.price.toString())
        ) {
          filteredPosters[key] = value;
        }
      });
      setFilteredApiResponse(filteredPosters);
    }

    console.log("apiResponse", apiResponse);
    // console.log("filteredPosters", filteredPosters);
    // console.log("artists", artists);
    // console.log("prices", prices);
  }, [artists, prices]);

  return (
    <section id="homeproducts" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        {/**Header */}
        <div className="mx-auto text-center md:my-5">
          <Htext>EXPLORE ALL POSTERS</Htext>
          <Filtertext
            selectArtist={selectArtist}
            artists={artists}
            selectPrice={selectPrice}
            prices={prices}
          />
        </div>

        {/**Product cards */}
        <div className="flex flex-wrap justify-evenly pt-5">
          {/**Filter text */}

          {/**Filter text open */}
          {isMenuToggled && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-wrap justify-center pb-3 pt-5"
            >
              {uniqueArtists.map((artist) => (
                <Filtertext
                  selectArtist={selectArtist}
                  artists={artists}
                  selectPrice={selectPrice}
                  prices={prices}
                />
              ))}
            </motion.div>
          )}

          {Object.values(filteredApiResponse).map((poster: Poster) => (
            <PosterCard
              Mykey={poster.id}
              artist={poster.artist}
              title={poster.title}
              description={poster.description}
              price={poster.price}
              img={poster.img}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Shop;
