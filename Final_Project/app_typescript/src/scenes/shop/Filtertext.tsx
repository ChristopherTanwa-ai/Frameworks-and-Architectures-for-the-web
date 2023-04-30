import React from 'react'
import { SelectedPage } from '@/shared/types';


type PosterCardProps = {
  key: string;
  artist: string;
  title: string;
};



const Filtertext: React.FC<PosterCardProps> = ({
    artist,
    title,
    key
  }) => {
  return (
    <div className='font-thin px-2 my-1 text-zinc-600  hover:text-amber-600 hover:underline decoration-wavy hover:cursor-pointer'>
        {artist}
    </div>
  )
}

export default Filtertext