import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "./interface/AuthContextType";
import type { DecodedUser } from "./interface/DecodedUser";
import { jwtDecode } from "jwt-decode";
import { accountService } from "../API/Services/accountService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const token = accountService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedUser>(token);
        if (!decoded.exp || decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          accountService.logout();
        }
      } catch {
        accountService.logout();
      }
    }
  }, []);

  const login = (token: string) => {
    const decoded = jwtDecode<DecodedUser>(token);
    setUser(decoded);
  };

  const logout = () => {
    accountService.logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
