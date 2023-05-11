import { Poster } from '@/shared/types'
import { useState, useEffect } from 'react';

type Props = {}

interface CartItem extends Poster {
  quantity: number;
}

const Cart = (props: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:9000/users')
      .then(response => response.json())
      .then(data => {
        const username = data[0].username;
        setUsername(username);

        const cartItems = data[0].basket.map(item => ({
          ...item,
          quantity: 1 // Initialize quantity to 1 for each item
        }));
        setCart(cartItems);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleIncrease = (itemId: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  return (
    <div className='h-full pt-[10%] mx-[10%]'>
      <h1 className='basis-3/5 font-montserrat text-3xl text-fuchsia-900 pb-4'>
        {username}'s basket
      </h1>
      <div className='grid grid-cols-12 grid-rows-12'>
        
        <div className='border-solid ounded-md border-stone-400 text-center col-span-12 row-span-10'>
          {cart.map(item => (
            <div className='flex flex-nowrap pb-3' key={item.id}>
              <img src={item.img} className='max-w-[8%] max-h-[8%] shadow-md ml-2 mt-2' />
              <div className='flex flex-grow items-center'>
                <div className='ml-10 w-[30%]'>
                  <p className='font-sans text-stone-800'>{item.artist}</p>
                  <p className='font-sans text-stone-600 font-light'>{item.title}</p>
                </div>
                <p className='ml-auto font-sans text-black'>{item.quantity}</p>
                <div className='ml-auto space-x-3'>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className='font-sans text-emerald-700 text-2xl hover:text-emerald-900'
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className='font-sans text-orange-700 text-2xl hover:text-orange-900'
                  >
                    -
                  </button>
                </div>
                <p className='ml-auto font-mono text-black mr-4'>
                  {item.price * item.quantity} kr
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className='flex justify-end mt-2 py-4 border-dotted border-2 rounded-md  border-fuchsia-800 row-span-2 col-span-12'>
            <p className='mr-5 text-black font-montserrat'>Total </p>
            <p className='mr-5 text-black font-mono'>{calculateTotalPrice()}kr</p>
        </div>
        
        <div className='flex justify-end mt-2 py-4  col-span-12'>
                <button className='bg-fuchsia-900 rounded-md text-white px-8 py-2 hover:bg-fuchsia-500 hover:text-amber-500'>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
