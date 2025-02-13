import React from "react";
import { Box, IconButton, Button, Badge, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../assets/SwipeMove-3.png"; // Adjust the path as necessary

interface NavbarProps {
  likedPropertiesLength: number;
  onSearchClick: () => void;
  onLikedPropertiesClick: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  likedPropertiesLength,
  onSearchClick,
  onLikedPropertiesClick,
  anchorEl,
  handleClose,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1px 20px",
        backgroundColor: "#f5f5f5",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo and Search Button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <IconButton onClick={onSearchClick}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={logo}
          alt="SwipeMove Logo"
          style={{ width: "150px", height: "auto", maxWidth: "100%" }}
        />
      </Box>

      {/* Liked Properties and Sign-In/Log-In */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <IconButton onClick={onLikedPropertiesClick}>
          <Badge badgeContent={likedPropertiesLength} color="primary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5DC2BB", color: "white" }}
        >
          Sign In / Log In
        </Button>
      </Box>

      {/* Liked Properties Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Example properties list, assuming likedProperties is passed as a prop */}
        {/* {likedProperties.map((property) => (
          <MenuItem key={property.id} onClick={handleClose}>
            <PropertyCard
              property={property}
              onClick={() => window.open(property.url, "_blank")}
            />
          </MenuItem>
        ))} */}
      </Menu>
    </Box>
  );
};

export default Navbar;
