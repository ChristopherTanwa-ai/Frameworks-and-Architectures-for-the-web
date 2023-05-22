import { error } from "console";
import React, { useState, useContext, useCallback, createContext } from "react";
import { useNavigate } from "react-router-dom";

// export const UserContext = React.createContext<User>({firstName: "", lastName: "", email: "", password: "", basket: []});

// export const useUserContext = () => useContext(UserContext);

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  basket: string[];
}
// function useUserChange() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<User>();
//     const {} = useUserContext();
//     // const { added, setAdded, removed, setRemoved, changes } =
//     //     useDatagridChangeStateContext();
//     // const getChangeIndex = useCallback(
//     //     (column: string, row: number): number =>
//     //         changes.current.findIndex(
//     //             (change) => change.column === column && change.row === row
//     //         ), []
//     // );
//     const signOut = () => {
//         user && setUser(undefined)
//     }

//     const signIn = (firstName: string, lastName: string, email: string, password: string) => {
//         const user: User = { firstName, lastName, email, password, basket: [] };
//         setUser(user)
//         console.log(user)
//     }

//     return {
//         user,
//         signIn,
//         signOut,
//     };
// }

// export default useUserChange
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
