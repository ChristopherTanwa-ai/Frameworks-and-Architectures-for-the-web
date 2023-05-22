import useUser from "@/hooks/useUser";
import useUserChange, { User } from "@/hooks/useUser";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = ({}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Make a POST request to the server with the entered username and password
    const response = await fetch("http://localhost:9000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the login was successful
    if (response.ok) {
      const data: User = await response.json();
      const { firstName, lastName } = data;

      // Add the user to the context
      signIn(firstName, lastName, email, password);
      navigate("/shop");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="mt-5 flex flex-wrap justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold text-slate-900">Email</label>
          </div>
          <div>
            <input
              className="mb-5 rounded-md border border-black px-1 py-1 text-black"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label className="font-bold text-slate-900">Password</label>
            </div>
            <div>
              <input
                className="mb-5 rounded-md border border-black px-1 py-1 text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="self-auto border bg-fuchsia-800 px-10 py-1 font-bold text-white"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
