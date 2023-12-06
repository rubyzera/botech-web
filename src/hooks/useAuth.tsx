import { createContext, useState, useContext, useMemo } from "react";

import * as api from "../services/user.service";

export interface IAuth {
  currentUser: string;
  token: string;
}

interface ISetAuth extends IAuth {
  success: boolean;
  error: boolean;
  message?: string;
  found: boolean;
}

interface IAuthContext {
  currentLogin: IAuth;
  setCurrentLogin: (newValue: IAuth) => void;
  setAuth: (email: string, password: string) => Promise<ISetAuth>;
  getAuth: () => {
    token: string;
    user: string;
  };
  verifyAuth: (token: string) => Promise<{
    verified: boolean;
  }>;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [currentLogin, setCurrentLogin] = useState({
    currentUser: sessionStorage.getItem("@cloneTwitter:user") || "",
    token: sessionStorage.getItem("@cloneTwitter:token") || "",
  });

  const setAuth = async (
    email: string,
    password: string
  ): Promise<ISetAuth> => {
    try {
      const data = await api.login(email, password);
      if (data?.error) {
        return { success: false, currentUser: data.user, ...data };
      }
      return { success: true, currentUser: data.user, ...data };
    } catch (e: any) {
      if (e.response?.data) {
        return { success: false, ...e?.response?.data };
      }
      return {
        success: false,
        error: true,
        message: e.message,
        found: false,
        currentUser: "",
        token: "",
      };
    }
  };

  const getAuth = () => {
    const token = localStorage.getItem("@cloneTwitter:token");
    const user = localStorage.getItem("@cloneTwitter:user");
    return token && user ? { token, user } : { token: "", user: "" };
  };

  const verifyAuth = async (token: string): Promise<{ verified: boolean }> => {
    try {
      return await api.verifyJwt(token);
    } catch (e: any) {
      console.log(e.message);
      return { verified: false };
    }
  };

  const loginState = useMemo(
    () => ({
      currentLogin,
      setCurrentLogin: (newValue: IAuth) => {
        sessionStorage.setItem("@cloneTwitter:token", newValue.token);
        sessionStorage.setItem("@cloneTwitter:user", newValue.currentUser);
        setCurrentLogin({
          token: newValue.token,
          currentUser: newValue.currentUser,
        });
      },
    }),
    [currentLogin.token, currentLogin.currentUser]
  );

  return (
    <authContext.Provider
      value={{ setAuth, getAuth, verifyAuth, ...loginState }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { AuthProvider, useAuth };
