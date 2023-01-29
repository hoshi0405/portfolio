import {ListItemButton, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import adminStoreApi from '../api/adminStoreApi';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from "../redux/features/storeSlice";
import DeletOutlinedIcon from "@mui/icons-material/DeleteOutlined"


function AdminStore() {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const [title, setTitele] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const stores = useSelector((state) => state.store.value);
   const navigate = useNavigate();




  useEffect(() => {
    const getstore = async () => {
      try {
        const res = await adminStoreApi.getOne(storeId);

        setTitele(res.title)
        setLatitude(res.latitude)
        setLongitude(res.longitude)
      } catch (err) {
        alert(err)
      }
    };
    getstore();
  }, [storeId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitele(newTitle);
    timer = setTimeout(async () => {
    try {
      await adminStoreApi.update(storeId, {title: newTitle})
    } catch(err) {
      alert(err);
    }
    }, timeout)
  }

  const updateLongitude = async (e) => {
    clearTimeout(timer);
    const newLongitude = e.target.value;
    setLongitude(newLongitude);

    timer = setTimeout(async () => {
    try {
      await adminStoreApi.update(storeId, {longitude: newLongitude})
    } catch(err) {
      alert(err);
    }
    }, timeout)
  }


  const updateLatitude= async (e) => {
    clearTimeout(timer);
    const newLatitude= e.target.value;
    setLatitude(newLatitude);

    timer = setTimeout(async () => {
    try {
      await adminStoreApi.update(storeId, {latitude: newLatitude})
    } catch(err) {
      alert(err);
    }
    }, timeout)
  }

  //メモアプリの名残
  const deleteStore = async () => {
    try {
      const deletedStore = await adminStoreApi.delete(storeId);
      console.log(deletedStore);
      const newStores = stores.filter((e) => e._id !== storeId);
      if (newStores.length === 0) {
        navigate("/adminstore")
      } else {
        navigate(`/adminstore/${newStores[0]._id}`);
      }
      dispatch(setStore(newStores));
    } catch (err){
      alert(err)
    }
  }

  return (
    <>
    <Box sx={{
          mt: "80px",
          display: "flex",
          alignItems: "center",
          width: "100∞",
        }}>
      </Box>
        <IconButton variant="outlined" color="error" onClick={deleteStore}>
          <DeletOutlinedIcon/>
        </IconButton>
        <Box sx={{
          paddingX: "10px 50px"
        }}>
          <Box>
            <TextField
              onChange={updateTitle}
              value={title}
              placeholder="無題" variant="outlined" fullWidth sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              }} />

            <TextField
              onChange={updateLatitude}
              value={latitude}
              placeholder="緯度"
              variant="outlined" fullWidth
              sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              }} />

            <TextField
              onChange={updateLongitude}
              value={longitude}
              placeholder="軽度"
              variant="outlined" fullWidth
              sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              }} />
            <ListItemButton　cpmponent={Link}　to={`/adminstore`}>
            <Typography variant="body2" fontWeight="700">
                戻る
              </Typography>
            </ListItemButton>
        </Box>
      </Box>
    </>
  )
}

export default AdminStore
