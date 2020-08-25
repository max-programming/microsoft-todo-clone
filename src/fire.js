import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBnfxs3g_8FA0ULoXSIyembxA9D9qflhuc",
  authDomain: "todo-react-efe10.firebaseapp.com",
  databaseURL: "https://todo-react-efe10.firebaseio.com",
  projectId: "todo-react-efe10",
  storageBucket: "todo-react-efe10.appspot.com",
  messagingSenderId: "923671493815",
  appId: "1:923671493815:web:9b1601630b84d43bc3e132",
};

export const fire = firebase.initializeApp(config);

export const db = firebase.firestore();
