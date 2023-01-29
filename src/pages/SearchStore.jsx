import React from 'react'
import { useState } from "react";
import { Box } from '@mui/system'
import PlaceSearchButton from "../components/Atoms/StoreSreach";
import LoadingArea from "../components/Atoms/Loading";
import { GetNearStore }  from "../assets/GetNearStore";


function SearchStore() {
  const [loading, setloading] = useState(false);
  const [ShowStore, setShowStore] = useState(false);
  const searchStores = () => {
    setShowStore(true);
  };

  return (
    <div className="App">
      <div className="show-place-button-area">
        <Box sx={{
          mt: "80px",
          display: "flex",
          alignItems: "center",
          width: "100∞",
        }}>
        <PlaceSearchButton onClick={() => searchStores()} />
        </Box>
        <div>
          <GetNearStore ShowStore={ShowStore} setLoading={setloading} />
        </div>
      </div>

      <LoadingArea loading={loading} />
    </div>
  )
}

export default SearchStore
