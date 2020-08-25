import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import ContextMenu from "../ContextMenu";
import slugify from "slugify";
import { returnIcon } from "../../functions";

function useContextMenuState() {
  const initialState = {
    mouseX: null,
    mouseY: null,
  };

  const [state, setState] = useState(initialState);
  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };
  const handleClose = () => {
    setState(initialState);
  };
  return [state, handleClose, handleClick];
}

export const DefaultList = ({ list }) => {
  const [state, handleClose, handleClick] = useContextMenuState();
  // const { name } = useParams();
  return (
    <>
      <NavLink
        to={slugify(list.listName).toLowerCase()}
        // to={`/defaultList/${list.listName}`}
        key={list.listName}
        onContextMenu={handleClick}
      >
        <ListItem button>
          <ListItemIcon>{returnIcon(list.listName)}</ListItemIcon>
          <ListItemText primary={list.listName} />
        </ListItem>
      </NavLink>
      <ContextMenu state={state} handleClose={handleClose} type={"default"} />
    </>
  );
};
export const CreatedList = ({ list, setLists }) => {
  const [state, handleClose, handleClick] = useContextMenuState();

  return (
    <>
      <NavLink
        to={slugify(list.listName).toLowerCase()}
        // to={list.id}
        key={list.listName}
        onContextMenu={handleClick}
      >
        <ListItem button>
          <ListItemIcon>
            <FormatListBulletedOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={list.listName} />
        </ListItem>
      </NavLink>
      <ContextMenu state={state} handleClose={handleClose} type={"normal"} />
    </>
  );
};
