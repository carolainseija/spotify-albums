import { createContext, useState } from "react";

const initialValue = {
  user: "Carolain Seija",
  id: "123Carolain",
};

export const UserContext = createContext(initialValue);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(initialValue.user);

  const value = { user, setUser };
  return <UserContext.Provider value={value} children={children} />;
}
