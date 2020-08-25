import React, { useState, createContext } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  // LISTS
  const [lists, setLists] = useState([]);

  // TODOS
  const [todos, setTodos] = useState([]);
  // DEFAULT LISTS
  const [defaultLists, setDefaultLists] = useState([
    {
      id: "dl1",
      listName: "My Day",
    },
    {
      id: "dl2",
      listName: "Important",
    },
    {
      id: "dl3",
      listName: "Planned",
    },
    {
      id: "dl4",
      listName: "Assigned for you",
    },
    {
      id: "dl5",
      listName: "Tasks",
    },
  ]);

  return (
    <MainContext.Provider
      value={{
        todos,
        setTodos,
        lists,
        setLists,
        defaultLists,
        setDefaultLists,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
