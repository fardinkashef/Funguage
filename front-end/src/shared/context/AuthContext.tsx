import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContext = {
  loggedIn: boolean | undefined;
  userName: string | undefined;
  getLoggedIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | null>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  // I changed the initial value of loggedIn to false because the free backend server goes to sleep and is a terrible user experience to wait that long. But With a paid backend server, change it back to undefined to prevent content shifting in nav bar on first render👇:
  // const [loggedIn, setLoggedIn] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/auth/loggedin"
    );

    setLoggedIn(loggedInRes.data.loggedIn);
    setUserName(loggedInRes.data?.userName);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, userName, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

// Always use a custom hook like this when using context:
export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("useAuthContext must be used within AuthContextProvider ");
  return authContext;
}
