import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import languages_map from "../../Data/languages.json";
import countries from "../../Data/countries.json";

const Signup = () => {
	const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    language: "",
		country: "",
    password: "",
    'Account Type': "",
  });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(data);
			const url = "http://localhost:3001/api/users";
			data.language = languages_map[data.language];
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	let languages_dropdown = Object.keys(languages_map).map((item) => (
    <option key={item}>{item}</option>
  ));

	let countries_dropdown = countries.map((item) => (
    <option key={item}>{item}</option>
  ));


	return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <select
              name="language"
              onChange={handleChange}
              required
              className={styles.input}
            >
              {languages_dropdown}
            </select>
            <select
              name="country"
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option> Country</option>
              {countries_dropdown}
            </select>
            <select
              name="Account Type"
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option> Account Type</option>
              <option> Business</option>
              <option> Private</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;