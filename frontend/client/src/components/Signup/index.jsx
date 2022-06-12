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
    gender: "",
    language: "",
    country: "",
    password: "",
    "Account Type": "",
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
      const url = "https://babel-fish-1.herokuapp.com/api/users";
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
            <div class="row" style={{ "column-gap": "30px" }}>
              <input
                class="column"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                class="column"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
            </div>
            <br></br>
            <div class="row" style={{ "column-gap": "30px" }}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
            </div>
            <br></br>
            <div class="row" style={{ "column-gap": "30px" }}>
              <select
                name="gender"
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option key="null">Gender</option>
                <option key="male">Male</option>
                <option key="female">Female</option>
              </select>
              <select
                name="language"
                onChange={handleChange}
                required
                className={styles.input}
              >
                {languages_dropdown}
              </select>
            </div>
            <br></br>
            <div class="row" style={{ "column-gap": "30px" }}>
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
            </div>
            <br></br>
            <div class="row" style={{ "column-gap": "30px" }}>
              <label
                for="pic"
                className={styles.input}
                style={{ "text-align": "center"}}
              >
                Uplode profile picture
              </label>
              <input type="file" id="pic" hidden="true" />
            </div>

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
