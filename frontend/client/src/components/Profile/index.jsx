import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Profile = () => {

 const user = JSON.parse(localStorage.getItem("user"));

  return (
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <img
            src="https://i.pinimg.com/564x/68/87/87/6887875f9fe29c98dd9960d97262aa92.jpg"
            width="200"
            height="200"
          ></img>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
        </div>
        <div className={styles.right}>
          <div>My Profile</div>
        </div>
    </div>
  );
};

export default Profile;
