import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Todo from "./Todo";
import { AuthContext } from "../context/AuthContext";
import { MainContext } from "../context/MainContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import "../index.css";
import { db } from "../fire";

// import PropTypes, { string } from "prop-types";

const Content = ({ list, showInput }) => {
  const [todoName, setTodoName] = useState("");

  const { todos } = useContext(MainContext);
  const { handleLogout } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      name: todoName,
      checked: false,
      important: false,
      listIds: [list.id],
    };
    db.collection("todos").add(newTodo);

    setTodoName("");
    // setTodos([newTodo, ...todos]);
  };
  return (
    // Try adding ID for each list
    <>
      <AppBar
        position="fixed"
        style={{
          width: `calc(100% - 240px)`,
          marginLeft: 240,
        }}
      >
        <Toolbar className="toolbar">
          <Typography variant="h6" noWrap>
            {list.listName ? list.listName : "MS Todo Clone"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className="logoutBtn btn"
          >
            <ExitToAppIcon /> &nbsp; Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {showInput && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Add a Todo"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon opacity="0.6" />
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: 10 }}
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
          </form>
        )}

        {todos &&
          todos.map((todo) => <Todo todo={todo} key={todo.id} list={list} />)}
        {/* <FormControl
          style={{ position: "absolute", bottom: 20 }}
          className="addTask"
        >
          <TextField
            placeholder="Add a Task"
            // fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon opacity="0.6" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl> */}
      </Container>
    </>
  );
};

export default Content;
