// backend/googleAuth.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// 구글 로그인 요청
router.get("/google/login", (req, res) => {
  const authURL = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authURL.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
  authURL.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI);
  authURL.searchParams.set("response_type", "code");
  authURL.searchParams.set("scope", "email profile openid");

  // 구글 로그인 페이지로 리다이렉트
  res.redirect(authURL.toString());
});

// 콜백 처리
router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    // access_token 요청
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const accessToken = tokenRes.data.access_token;

    // 사용자 정보 요청
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });


    // 로그인 성공 후 프론트엔드로 리다이렉트
    const redirectUrl = `${process.env.FRONT_ORIGIN}/login-success?name=${encodeURIComponent(
      userRes.data.name
    )}`;
    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).send("Google OAuth Error");
  }
});

module.exports = router;
