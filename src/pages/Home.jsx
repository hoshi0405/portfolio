import {
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from 'react';
import storeApi from "../api/storeApi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from
  'react-router-dom';
import { Box } from "@mui/system";
import { setStore } from '../redux/features/storeSlice';



const Home = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.value);



    useEffect(() => {
    const getStores = async () => {
      try {
        const res = await storeApi.getAll();
        dispatch(setStore(res));
      } catch (err) {
        alert(err);
      }
    };
    getStores();
    }, [dispatch]);



  return (
    <Box sx={{mt: "80px"}}>
      {stores.map((item, index) => (
        <ListItemButton
          key={item._id}
          cpmponent={Link}
          sx={{ pl: "20px" }}
          to={`/store/${item._id}`}
          >
            <Typography >
            {item.title}
            </Typography>
        </ListItemButton>
      ))}
    </Box>

    )
  }

export default Home
