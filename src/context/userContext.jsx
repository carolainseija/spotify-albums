import { createContext, useState } from "react";
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    displayName: "Usuario"
  });

  const value = { user, setUser };
  return <UserContext.Provider value={value} children={children} />;
}
