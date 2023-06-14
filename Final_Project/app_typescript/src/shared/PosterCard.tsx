import { SelectedPage } from "@/shared/types";
import React from "react";
import { Link } from "react-router-dom";

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
  img,
}) => {
  const title_noSpace = title.replace(/\s/g, "");
  return (
    <Link className="mb-3 h-[550px]" to={`/product/${title_noSpace}`}>
      <div className="relative h-full py-2">
        <img
          src={img}
          alt={title}
          className="max-w-[300px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        />
        <div className="absolute bottom-4 left-0">
          <h2 className="font-bold text-primary-500">{title}</h2>
          <p className="font-thin">{artist}</p>
          <p className="text-primary-red">{price} kr</p>
        </div>
      </div>
    </Link>
  );
};

export default PosterCard;
