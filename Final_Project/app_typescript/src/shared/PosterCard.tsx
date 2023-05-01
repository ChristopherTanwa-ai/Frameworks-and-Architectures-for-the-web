import { SelectedPage } from '@/shared/types';
import React from 'react';

type PosterCardProps = {
  key: string;
  artist: string;
  title: string;
  price: number;
  description: string;
  img: string;
  setSelectedPage: (value: SelectedPage) => void;
};

const PosterCard: React.FC<PosterCardProps> = ({
  artist,
  title,
  price,
  description,
  img,
  key,
  setSelectedPage,
}) => {
  const title_noSpace = title.replace(/\s/g, "");
  return (
    <a href={`${title_noSpace}`}>
    <div className="poster-card py-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 
    ">
      <img src={img} alt={title} 
      className='max-w-xs '/>
      <h2 className='font-bold text-primary-500'>{title}</h2>
      <p className='font-thin'>{artist}</p>
      <p className='text-primary-red'>{price} kr</p>
    </div>

    </a>
    
  );
};

export default PosterCard;
