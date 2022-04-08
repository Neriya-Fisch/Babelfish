import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChatBox from "./components/Chat/ChatBox.js";


function App() {
	const user = localStorage.getItem("token");
	console.log(user)
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/ChatBox" exact element={<ChatBox />} />
			<Route path="/" element={<Navigate replace to="/login" />} />

		</Routes>
	);
}

export default App;
