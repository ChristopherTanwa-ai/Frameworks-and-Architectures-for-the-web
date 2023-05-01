import { SelectedPage } from "@/shared/types";
import { log } from "console";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link2 = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  const newPath = removeProductPath(lowerCasePage); // Remove "/product" from the URL

  return (
    <a
      className="transition duration-500 hover:text-primary-500"
      href={`/${newPath}`} // Set the URL to "/home" instead of "/product/home"
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </a>
  );
};

function removeProductPath(path: string) {
  return path.replace('/product', '');
}

export default Link2;
