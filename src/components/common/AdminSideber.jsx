import React from "react";
import {
  AppBar,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from 'react-router-dom';




function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
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
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700">
              管理者
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small"/>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{paddingTop: "10px"}}></Box>
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700" >
              店舗追加
            </Typography>
          </Box>
        </ListItemButton>
         <Box sx={{paddingTop: "10px"}}></Box>
        <ListItemButton>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
          </Box>
        </ListItemButton>
      </List>
      </AppBar>
  )
}

export default Sidebar
