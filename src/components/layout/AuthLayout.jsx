import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import ramenLogo from "../../assets/images/ramen_moyashi.png";
import authUtils from '../../utils/authUils';

function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    // JWTを持っているのか？
    const cheakAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAutenticated();
      if (isAuth) {
        navigate("/store");
      }
    };
    cheakAuth();
  },[navigate])
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box  sx={{
          marginTop: 6,
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>

          <img src={ramenLogo} alt="ラーメンロゴ"
          　style={{width:100, height: 100, marginBottom: 3}}
          />
          二郎サーチャー
        </Box>
         <Outlet/>
      </Container>
    </div>
  )
}

export default AuthLayout
