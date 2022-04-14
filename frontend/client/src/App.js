import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Chat from "./components/Chat/Chat.js";


function App() {
	const user = localStorage.getItem("user");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Chat />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/chat/:reciverId" element={<Chat />} />
		
		</Routes>
	);
}

export default App;
