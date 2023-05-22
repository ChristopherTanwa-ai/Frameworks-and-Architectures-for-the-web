import useUserChange, { User } from "@/hooks/useUser";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Registerbtn = ({}: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const nagivate = useNavigate();

  const { signIn } = useUserChange();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
      setIsValidEmail(false);
      return; // Stop form submission if email is invalid
    }

    // Check if the username already exists in users.json
    const usersResponse = await fetch("http://localhost:9000/users");
    const users = await usersResponse.json();

    let usersEmpty = false;

    // check if users are empty
    if (users.length === 0 || users.length === undefined) {
      usersEmpty = true;
    }
    let user;

    if (!usersEmpty) {
      user = users.find((u: any) => u.email === email);
    }

    if (user) {
      alert("Email already exists, please use another email");
    } else {
      // Add the new user to users.json with an empty basket
      const newUser = { firstName, lastName, email, password, basket: [] };
      const response = await fetch("http://localhost:9000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const data: User = await response.json();
        const { firstName, lastName } = data;

        // Add the user to the context
        signIn(firstName, lastName, email, password);
        nagivate("/shop");
      } else {
        alert("Failed to create user");
      }
    }
  };

  return (
    <div className="mt-5 flex flex-wrap justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form className="" onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="font-bold text-slate-900">First Name</label>
            <input
              className="mb-5 rounded-md border border-black px-1 py-1 text-black"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="font-bold text-slate-900">Last Name</label>
            <input
              className="mb-5 rounded-md border border-black px-1 py-1 text-black"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="font-bold text-slate-900">Email</label>
          </div>
          <div>
            <input
              className={`mb-5 rounded-md border ${
                !isValidEmail ? "border-red-600" : "border-black"
              } px-1 py-1 text-black`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail && (
              <div>
                <p className="text-red-600">
                  Please enter a valid email address.
                </p>
              </div>
            )}
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
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Registerbtn;
