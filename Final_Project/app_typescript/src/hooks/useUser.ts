import React, { useState, useContext, createContext } from "react";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  basket: string[];
}

export interface UseUserChangeState {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}
export interface UseUserState {
  user?: User;
  signIn: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  signOut: () => void;
  removeAccount: () => void;
}
export const UserChangeStateContext = createContext<
  UseUserChangeState | undefined
>(undefined);
export const useUserChangeStateContext = () =>
  useContext(UserChangeStateContext);

export function useUserChangeState(): UseUserChangeState {
  const [user, setUser] = useState<User>();

  return {
    user,
    setUser,
  };
}

function useUser(): UseUserState {
  const userContext = useUserChangeStateContext();
  const signOut = () => {
    userContext?.setUser && userContext.setUser(undefined);
  };
  const signIn = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    userContext?.setUser &&
      userContext.setUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        basket: [],
      });
  };
  const removeAccount = async () => {
    const user = userContext?.user;
    const { email, password } = user!;
    const response = await fetch("http://localhost:9000/users/removeAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      signOut();
    } else {
      alert("Failed to remove account");
    }
  };

  return {
    user: userContext?.user,
    signIn,
    signOut,
    removeAccount,
  };
}
export default useUser;
