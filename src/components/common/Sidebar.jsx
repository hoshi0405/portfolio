import React from "react";
import {
  AppBar,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return(
    <AppBar
      container={window.document.body}
      variant="permanent"
     >
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
        >
        <ListItemButton component={Link} to={`/`}>
          <Typography variant="body2" fontWeight="700">
            {user.username}
          </Typography>
          <IconButton onClick={logout}>
            <LogoutOutlinedIcon fontSize="small"/>
          </IconButton>
        </ListItemButton>
        <ListItemButton component={Link} to={`/searchstore`}>
          <Typography variant="body2" fontWeight="700">
            店舗検索
          </Typography>
        </ListItemButton>
        <ListItemButton component={Link} to={`/favorite`}>
          <Typography variant="body2" fontWeight="700">
            お気に入り
          </Typography>
        </ListItemButton>
      </List>
      </AppBar>
  )
}

export default Sidebar
