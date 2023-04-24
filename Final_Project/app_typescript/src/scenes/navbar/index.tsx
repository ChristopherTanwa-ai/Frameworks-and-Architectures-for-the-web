import { useState } from "react"
import { Bars3Icon,XMarkIcon } from "@heroicons/react/24/solid"
import Logo from "@/assets/Logo.svg"
import Link from "./Link"
import { SelectedPage } from "@/shared/types"
import useMediaQuery from "@/hooks/useMediaQuery"
import ActionButton from "@/shared/ActionButton"


type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({isTopOfPage, selectedPage,setSelectedPage}: Props) => {
const flexbetween = "flex items-center justify-between";
const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow"
  return (
    <nav>
        <div className={`${navbarBackground} ${flexbetween} fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexbetween} mx-auto w-5/6`}>
                <div className={`${flexbetween} w-full gap-16 `}>
                    {/* Left side */}
                    <img src={Logo} alt="logo" className="max-w-8 max-h-8" />
                
                    {/* Right side */}
                   {isAboveMediumScreens ? (
                   <div className={`${flexbetween} w-full`}>
                        <div className={`${flexbetween} gap-8 text-sm`}>
                            <Link page="Home"
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="Shop"  
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="About" 
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="Cart" 
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage}/>
                        </div>
                        <div className={`${flexbetween} gap-8`}>
                        <p>Login</p>
                        <ActionButton setSelectedPage={setSelectedPage}>Sign Up</ActionButton>
                        </div>
                    </div>)
                        :(
                            <button
                             className="rounded-full bg-secondary-500 p-2"
                             onClick={() => {setIsMenuToggled(!isMenuToggled)}}
                             >
                        <Bars3Icon className="h-6 w-6 text-white" />
                            
                            </button>
                        )
                    }
                    </div>
                </div>
            </div>
            {/** Mobile Menu Modal */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                    {/**Close icon */}
                    <div className="flex justify-end p-12">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-black" />
                        </button>
                    </div>
                    {/** Menu items */}
                    <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                            <Link page="Home"
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="Shop"  
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="About" 
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage} />
                            <Link page="Cart" 
                             selectedPage={selectedPage}
                             setSelectedPage={setSelectedPage}/>
                        </div>
                </div>
            )}
    </nav>
  )
}

export default Navbar