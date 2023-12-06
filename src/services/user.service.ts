import axios from "axios";
import { api } from "./api";

const { REACT_APP_API_URL } = process.env;

interface ILogin {
  token: string;
  user: string;
  error: boolean;
  message?: string;
  found: boolean;
}

export interface IUser {
  name: string;
  user: string;
  email: string;
  password: string;
}

const paths = {
  login: () => "/login",
  createUser: () => "/users",
  verifyJwt: () => "/verifyJwt",
  getAllUsers: () => "/users",
};

async function login(email: string, password: string): Promise<ILogin> {
  const options = {
    email: email,
    password: password,
  };
  const response = await axios.post(REACT_APP_API_URL + paths.login(), options);
  return response.data;
}

async function createUser(params: IUser) {
  const options = {
    ...params,
  };
  const response = await axios.post(
    REACT_APP_API_URL + paths.createUser(),
    options
  );
  return response.data;
}

async function verifyJwt(jwt: string): Promise<{ verified: boolean }> {
  const options = {
    token: jwt,
  };
  const response = await axios.post(
    REACT_APP_API_URL + paths.verifyJwt(),
    options
  );
  return response.data;
}

async function getAllUsers() {
  const response = await api(paths.getAllUsers(), "get");
}

export { login, createUser, verifyJwt, getAllUsers, paths };
