import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import PermanentDrawerLeft from "./components/PermanentDrawerLeft";
import { MainContext } from "./context/MainContext";
import { AuthContext } from "./context/AuthContext";
import Content from "./components/Content";
import slugify from "slugify";
import Login from "./components/Login";
// import Loader from "./components/Loader";

function App() {
  const { lists, defaultLists } = useContext(MainContext);
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <PermanentDrawerLeft />
            {/*  <Route exact path="/">
              <Content list={{}} showInput={false} />
            </Route>
            {defaultLists.map((lst) => (
              <Route
                // path="/defaultList/:name"
                path={`/${slugify(lst.listName).toLowerCase()}`}
                key={lst.listName}
              >
                <Content list={lst} showInput={true} />
              </Route>
            ))}

            {lists.map((lst) => (
              <Route
                path={`/${slugify(lst.listName).toLowerCase()}`}
                // path={lst.id}
                key={lst.listName}
              >
                <Content list={lst} showInput={true} />
              </Route>
            ))} */}
            <div>Hello World</div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
