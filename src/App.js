import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./layouts/main/Main";
import { useState } from 'react';
import { UserContext } from './pages/auth/UserContext';
import jwt_decode from "jwt-decode";

function App() {
  let [user, setUser] = useState(()=> localStorage.getItem('access_token') ? jwt_decode(localStorage.getItem('access_token')) : null);
  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Main />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
