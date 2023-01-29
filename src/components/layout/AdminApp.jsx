import { Box, Container } from '@mui/system';
import React from 'react'
import { Outlet, } from "react-router-dom";
import AdminSideber from '../common/AdminSideber';



function AdminAppLayout() {

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AdminSideber/>
        <Box sx={{flexGrow: 1,p: 1, width: "max-content"}}>
          <Outlet/>

        </Box>
      </Box>
    </div>
  )
}

export default AdminAppLayout;
