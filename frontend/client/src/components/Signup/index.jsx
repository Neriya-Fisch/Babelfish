import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		language: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
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

	let languages_map = {
		"english": "en",
		"afrikaans" : "af",
		"albanian" : "sq",
		"amharic" : "am",
		"arabic": "ar",
		"armenian" : "hy",
		"azerbaijani" : "az",
		"basque" : "eu",
		"belarusian" : "be",
		"bengali" : "bn",
		"bosnian" : "bs",
		"bulgarian" : "bg",
		"catalan" : "ca",
		"cebuano" : "ceb",
		"chichewa" : "ny",
		"chinese (simplified)" : "zh-cn",
		"chinese (traditional)" : "zh-tw",
		"corsican" : "co",
		"croatian" : "hr",
		"czech" : "cs",
		"danish" : "da",
		"dutch" : "nl",
		"esperanto" : "eo",
		"estonian" : "et",
		"filipino" : "tl",
		"finnish" : "fi",
		"french" : "fr",
		"frisian" : "fy",
		"galician" : "gl",
		"georgian" : "ka",
		"german" : "de",
		"greek" : "el",
		"gujarati" : "gu",
		"haitian creole" : "ht",
		"hausa" : "ha",
		"hawaiian" : "haw",
		"hebrew" : "he",
		"hindi" : "hi",
		"hmong" : "hmn",
		"hungarian" : "hu",
		"icelandic" : "is",
		"igbo" : "ig",
		"indonesian" : "id",
		"irish" : "ga",
		"italian" : "it",
		"japanese" : "ja",
		"javanese" : "jw",
		"kannada" : "kn",
		"kazakh" : "kk",
		"khmer" : "km",
		"korean" : "ko",
		"kurdish (kurmanji)" : "ku",
		"kyrgyz" : "ky",
		"lao" : "lo",
		"latin" : "la",
		"latvian" : "lv",
		"lithuanian" : "lt",
		"luxembourgish" : "lb",
		"macedonian" : "mk",
		"malagasy" : "mg",
		"malay" : "ms",
		"malayalam" : "ml",
		"maltese" : "mt",
		"maori" : "mi",
		"marathi" : "mr",
		"mongolian" : "mn",
		"myanmar (burmese)":'my',
		"nepali":'ne',
		"norwegian":'no',
		"odia":'or',
		"pashto":'ps',
		"persian":'fa',
		"polish":'pl',
		"portuguese":'pt',
		"punjabi":'pa', 
		"romanian":'ro',
		"russian":'ru',
		"samoan":'sm',
		"scots gaelic":'gd',
		"serbian":'sr',
		"sesotho":'st',
		"shona":'sn',
		"sindhi":'sd',
		"sinhala":'si',
		"slovak":'sk',
		"slovenian":'sl',
		"somali":'so',
		"spanish":'es',
		"sundanese":'su',
		"swahili":'sw',
		"swedish":'sv',
		"tajik":'tg',
		"tamil":'ta',
		"telugu":'te',
		"thai":'th',
		"turkish":'tr',
		"ukrainian":'uk',
		"urdu":'ur',
		"uyghur":'ug', 
		"uzbek":'uz',
		"vietnamese":'vi',
		"welsh":'cy', 
		"xhosa":'xh',
		"yiddish":'yi',
		"yoruba":'yo',
		"zulu":'zu'
	}
	let items = Object.keys(languages_map);

	let optionItems = items.map((item) => <option key={item}>{item}</option>);



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
							value={data.language}
							required
							className={styles.input}
							>{optionItems}
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