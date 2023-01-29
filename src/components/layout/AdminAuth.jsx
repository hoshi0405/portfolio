import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import ramenLogo from "../../assets/images/ramen_moyashi.png";
import adminAuthUtils from '../../utils/adminAuthUtils';

function AdminAuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    // JWTを持っているのか？
    const cheakAuth = async () => {
      // 認証チェック
      const isAuth = await adminAuthUtils.isAutenticated();
      if (isAuth) {
        navigate("/adminhome");
      }
    };
    cheakAuth();
  },[navigate])
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box  sx={{
          mt: "80px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>

          <img src={ramenLogo} alt="ラーメンロゴ"
          　style={{width:100, height: 100, marginBottom: 3}}
          />
          管理者画面
        </Box>
         <Outlet/>
      </Container>
    </div>
  )
}

export default AdminAuthLayout
