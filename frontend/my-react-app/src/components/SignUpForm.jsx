import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const data = { email, password };

    // API 호출 (Node.js backend)
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert(resData.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        <Link to="/">AIRCHAT</Link>
      </h1>
      <h2>회원가입</h2>
      <div id="g_id_onload"
          data-client_id="139542295275-f44016fbfbvudafl0a89s2or0kab3h96.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleCredentialResponse"
          data-auto_prompt="false">
      </div>

      <div class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="continue_with"
          data-size="large"
          data-locale="ko"
          data-logo_alignment="left">
      </div>      
      <div>
        <label>이메일:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">가입하기</button>
    </form>
  );
}

export default SignUpForm;
