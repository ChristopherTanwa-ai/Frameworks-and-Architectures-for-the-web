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
    <a className='h-[550px] mb-3' href={`${title_noSpace}`}>
      <div className="relative h-full py-2">
        <img src={img} alt={title} className='max-w-[300px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300' />
        <div className='absolute bottom-4 left-0'>
          <h2 className='font-bold text-primary-500'>{title}</h2>
          <p className='font-thin'>{artist}</p>
          <p className='text-primary-red'>{price} kr</p>
        </div>
      </div>

    </a>

  );
};

export default PosterCard;
