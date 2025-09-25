import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";   // ✅ Import Link
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

export default function Navigation() {

const menuItems = [
  { text: "HOME", icon: <HomeIcon />, path: "/home" },
  { text: "EVENTS", icon: <EventIcon />, path: "/events" },
  { text: "TECHNEWS", icon: <NewspaperIcon />, path: "/technews" },
  { text: "PROFILES", icon: <PersonIcon />, path: "/signup" },
];


  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}         // ✅ Link to a route
                to={item.path}
                sx={{
                  "&:hover": { backgroundColor: "#1565c0" },
                  textDecoration: "none",
                  color: "white"
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
