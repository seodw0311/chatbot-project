// naverAuth.js (CommonJS 버전)
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");


console.log("✅ naverAuth.js 로드됨"); // ← 파일 불러와질 때 찍힘

const router = express.Router();
router.use(cookieParser());

router.get("/naver/login", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.cookie("naver_oauth_state", state, { httpOnly: true, sameSite: "lax" });

  const authURL = new URL("https://nid.naver.com/oauth2.0/authorize");
  authURL.searchParams.set("response_type", "code");
  authURL.searchParams.set("client_id", process.env.NAVER_CLIENT_ID);
  authURL.searchParams.set("redirect_uri", process.env.NAVER_REDIRECT_URI);
  authURL.searchParams.set("state", state);
  console.log("👉 네이버 요청 URL:", authURL.toString());

  res.redirect(authURL.toString());
});

router.get("/naver/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const stateCookie = req.cookies?.naver_oauth_state;
    if (!stateCookie || stateCookie !== state) {
      return res.status(400).send("Invalid state");
    }

    const tokenRes = await axios.get("https://nid.naver.com/oauth2.0/token", {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        code,
        state,
      },
    });
    const { access_token } = tokenRes.data;

    const profileRes = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const p = profileRes.data.response;

    res.redirect(
      `${process.env.FRONT_ORIGIN}/login?naver=success&email=${encodeURIComponent(
        p.email || ""
      )}`
    );
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.redirect(`${process.env.FRONT_ORIGIN}/login?naver=error`);
  }
});

module.exports = router; // ✅ CommonJS 내보내기
