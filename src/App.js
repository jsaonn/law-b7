import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./layouts/main/Main";
import { useState } from 'react';
import { UserContext } from './pages/auth/UserContext';

function App() {
  let [user, setUser] = useState(()=> localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <Main />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
