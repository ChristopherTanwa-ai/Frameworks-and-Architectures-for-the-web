import { SelectedPage } from "@/shared/types";
import { log } from "console";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  page: string;
  name?: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onClick?: () => void;
};

const Link2 = ({
  page,
  name,
  selectedPage,
  setSelectedPage,
  onClick,
}: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  const newPath = removeProductPath(lowerCasePage); // Remove "/product" from the URL
  const navigate = useNavigate();

  return (
    <Link
      className="transition duration-500 hover:text-primary-500"
      to={`/${newPath}`} // Set the URL to "/home" instead of "/product/home"
      onClick={() => {
        setSelectedPage(lowerCasePage);
        onClick && onClick();
      }}
    >
      {name ?? page}
    </Link>
  );
};

function removeProductPath(path: string) {
  return path.replace("/product", "");
}

export default Link2;
