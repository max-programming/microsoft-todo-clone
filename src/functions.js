import React from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorderOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";

export const returnIcon = (listName) => {
  switch (listName) {
    case "My Day":
      return <WbSunnyOutlinedIcon />;
    case "Important":
      return <StarBorderIcon />;
    case "Planned":
      return <EventNoteOutlinedIcon />;
    case "Assigned for you":
      return <PermIdentityOutlinedIcon />;
    case "Tasks":
      return <HomeOutlinedIcon />;
    default:
      return;
  }
};
