import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import generic_male from "../../Images/generic male.jpg";
import generic_female from "../../Images/generic female.jpg";

const Profile = () => {

 const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.login_form_container}>
      <div className={styles.left}>
        {user.gender == "Male" ? (
          <img src={generic_male} width={230} height={230}></img>
        ) : (
          <div className = {styles.img}>
            <img src={generic_female} width={230} height={230}></img>
            </div>
        )}
        <br></br>
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
