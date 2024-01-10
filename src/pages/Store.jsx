import {ListItemButton, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import SterBoderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import React, { useEffect, useState } from 'react'
import { Link, useParams, } from 'react-router-dom';
import storeApi from '../api/storeApi';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript,  Marker } from "@react-google-maps/api";
import { setFavoriteList } from "../redux/features/favoriteSlice";
import StarIcon from "@mui/icons-material/Star";



function Store() {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isFavorite, setIsFavorite] = useState([]);
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const favoriteStores = useSelector((state) => state.favorites.value);
  const user = useSelector((state) => state.user.value);
  const userId = user?._id;


  const containerStyle = {
  width: "auto",
  height: "600%",
};

  useEffect(() => {
    const getstore = async () => {
      try {
        const res = await storeApi.getOne(storeId);
        setTitle(res.title);
        setIsFavorite(res.favorite);
        setLatitude(res.latitude);
        setLongitude(res.longitude);
      } catch (err) {
        alert(err)
      }
    };
    getstore();
  }, [storeId]);


const handleFavorite = async () => {
  try {
    let newFavoriteStores = [...favoriteStores];
      await new Promise((resolve) => setTimeout(resolve, 500));
      await storeApi.favorite(storeId);

    // 非同期処理が完了したら状態を更新
    if (isFavorite.includes(userId)) {
      setIsFavorite([]);
    } else {
      setIsFavorite(userId);
    }

    dispatch(setFavoriteList(newFavoriteStores));
    } catch (err) {
      console.log(err);
    }
};


  return (
    <>
    <Box sx={{
          mt: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          width: "100∞",
        }}>

      <IconButton onClick={handleFavorite} variant="outlined">
        {isFavorite.includes(userId) ? (
          <StarIcon color="warning" />
          ) : (
           <SterBoderOutlinedIcon />
            )}
      </IconButton>
      <Typography>{title}</Typography>

      <ListItemButton cpmponent={Link} to={`/store`}>
        <Typography variant="body2" fontWeight="700">
           戻る
        </Typography>
     </ListItemButton>
   </Box>
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat: +latitude, lng: + longitude}} zoom={19}>
        <Marker position={ {lat: +latitude, lng: + longitude } }/>
      </GoogleMap>
    </LoadScript>
    </>
  )
}

export default Store
