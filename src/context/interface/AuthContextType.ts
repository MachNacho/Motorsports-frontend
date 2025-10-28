import type { DecodedUser } from "./DecodedUser";

export interface AuthContextType {
  user: DecodedUser | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
