import { SelectedPage } from '@/shared/types';
import AnchorLink from 'react-anchor-link-smooth-scroll';


type Props = {
    id: string;
    artist: string;
    title:string;
    description: string;
    img: string;
    price: number;
    setSelectedPage: (value:SelectedPage) => void;
}

const Poster = ({img, artist,title,description, price, setSelectedPage }: Props) => {
  return (
    <div className='mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-cent'>
        <div className='mb-4 flex justify-center'>
            <div className='border-2 border-gray-100 p-4'>
                {img}
            </div>
        </div>

    </div>
  )
}

export default Poster