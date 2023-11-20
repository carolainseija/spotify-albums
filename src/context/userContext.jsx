import { createContext, useState } from "react";
import useLoginSpotify from "../hooks/useLoginSpotify";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const { getUser } = useLoginSpotify();

  const [user, setUser] = useState({
    displayName: "Usuario",
  });

  const handleChangeUser = async () => {
    if (window.localStorage.getItem("access_token") !== undefined) {
      const name = await getUser();
      setUser({
        displayName: name,
      });
    }
  };

  const value = { user, setUser, handleChangeUser };
  return <UserContext.Provider value={value} children={children} />;
}
