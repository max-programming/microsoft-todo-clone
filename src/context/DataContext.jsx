import React, { useEffect, useContext, createContext } from "react";
import { MainContext } from "./MainContext";
import { db } from "../fire";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { setLists, setTodos } = useContext(MainContext);

  /* const getLists = () => {
    db.collection("lists")
      .get()
      .then((snapshot) => {
        let listsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          listName: doc.get("listName"),
        }));
        setLists(listsArr);
      });
  };
  const getTodos = () => {
    db.collection("todos")
      .get()
      .then((snapshot) => {
        let todosArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.get("name"),
          checked: doc.get("checked"),
          important: doc.get("important"),
          listIds: doc.get("listIds"),
        }));
        setTodos(todosArr);
      }); */
  // db.collection("todos").onSnapshot((snapshot) => {
  //   let changes = snapshot.docChanges();
  //   let todosArr = changes.map((change) => {
  //     if (change.type === "added") {
  //       return {
  //         id: change.doc.id,
  //         name: change.doc.get("name"),
  //         checked: change.doc.get("checked"),
  //         important: change.doc.get("important"),
  //         listIds: change.doc.get("listIds"),
  //       };
  //     }
  //   });
  //   console.log(todosArr);
  //   setTodos(todosArr);
  // });
  useEffect(() => {
    const getLists = () => {
      db.collection("lists")
        .get()
        .then((snapshot) => {
          let listsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            listName: doc.get("listName"),
          }));
          setLists(listsArr);
        });
    };
    const getTodos = () => {
      db.collection("todos")
        .get()
        .then((snapshot) => {
          let todosArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.get("name"),
            checked: doc.get("checked"),
            important: doc.get("important"),
            listIds: doc.get("listIds"),
          }));
          setTodos(todosArr);
        });
      getLists();
      getTodos();
    };
  }, [setLists, setTodos]);
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
