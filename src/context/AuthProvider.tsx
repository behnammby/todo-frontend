import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  username: string | null;
  email: string | null;
  login: (token: string, username: string, email: string) => void;
  logout: () => void;
}

const initialContext: AuthContextType = {
  token: null,
  username: null,
  email: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  const navigate = useNavigate();

  function login(token: string, username: string, email: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    setToken(token);
    setUsername(username);
    setEmail(email);

    navigate("/");
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setToken(null);
    setUsername(null);
    setEmail(null);

    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ token, username, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
