import { useState } from "react";
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // local 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message); // "로그인 성공" or "로그인 실패"
  };
  
  //naver 로그인
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:3000/naver/login";
  };

  return (
      <form onSubmit={handleSubmit}>
        <h1>
            <Link to="/">AIRCHAT</Link>
        </h1>
        <h2>로그인</h2>
      <input 
        type="email" 
        placeholder="이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">로그인</button>
      
      {/* 소셜 로그인 구분선 */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>또는</div>

      {/* 네이버 로그인 버튼 */}
      <button
        type="button"
        onClick={handleNaverLogin}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#03c75a",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          border: "none",
          borderRadius: "4px",
          padding: "10px 16px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <img
          src="https://static.nid.naver.com/oauth/small_g_in.PNG"
          alt="naver"
          style={{ marginRight: "8px", height: "20px" }}
        />
        네이버로 로그인
      </button>
    </form>
  );
}

export default LoginForm;
