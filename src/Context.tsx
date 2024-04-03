import { createContext, useState } from "react";

export const Context = createContext({} as any);

const ContextContainer = ({ children }: any) => {
  const [user, setUser] = useState(null);
  console.log("user", user);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default ContextContainer;
