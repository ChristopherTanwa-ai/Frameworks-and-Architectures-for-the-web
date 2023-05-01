export enum SelectedPage{
    Home = "home",
    Shop = " shop",
    About = "about",
    Cart = "cart",
    HomeProducts ="homeproducts"
  }
  
export interface Poster {
    id: string;
    artist: string;
    title:string;
    description: string;
    img: string;
    price: number;
  }

  export interface AboutType {
    icon: JSX.Element;
    title: string, 
    description: string;
  }
    