import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUser({ token, username: null }); // Set the token from sessionStorage, but you might want to retrieve the username as well if you store it in the sessionStorage.
    }
  }, []);
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
