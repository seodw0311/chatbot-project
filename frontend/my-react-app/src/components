import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input 
        type="text" 
        placeholder="이메일" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
