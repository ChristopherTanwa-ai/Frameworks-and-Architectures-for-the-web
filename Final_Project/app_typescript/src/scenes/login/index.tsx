import React, { useState } from "react";

type Props = {
  isLoggedIn: boolean;
  handleLogin: () => void;
};

const Login = ({ isLoggedIn, handleLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      localStorage.setItem('token', data.token);

      // Update the parent state to indicate that the user is logged in
      const user = { username, password, basket: [] };
      sessionStorage.setItem('user', JSON.stringify(user));

      handleLogin();
    } else {
      // Check if the username already exists in users.json
      const usersResponse = await fetch("http://localhost:9000/users");
      const users = await usersResponse.json();
      console.log(usersResponse);
      console.log(users);
      const user = users.find((u: any) => u.username === username);
      
      if (user) {
        alert('Incorrect password');
      } else {
        // Add the new user to users.json with an empty basket
        const newUser = { username, password, basket: [] };
        const newUserResponse = await fetch("http://localhost:9000/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        if (newUserResponse.ok) {
          // Update the parent state to indicate that the user is logged in
          
          sessionStorage.setItem('user', JSON.stringify(newUser));
          handleLogin();
        } else {
          alert('Failed to create user');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
