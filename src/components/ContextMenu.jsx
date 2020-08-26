import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

export default function ContextMenu({ handleClose, state, type }) {
  const [menuItems] = useState(
    type === "normal" && [
      {
        icon: <EditTwoToneIcon />,
        name: "Rename list",
        color: "unset",
      },
      {
        icon: <FileCopyTwoToneIcon />,
        name: "Duplicate list",
        color: "unset",
      },
      {
        icon: <DeleteTwoToneIcon />,
        name: "Delete list",
        color: "red",
      },
    ]
  );

  return (
    <Menu
      keepMounted
      open={state.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        state.mouseY !== null && state.mouseX !== null
          ? { top: state.mouseY, left: state.mouseX }
          : undefined
      }
    >
      {Array.isArray(menuItems) &&
        menuItems.map((item) => (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
            key={item.name}
            style={{ padding: 15, color: item.color }}
          >
            {item.icon} &nbsp; {item.name}
          </MenuItem>
        ))}
    </Menu>
  );
}
