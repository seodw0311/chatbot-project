import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(query);
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>AIRCHAT</h1>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
              <div>
                <form onSubmit={handleSearch}>
                  <label></label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="무엇이든 물어보세요"
                  />
                  <button type="submit"></button>
                </form>            
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
