import {
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import adminStoreApi from "../api/adminStoreApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from
  'react-router-dom';
import { Box } from "@mui/system";
import { setStore } from '../redux/features/storeSlice';


const AdminHome = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { storeId } = useParams();
  const navigate = useNavigate();


    useEffect(() => {
    const getStores = async () => {
      try {
        const res = await adminStoreApi.getAll();
        dispatch(setStore(res));
      } catch (err) {
        alert(err);
      }
    };
    getStores();
    }, [dispatch]);

  useEffect(() => {
    const activeIndex = stores.findIndex((e) => e._id === storeId);
    setActiveIndex(activeIndex);
  }, [stores, storeId, navigate]);

  const addStore = async () => {
    try {
      const res = await adminStoreApi.create();
      console.log(res);
      const createSrores = [res, ...stores];
      dispatch(setStore(createSrores));
    } catch(err) {
      alert(err);
    }
  }


  return (
    <Box sx={{ mt: "80px" }}>
       <ListItemButton onClick={() => addStore()}>
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
      {stores.map((item, index) => (
        <ListItemButton
          key={item._id}
          selected={index === activeIndex}
          cpmponent={Link}
          sx={{ pl: "20px" }}
          to={`/adminstore/${item._id}`}
          >
            <Typography >
            {item.title}
            </Typography>
        </ListItemButton>
      ))}
    </Box>

    )
  }

export default AdminHome
