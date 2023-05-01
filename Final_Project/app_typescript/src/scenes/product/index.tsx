import PosterCard from '@/shared/PosterCard';
import { Poster } from '@/shared/types';
import React, { useEffect, useState } from 'react'


type PosterCardProps = {
  key: string;
  artist: string;
  title: string;
  price: number;
  description: string;
  img: string;
};

const PosterPage = () => {
  const [apiResponse, setApiResponse] = useState<PosterCardProps>({ key: '', artist: '', title: '', price: 0, description: '', img: '' });
  const path = window.location.pathname;
  console.log(path);

  useEffect(() => {
    fetch(`http://localhost:9000${path}`)
      .then(response => response.json()) // Parse the response body as JSON data
      .then(data => {
        setApiResponse(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [path]);

  console.log(apiResponse);

  return (
    <>
    <section
    className='"gap-16 bg-gray-20 py-10 md:h-full md:pb-0 mx-auto"'
    >
    <div className='mx-auto'>
    <PosterCard artist={apiResponse.artist} img={apiResponse.img} description={apiResponse.description} price={apiResponse.price} title={apiResponse.title} key={apiResponse.key}></PosterCard>

    </div>
    </section>
    
    </>
  )
}

export default PosterPage
