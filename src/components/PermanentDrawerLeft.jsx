import React, { useContext, useState } from "react";
import {
  CssBaseline,
  Divider,
  Drawer,
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  TextField,
  Container,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

// Main Icons

// Context Menu Icons
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import "../App.css";
import { MainContext } from "../context/MainContext";
import { DefaultList, CreatedList } from "./Lists/TodoLists";
import { fire, db } from "../fire";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);
  const [newListName, setNewListName] = useState("Untitled List");

  // eslint-disable-next-line
  const { todos, lists, setLists, defaultLists } = useContext(MainContext);

  const addList = (e) => {
    e.preventDefault();
    if (newListName.trim() === "") {
      return;
    } else {
      const newList = {
        listName: newListName,
      };
      // setLists([...lists, newList]);
      setShowInput(false);
      db.collection("lists").add(newList);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        {/* DEFAULT LISTS */}
        <List>
          {defaultLists.map((list) => (
            <DefaultList list={list} key={list.listName} />
          ))}
        </List>
        <Divider />
        {/* USER CREATED LISTS */}
        <List>
          {lists.map((list) => (
            <CreatedList
              setLists={setLists}
              list={list}
              key={list.listName}
              todos={todos}
            />
          ))}

          {showInput ? (
            <Container>
              <form className="addList" onSubmit={addList}>
                <TextField
                  label="Add a List"
                  style={{ fontSize: "1.3rem" }}
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  autoFocus
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Container>
          ) : (
            <ListItem
              onClick={() => setShowInput(true)}
              style={{ cursor: "text" }}
              button
            >
              <ListItemIcon>
                <AddOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="New List" style={{ opacity: 0.7 }} />
            </ListItem>
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
