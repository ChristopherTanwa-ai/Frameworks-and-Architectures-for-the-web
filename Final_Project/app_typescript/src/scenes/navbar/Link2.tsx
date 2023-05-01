import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link2 = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;

  return (
    <a
    className=" transistion duration-500 hover:text-primary-500"
    href={`${lowerCasePage}`}>
            {page}
    </a>
    /*
    <AnchorLink
      
    transistion duration-500 hover:text-primary-500
   `}
      href={`${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
     */
  );
 
};

export default Link2;
