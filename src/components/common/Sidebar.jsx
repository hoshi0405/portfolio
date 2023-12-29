import React, { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from '@mui/system';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";




function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { storeId } = useParams();
  const user = useSelector((state) => state.user.value);
  const stores = useSelector((state) => state.store.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };



  useEffect(() => {
    const activeIndex = stores.findIndex((e) => e._id === storeId);
    setActiveIndex(activeIndex);
  }, [stores, storeId, navigate]);


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
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small"/>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{paddingTop: "10px"}}></Box>
        <ListItemButton component={Link} to={`/searchstore`}>
          <Box sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography variant="body2" fontWeight="700">
              店舗検索
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
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
             <IconButton>
              <AddBoxOutlinedIcon fontSize="smail"/>
            </IconButton>
          </Box>
        </ListItemButton>
      </List>
      </AppBar>
  )
}

export default Sidebar
