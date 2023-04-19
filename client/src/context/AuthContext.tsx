import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  token: string | null;
  username: string | null;
}

const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
}>({
  user: { token: null, username: null },
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ token: null, username: null });
  const logout = () => {
    sessionStorage.removeItem("token");
    setUser({ token: null, username: null });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
