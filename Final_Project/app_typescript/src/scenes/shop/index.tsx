import Htext from "@/shared/Htext";
import PosterCard from "@/shared/PosterCard";
import { Poster } from "@/shared/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

PosterCard

type Props = {
 

}

const Shop = ({props}: Props) => {

    const [apiResponse, setApiResponse] = useState<Record<string, Poster>>({});

    useEffect(() => {
        fetch('http://localhost:9000/allPosters')
          .then(response => response.json())
          .then(data => {
            setApiResponse(data);
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
      console.log(apiResponse);
      
      
  return (
         
    <section
    id='homeproducts'
    className='mx-auto min-h-full w-5/6 py-20'>
        <motion.div
       
        initial="hidden"
             whileInView="visible"
             viewport={{once:true, amount:0.5}}
             transition={{duration:0.5}}
             variants={{
                hidden : {opacity:0, y:50},
                visible: {opacity:1, y:0}
             }}
        >
            {/**Header */}
            <div className='md:my-5 md:w-3/5 mx-auto text-center'>
                <Htext>EXPLORE ALL POSTERS</Htext>

            </div>

        {/**Product cards */}
        <div className='flex flex-wrap justify-between pt-5'>
        {
          
        Object.values(apiResponse).map((poster: Poster) => (
          <PosterCard
            key={poster.id}
            artist={poster.artist}
            title={poster.title}
            description={poster.description}
            price={poster.price}
            img={poster.img}
            
          />
        ))
      }

        </div>
        </motion.div>
    </section>
  )
}

export default Shop