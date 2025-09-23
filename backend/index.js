// 필요한 모듈 import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // db.js 연결

// 서버 생성
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors()); // React에서 요청 가능하도록 허용
app.use(bodyParser.json()); // JSON 데이터 파싱

// 회원가입 API
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  // MySQL 쿼리
  const sql = `INSERT INTO USERS (USERNAME, EMAIL, USER_PW) VALUES (?, ?, ?)`;
  db.query(sql, [username, email, password], (err, result) => {
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
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND user_pw = ?";
  db.query(sql, [username, password], (err, results) => {
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



// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
