import languages_map from "../../Data/languages.json";
import styles from "./profile.css";
import generic_male from "../../Images/generic male.jpg";
import generic_female from "../../Images/generic female.jpg";

function getMapKey(map, value){
  return Object.keys(map).find((key) => map[key] === value);
}

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={styles.login_form_container}>
      <div className={styles.left}>
        <div className={styles.img_container}>
          {user.gender === "Male" ? (
            <div className={styles.img}>
              <img
                src={generic_male}
                width={230}
                height={230}
                justify="center"
              ></img>
            </div>
          ) : (
            <div className={styles.img}>
              <img
                src={generic_female}
                width={230}
                height={230}
                justify="center"
              ></img>
            </div>
          )}
          <br></br>
          <h2 style={{color: 'white'}}>
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>
      <div className={styles.right}>
        <div class="card-body">
          <div class="row" style={{ height: "auto" }}>
            <div class="col-sm-3">
              <h3 class="mb-0">Email</h3>
            </div>
            <div class="col-sm-9 text-secondary">{user.email}</div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-sm-3">
              <h3 class="mb-0">Language</h3>
            </div>
            <div class="col-sm-9 text-secondary">
              {getMapKey(languages_map, user.language)}
            </div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-sm-3">
              <h3 class="mb-0">Country</h3>
            </div>
            <div class="col-sm-9 text-secondary">{user.country}</div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-sm-3">
              <h3 class="mb-0">Gender</h3>
            </div>
            <div class="col-sm-9 text-secondary">{user.gender}</div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-sm-3">
              <h3 class="mb-0">Account Type</h3>
            </div>
            <div class="col-sm-9 text-secondary">{user["Account Type"]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
