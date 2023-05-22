import useUser from "@/hooks/useUser";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {};
const Account = ({}: Props) => {
  const { user, removeAccount } = useUser();
  const navigate = useNavigate();

  return (
    <div className="mx-[10%] h-full pt-[10%]">
      <h1 className="basis-3/5 pb-4 text-center font-montserrat text-3xl text-black">
        Hi {user?.firstName}
      </h1>
      <p className="pb-5 text-center">Here you can delete your user account</p>
      <div className="flex justify-center gap-4">
        <motion.button
          className="rounded-md bg-red-700 px-10 py-2 text-white hover:bg-red-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            removeAccount();
            navigate("/");
          }}
        >
          Remove account
        </motion.button>
      </div>
    </div>
  );
};

export default Account;
