import useUser from "@/hooks/useUser";
import { Poster } from "@/shared/types";
import { useState, useEffect } from "react";

type Props = {};

interface CartItem extends Poster {
  quantity: number;
}

const Cart = (props: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [username, setUsername] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    fetch("http://localhost:9000/users")
      .then((response) => response.json())
      .then((data) => {
        if (user && user.email) {
          const userFound = data.find(
            (u: { email: any }) => u.email === user.email
          );
          const username2 = userFound.firstName;
          setUsername(username2);
          const cartItems = userFound.basket.map((item: any) => ({
            ...item,
            quantity: 1, // Initialize quantity to 1 for each item. JAKEN det her er fint medmindre vi vil have at en user skal kunne lægge flere posters i basket fra en posterside
          }));
          setCart(cartItems);
        } else {
          fetch("http://localhost:9000/users/nousers")
            .then((response) => response.json())
            .then((data) => {
              const cartItems = data.map((item: any) => ({
                ...item,
                quantity: 1,
              }));
              setCart(cartItems);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleIncrease = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove2 = (itemId: string) => {
    // Make a POST request to the server to remove the item from the user's basket
    fetch("http://localhost:9000/users/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user?.email,
        itemId: itemId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Item was successfully removed, update the cart state
          setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        } else {
          // Display an error message or handle the error as needed
          console.error("Error removing item:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  return (
    <div className="mx-[10%] h-full pt-[10%]">
      <h1 className="basis-3/5 pb-4 font-montserrat text-3xl text-fuchsia-900">
        {username && username + "'s"} Cart
      </h1>
      <div className="grid-rows-12 grid grid-cols-12">
        <div className="ounded-md row-span-10 col-span-12 border-solid border-stone-400 text-center">
          {cart.map((item) => (
            <div className="flex flex-nowrap pb-3" key={item.id}>
              <img
                src={item.img}
                className="ml-2 mt-2 shadow-md md:max-h-[8%] md:max-w-[8%]"
              />
              <div className="flex flex-grow items-center">
                <div className="ml-10 w-[30%]">
                  <p className="font-sans text-stone-800">{item.artist}</p>
                  <p className="font-sans font-light text-stone-600">
                    {item.title}
                  </p>
                </div>
                <p className="ml-auto font-sans text-black">{item.quantity}</p>
                <div className="ml-auto space-x-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="font-sans text-2xl text-orange-700 hover:text-orange-900"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="font-sans text-2xl text-emerald-700 hover:text-emerald-900"
                  >
                    +
                  </button>
                </div>
                <div className="ml-auto space-x-3">
                  <button
                    onClick={() => handleRemove2(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-700"
                  >
                    X
                  </button>{" "}
                </div>
                <p className="ml-auto mr-4 font-mono text-black">
                  {item.price * item.quantity} kr
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 row-span-2 mt-2 flex justify-end rounded-md border-2  border-dotted border-fuchsia-800 py-4">
          <p className="mr-5 font-montserrat text-black">Total </p>
          <p className="mr-5 font-mono text-black">{calculateTotalPrice()}kr</p>
        </div>

        <div className="col-span-12 mt-2 flex justify-end  py-4">
          <button className="rounded-md bg-fuchsia-900 px-8 py-2 text-white hover:bg-fuchsia-500 hover:text-amber-500">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
