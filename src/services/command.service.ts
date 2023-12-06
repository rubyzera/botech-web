import axios from "axios";
import { api } from "./api";

import { IUser } from "./user.service";

export interface ICommand {
  createdBy: Omit<IUser, "password">;
  _id: string;
  tableNumber: number;
  status: "PREPARING" | "CANCELED" | "DONE";
  items: {
    _id: string;
    quantity: number;
    observation: string;
    item: {
      _id: string;
      product: {
        price: {
          purchase: number;
          sale: number;
        };
        name: string;
        image: string;
      };
      quantity: number;
    };
  }[];
  orderedIn: string;
  finishedIn: string | null;
  finishedBy: Omit<IUser, "password"> | null;
}

const paths = {
  login: () => "/login",
  createUser: () => "/users",
  verifyJwt: () => "/verifyJwt",
  getAllCommands: () => "/commands",
  CommandCreate: () => "/commands",
  CommandFinish: (id: string) => `/commands/${id}`,
};

async function getAllCommands(): Promise<ICommand[]> {
  const response = await api(paths.getAllCommands(), "get");
  return response;
}

async function CommandCreate(body: {
  tableNumber: number;
  items: {
    item: string;
    quantity: number;
    observation: string;
  }[];
}) {
  await api(paths.CommandCreate(), "post", { body });
}

async function CommandFinish(id: string, status: "CANCELED" | "DONE") {
  await api(paths.CommandFinish(id), "post", { body: { status } });
}

export { getAllCommands, CommandCreate, CommandFinish, paths };
