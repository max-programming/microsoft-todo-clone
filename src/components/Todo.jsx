import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import CardActions from "@material-ui/core/CardActions";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { MainContext } from "../context/MainContext";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 100,
    margin: 5,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Todo({ todo, list }) {
  // eslint-disable-next-line
  const { todos, setTodos, lists, setLists } = useContext(MainContext);
  const [important, setImportant] = useState(todo.important);
  // eslint-disable-next-line
  const [checked, setChecked] = useState(todo.checked);
  const classes = useStyles();
  const checkTodo = () => {
    todo.checked = !todo.checked;
    setChecked(todo.checked);

    setTodos(
      todos.map((td) => {
        if (td.id === todo.id) td.checked = todo.checked;
        return td;
      })
    );
  };
  const addToImportant = () => {
    // debugger;
    // ALSO REMOVE IT FROM THE defaultLists ARRAY
    if (important === false) {
      setTodos(
        todos.map((td) => {
          if (td.id === todo.id) {
            td.listIds.push("dl2");
            td.important = true;
          }
          return td;
        })
      );
      setImportant(true);
    } else if (important) {
      setTodos(
        todos.map((td) => {
          if (td.id === todo.id) {
            td.listIds.splice(td.listIds.indexOf("dl2"), 1);
            td.important = false;
          }
          return td;
        })
      );
      setImportant(false);
    }

    // REFRACTOR
    // todo.important = !todo.important;
    // setImportant(todo.important);
  };
  return (
    todo.listIds.includes(list.id) && (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            variant="h6"
            component="h6"
            className={checked ? "checked" : ""}
          >
            <Checkbox
              icon={<RadioButtonUncheckedOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
              color="primary"
              checked={checked ? true : false}
              onChange={checkTodo}
            />
            {todo.name}
            <IconButton style={{ float: "right" }} onClick={addToImportant}>
              {important ? (
                <StarIcon color="primary" />
              ) : (
                <StarBorderOutlinedIcon color="primary" />
              )}
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    )
  );
}
