import { motion } from 'framer-motion';
import React, { useState } from 'react'

type Props = {
    isLoggedIn: boolean;
    handleLogin: () => void;
}

const Registerbtn = ({ isLoggedIn, handleLogin}: Props) => {
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isValidEmail, setIsValidEmail] = useState(true);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    // Check if the email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
    setIsValidEmail(false);
    return; // Stop form submission if email is invalid
    }
  // Make a POST request to the server with the entered username and password
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // Check if the login was successful
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);

    // Update the parent state to indicate that the user is logged in
    const user = { username, password, basket: [] };
    sessionStorage.setItem("user", JSON.stringify(user));
    
    handleLogin();
  } else {
    // Check if the username already exists in users.json
    const usersResponse = await fetch("http://localhost:9000/users");
    const users = await usersResponse.json();
    console.log(usersResponse);
    console.log(users);
    const user = users.find((u: any) => u.username === username);

    if (user) {
      alert("Incorrect password");
    } else {
      // Add the new user to users.json with an empty basket
      const newUser = { username, password, email, basket: [] };
      const newUserResponse = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (newUserResponse.ok) {
        // Update the parent state to indicate that the user is logged in

        sessionStorage.setItem("user", JSON.stringify(newUser));
        handleLogin();
      } else {
        alert("Failed to create user");
      }
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
    <form className='' onSubmit={handleSubmit}>
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
                    <p className="text-red-600">Please enter a valid email address.</p>
                </div>
            )}
          </div>
      <div>
        <label className="font-bold text-slate-900">Username</label>
      </div>
      <div>
        <input
          className="mb-5 rounded-md border border-black px-1 py-1 text-black"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        Register
      </button>
      </div>
      
    </form>

      
    </motion.div>
    
  </div>
);
}

export default Registerbtn