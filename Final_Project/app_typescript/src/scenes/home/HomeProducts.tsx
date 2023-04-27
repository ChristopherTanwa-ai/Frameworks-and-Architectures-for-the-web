import { SelectedPage, Poster } from '@/shared/types';
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import PosterCard from '@/shared/PosterCard';



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
    
  return (
  
        
    <section
    id='homeproducts'
    className='mx-auto min-h-full w-5/6 py-20'>
        <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.HomeProducts)}
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
            description={poster.description}
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