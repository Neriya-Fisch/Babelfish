import styles from "./about.css";
import logo from "../../Images/BabelFish.jpg";

const About = () => {
  return (
    <div class="container">
      <br></br>
      <br></br>
      <h1> We Are BabelFish!</h1>
      <h2>
        Providing you Real Time simultaneous translation between languages
        Application.
      </h2>
      <br></br>
      <div className="h4_container">
        <h4 className={styles.h4}>
          At BabelFish, we want to ease the way you talk to other people around
          the world. Today, the world is a small global village. People travel
          everywhere, talk through their screen to the other side of the world
          with a click. Not everyone speaks English well or at all, and even
          those do, they prefer to talk with their native language. BabelFish
          solves this problem. Our product is a real time translator between
          languages that allows you both type or record messages with your
          native language, so your partner will recieve them in his native
          language, and vice versa.
        </h4>
      </div>
    </div>
  );
};
export default About;
