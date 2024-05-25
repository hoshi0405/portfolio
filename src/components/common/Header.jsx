import React from "react";
import {
  AppBar,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import MarkunreadIcon from '@mui/icons-material/Markunread';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Header() {
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
        <ListItemButton sx={{ display: "inline-block" }} component={Link} to={`/searchstore`}>
          <Typography variant="body2" fontWeight="700">
            店舗検索
          </Typography>
        </ListItemButton>
        <ListItemButton sx={{ display: "inline-block" }} component={Link} to={`/favorite`}>
          <Typography variant="body2" fontWeight="700">
            お気に入り
          </Typography>
        </ListItemButton>
        <ListItemButton sx={{ display: "inline-block" }} target="_blank" to={`https://docs.google.com/forms/d/e/1FAIpQLSeWp2QFciRxvFm2d-GpftkqHA3724vE3dUNsMGsxKZFH3R5NQ/viewform?usp=pp_url`}>
          <MarkunreadIcon fontSize="sm"/>
        </ListItemButton>
      </List>
      </AppBar>
  )
}
export default Header
