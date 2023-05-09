import Htext from "@/shared/Htext";
import { AboutType, SelectedPage } from "@/shared/types"; 
import { 
    CameraIcon,
    BellAlertIcon,
    AtSymbolIcon,
 } from "@heroicons/react/24/solid";
 import { motion } from "framer-motion";
 import AboutCard from "./About";

const about: Array<AboutType> = [
    {
        icon: <CameraIcon className="h-6 w-6"/>,
        title: "Find inspiration on our Instagram",
        description: "Are you seeking inspiration on how to decorate you home - then check out our Instagram!"
    },
    {
        icon: <BellAlertIcon className="h-6 w-6"/>,
        title: "Subscribe to our newsletter",
        description: "Do you want to be the first to know about sales, new posters etc? Then subscribe to our newsletter here."
    },
    {
        icon: <AtSymbolIcon className="h-6 w-6"/>,
        title: "Do you have questions?",
        description: "If you have any questions regarding you poster, feel free to contact us whenever!"
    },
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.5}
    }
};

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
    
};

const MainAbout = ({setSelectedPage}: Props) => {
  return <section
 id="about"
 className="mx-auto min-h-full w-5/6 py-1 mb-[10%]">
    <motion.div
    onViewportEnter={() => setSelectedPage(SelectedPage.About)}>
        {/* HEADER*/}
        <motion.div 
        className="md:my-5 text-center"
        initial="hidden"
            whileInView="visible"
            viewport={{once:true, amount:0.5}}
            transition={{duration:0.5}}
            variants={{
               hidden : {opacity:0, x:-50},
               visible: {opacity:3, x:0}
            }}>

           <Htext>MORE THAN JUST A POSTER SHOP</Htext>
           <p className="my-5 text-sm">We are community of poster enthusiasts! 
            If you'd like to learn more about our story, we invite you to explore our website.

            In addition to our website, we also have an active presence on social media, 
            where we share inspiration for interior design, showcase how our followers have decorated their homes using our posters, 
            and much more! Join us today and let's unleash our creativity together!
           </p>
        </motion.div>

         {/* ABOUT */}
         <motion.div className="mt-5 item-center justify-between gap-8 mt-5"
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.5}}
         variants={container}>

            {about.map((about: AboutType) => (
                <AboutCard
                key={about.title}
                icon={about.icon}
                title={about.title}
                description={about.description}
                setSelectedPage={setSelectedPage}
                />
            ))}
         </motion.div>
    </motion.div>
    </section> 
    };

export default MainAbout;
