require('dotenv').config();

console.log("✅ NAVER_CLIENT_ID:", process.env.NAVER_CLIENT_ID);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); 
const naverAuthRouter = require("./naverAuth"); // ✅ 여기서 naverAuth.js 불러옴

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 네이버 로그인 라우터 등록
app.use("/", naverAuthRouter);
console.log("✅ Naver Auth Router loaded");

// 회원가입 API
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO USERS (EMAIL, USER_PW) VALUES (?, ?)`;
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '회원가입 실패' });
    } else {
      res.json({ message: '회원가입 성공!' });
    }
  });
});

// 로그인 API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND user_pw = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB 오류" });
    }
    if (results.length > 0) {
      res.json({ message: "로그인 성공" });
    } else {
      res.json({ message: "로그인 실패: 아이디 또는 비밀번호가 틀렸습니다" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
