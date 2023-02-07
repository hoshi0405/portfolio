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
  const [title, setTitele] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const favoriteStores = useSelector((state) => state.favorites.value);


  const containerStyle = {
  width: "auto",
  height: "400px",
};

  useEffect(() => {
    const getstore = async () => {
      try {
        const res = await storeApi.getOne(storeId);
        setTitele(res.title)
        setLatitude(res.latitude)
        setIsFavorite(res.favorite);
        setLongitude(res.longitude)
      } catch (err) {
        alert(err)
      }
    };
    getstore();
  }, [storeId]);




  const addFavorite = async () => {
    try {
      const store = await storeApi.update(storeId, { favorite: !isFavorite });

      let newFavoriteStores = [...favoriteStores];
      if (isFavorite) {
        newFavoriteStores = newFavoriteStores.filter((e) => e.id !== storeId);
      } else {
        //これが消えない。お気に入りに移動してほしい。
        newFavoriteStores.unshift(store);
      }
      dispatch(setFavoriteList(newFavoriteStores));
      setIsFavorite(!isFavorite);
    } catch (err) {
      alert(err);
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

      <IconButton onClick={addFavorite} variant="outlined">
        {isFavorite ? (
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
