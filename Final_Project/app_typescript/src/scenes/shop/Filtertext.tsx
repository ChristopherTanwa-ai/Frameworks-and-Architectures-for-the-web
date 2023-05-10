import React, { useEffect, useState } from 'react'
import { SelectedPage } from '@/shared/types';
import { AiOutlineDown } from 'react-icons/ai';
import Dropdown, { DropdownItem } from '@/shared/Dropdown';


type PosterCardProps = {
  selectArtist: (data: string) => void;
  selectPrice: (data: string) => void;
  artists: string[];
  prices: string[];
};



const Filtertext: React.FC<PosterCardProps> = ({
  selectArtist,
  artists,
  selectPrice,
  prices,
}) => {

  const [allArtists, setAllArtists] = useState<string[]>([]);
  const [allPrices, setAllPrices] = useState<string[]>([]);

  useEffect(() => {
    //artist endpoint
    fetch('http://localhost:9000/allArtists')
      .then(response => response.json())
      .then(data => {
        const artistArray: string[] = [];
        // Converting json to string array
        Object.entries(data).forEach(([key, value]) => {
          artistArray.push(value as string);
        });
        // set the state of the artist array
        setAllArtists(artistArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    //prices endpoint
    fetch('http://localhost:9000/allPrices')
      .then(response => response.json())
      .then(data => {
        const priceArray: string[] = [];
        // Converting json to string array
        Object.entries(data).forEach(([key, value]) => {
          priceArray.push((value as number).toString());
        });
        // set the state of the artist array
        setAllPrices(priceArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  //only allow one dropdown to be open at a time
  const [isArtistDropdownOpen, setIsArtistDropdownOpen] = useState<boolean>(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState<boolean>(false);

  const toggleArtistDropdown = () => {
    setIsArtistDropdownOpen(!isArtistDropdownOpen);
    setIsPriceDropdownOpen(false);
  };

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
    setIsArtistDropdownOpen(false);
  };


  return (
    <div className='font-thin justify-end flex'>
      <Dropdown title="Artist" onClick={toggleArtistDropdown} isOpen={isArtistDropdownOpen}>
        {allArtists != null && allArtists.map((artist) => (
          <DropdownItem key={artist} title={artist} select={selectArtist} checked={artists.includes(artist)} />
        ))}
      </Dropdown>
      <div className='w-2'></div>
      <Dropdown title="Price" onClick={togglePriceDropdown} isOpen={isPriceDropdownOpen}>
        {allPrices != null && allPrices.map((price) => (
          <DropdownItem key={price} title={price.toString()} select={selectPrice} checked={prices.includes(price)} />
        ))}
      </Dropdown>
    </div>
  )
}

export default Filtertext