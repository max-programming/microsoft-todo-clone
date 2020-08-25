import React, { useState, useEffect, useContext, createContext } from "react";
import { MainContext } from "./MainContext";
import { fire, db } from "../fire";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [pending, setPending] = useState(true);

  const { setLists, setTodos } = useContext(MainContext);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setPending(false);
      } else {
        setUser(null);
        setPending(true);
      }
    });
  };
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
  };
  useEffect(() => {
    authListener();
    getLists();
    getTodos();
  }, []);
  const handleSignup = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => fire.auth().signOut();

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleSignup,
        handleLogout,
        user,
        emailError,
        passwordError,
        email,
        password,
        hasAccount,
        pending,
        setHasAccount,
        setEmail,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
