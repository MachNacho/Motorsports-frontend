import jwtDecode from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time (UNIX timestamp in seconds)
  [key: string]: any;
}


const ACCESS_TOKEN_KEY = "access_token";

//Save token to local storage
export const saveToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

//Get token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

//Remove token from local storage
export const removeToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

//Check if token is valid
export const isTokenExpired = (token?: string): boolean => {
  try {
    const jwt = token || getToken();
    if (!jwt) return true;

    const decoded = jwtDecode<JwtPayload>(jwt);
    const currentTime = Date.now() / 1000; // Current time in seconds

    return decoded.exp < currentTime;
  } catch (error) {
    // If token is malformed or can't be decoded, treat as expired
    return true;
  }
};

// Get decoded payload
export const getDecodedToken = (): JwtPayload | null => {
  try {
    const token = getToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    return null;
  }
};