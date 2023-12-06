import { createContext, useState, useContext, useMemo } from "react";

import * as api from "../services/user.service";
import { CommandFinish, CommandCreate } from "../services/command.service";

interface ICommandsContext {
  finishCommand: (id: string, status: "CANCELED" | "DONE") => Promise<any>;
  createCommand: (body: {
    tableNumber: number;
    items: {
      item: string;
      quantity: number;
      observation: string;
    }[];
  }) => Promise<any>;
}

const commandsContext = createContext<ICommandsContext>({} as ICommandsContext);

const CommandsProvider = ({ children }: { children: JSX.Element }) => {

  const finishCommand = async (id: string, status: "CANCELED" | "DONE") => {
    try {
      CommandFinish(id, status);
    } catch (e: any) {
      console.log(e);
    }
  };

  const createCommand = async (body: {
    tableNumber: number;
    items: {
      item: string;
      quantity: number;
      observation: string;
    }[];
  }) => {
    try {
      CommandCreate(body);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <commandsContext.Provider value={{ finishCommand, createCommand }}>
      {children}
    </commandsContext.Provider>
  );
};

const useCommands = () => {
  return useContext(commandsContext);
};

export { CommandsProvider, useCommands };
