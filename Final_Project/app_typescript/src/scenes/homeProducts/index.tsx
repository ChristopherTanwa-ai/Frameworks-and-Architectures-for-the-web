import { Poster, SelectedPage } from '@/shared/types';
import useMediaQuery from "@/hooks/useMediaQuery";
import { motion } from 'framer-motion';
import Htext from '@/shared/Htext';
import {Posters} from '@/shared/data.json';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  mainData: Record<string, Posters>;
};

const product: Array<Poster> = [Posters]


const HomeProducts = ({setSelectedPage}: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  return (
  
        
    <section
    id='homeproducts'
    className='mx-auto min-h-full w-5/6 py-20'>
        <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.HomeProducts)}
        >
            {/**Header */}
            <div className='md:my-5 md:w-3/5'>
                <Htext>EXPLORE NEW POSTERS</Htext>

            </div>

        {/**Product cards */}
        <div className='mt-5 md:flex items-center justify-between gap-8 '>
            {product.map((poster : Poster) => (
                <Poster
                key={poster.id}
                artist={poster.artist}
                title = {poster.title}
                price = {poster.price}
                description = {poster.description}
                img = {poster.img}
                setSelectedPage={setSelectedPage}
                />
            ))}
            
        </div>
        </motion.div>
    </section>
    
  )
}

export default HomeProducts