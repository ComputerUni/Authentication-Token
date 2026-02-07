import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setAuthToken(storedToken);
      }
      setIsLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    fetchToken();
  }, []);

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);
  }

  async function logout() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setAuthToken(null);
    await AsyncStorage.removeItem("token");
    setIsLoading(false);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
