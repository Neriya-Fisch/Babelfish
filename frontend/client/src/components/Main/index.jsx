import styles from "./styles.module.css";

const Main = () => {
	const user = localStorage.getItem("user");
	console.log(user)

	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;
