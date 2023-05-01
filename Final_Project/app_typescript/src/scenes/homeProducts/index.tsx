import { SelectedPage, Poster } from '@/shared/types';
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import PosterCard from './PosterCard';
import getRandomPosters from '@/shared/getRandomPoster';


type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  //mainData: Record<string, Posters>;
  apiResponse: Record<string, Poster>;
};

//const product: Array<Poster> = [Posters]


const HomeProducts = ({setSelectedPage, apiResponse}: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const posterObj = apiResponse;
    const randomPosters = getRandomPosters(posterObj);
  return (
  
        
    <section
    id='homeproducts'
    className='mx-auto min-h-full w-5/6 py-20'>
        <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.HomeProducts)}
        >
            {/**Header */}
            <div className='md:my-5 md:w-3/5 mx-auto text-center'>
                <Htext>EXPLORE NEW POSTERS</Htext>

            </div>

        {/**Product cards */}
        <div className='flex flex-wrap justify-between pt-5'>
        {
          
        Object.values(apiResponse).map((poster: Poster) => (
          <PosterCard
            key={poster.id}
            artist={poster.artist}
            title={poster.title}
            price={poster.price}
            img={poster.img}
            setSelectedPage={setSelectedPage}
          />
        ))
      }

        </div>
        </motion.div>
    </section>
    
  )
}

export default HomeProducts