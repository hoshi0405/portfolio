import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import storeApi from "../api/storeApi";
import { setFavoriteList } from "../redux/features/favoriteSlice";
import { useParams, Link } from "react-router-dom";
import { Box, ListItemButton, Typography } from "@mui/material";

const Favorite = () => {
  const [activeItem, setActiveIndex] = useState(0);
  const dispatch = useDispatch()
  const stores = useSelector((state) => state.favorites.value);
  const { storeId } = useParams()

  useEffect(() => {
    const getStores = async () => {
      try {
        const res = await storeApi.getFavorites();
        dispatch(setFavoriteList(res));
      } catch (err) {
        console.log(err);
      }
    };
    getStores()
   }, []);

  useEffect(() => {
    const index = stores.findIndex((e) => e._id === storeId);
    setActiveIndex(index)
  }, [storeId])

  return (
     <>
        <Box
          sx={{
            mt: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent:"space-between",
            width: "100",
          }}
        >
          <p>お気に入りの店舗</p>
        </Box>
      {stores.map((item) => (
        <ListItemButton
          component={Link}
          to={`/store/${item._id}`}
          sx={{
            pl: "20px",
          }}
        >
          <Typography
            variant="body2"
            fontWeight="700"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </Typography>
        </ListItemButton>

      ))}
    </>
   );
}

export default Favorite;
