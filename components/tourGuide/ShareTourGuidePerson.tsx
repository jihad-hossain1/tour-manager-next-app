"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoShareOutline } from "react-icons/io5";

const ShareTourGuidePerson = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main className="flex justify-between items-center px-4">
      <div>
        Morocco {"›"} Tangier {"›"} Guides
      </div>
      <div>
        <button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="flex gap-2 border border-gray-400 p-2 rounded-md items-center hover:bg-blue-100 transition-all duration-300"
        >
          <IoShareOutline size={23} />
          <span className="text-xl">Share</span>
        </button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ top: "50px" }}
        >
          <MenuItem onClick={handleClose}>Copy Link</MenuItem>
          <MenuItem onClick={handleClose}>Message</MenuItem>
          <MenuItem onClick={handleClose}>Mail</MenuItem>
        </Menu>
      </div>
    </main>
  );
};

export default ShareTourGuidePerson;
