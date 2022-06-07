import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Chat from "./components/Chat/Chat.js";
import NavbarComp from "./components/NavbarComp";
import Profile from "./components/Profile";
import About from "./components/About";

function App() {
  const user = localStorage.getItem("user");
  return (
    <div className="App">
      { user && <NavbarComp />}

      <Routes>
        {user && <Route path="/" exact element={<Chat />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/chat/:reciverId" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
