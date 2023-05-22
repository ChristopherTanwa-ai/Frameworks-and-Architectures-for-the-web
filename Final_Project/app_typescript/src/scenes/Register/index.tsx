import React, { useState } from "react";
import Login from "../login";
import Registerbtn from "../login/registerbtn";
import useUser from "@/hooks/useUser";

type Props = {};

const Register = ({}: Props) => {
  const [isLoginToggled, setIsLoginToggled] = useState<boolean>(true);
  const { user } = useUser();

  return (
    <div className="mx-[10%] h-full pt-[10%]">
      <h1 className="basis-3/5 pb-4 text-center font-montserrat text-3xl text-black">
        Hi {user?.firstName}
      </h1>
      <p className="pb-5 text-center">
        Here you can login, register or delete your user
      </p>
      <div className="flex justify-center gap-4">
        {!isLoginToggled && (
          <button
            className="rounded-md bg-secondary-500 px-10 py-2 text-white hover:bg-primary-500 hover:text-white"
            onClick={() => setIsLoginToggled(true)}
          >
            Login
          </button>
        )}

        {isLoginToggled && (
          <button
            className="rounded-md bg-emerald-700 px-10 py-2 text-white hover:bg-emerald-500 hover:text-white"
            onClick={() => setIsLoginToggled(false)}
          >
            Register
          </button>
        )}
      </div>
      {isLoginToggled ? <Login /> : <Registerbtn />}
    </div>
  );
};

export default Register;
