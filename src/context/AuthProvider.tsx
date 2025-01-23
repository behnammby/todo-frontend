import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const initialContext: AuthContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  function login(token: string) {
    localStorage.setItem("token", token);
    setUser(token);
    navigate("/");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
