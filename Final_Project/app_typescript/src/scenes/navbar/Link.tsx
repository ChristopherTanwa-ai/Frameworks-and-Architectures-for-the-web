import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  const newPath = removeProductPath(lowerCasePage) as SelectedPage; // Remove "/product" from the URL
  return (
    <AnchorLink
      className={`${selectedPage === newPath ? "text-primary-500" : ""}
    transistion duration-500 hover:text-primary-500
   `}
      href={`#${newPath}`}
      onClick={() => setSelectedPage(newPath)}
    >
      {page}
    </AnchorLink>
  );
};

function removeProductPath(path: string) {
  return path.replace('/product', '');
}
function checkAbout(link: SelectedPage){
  if(link == "about"){
    removeProductPath(link)
  }
  else return link
}
export default Link;
