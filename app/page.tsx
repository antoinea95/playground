import { ChallengeCard } from "./components/challenge/ChallengeCard";
import styles from "./page.module.scss";

const challenges = [
  { pathname: "/dockbar", name: "The Mac Dockbar.", videoSrc: "/dockbar/dockbar_demo.mp4" },
  { pathname: "/looping-words", name: "Looping Words.", videoSrc: "/looping/looping_demo.mp4" },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <section>
        <h1 className={styles["home--title"]}>Welcome to my playground.</h1>
        <p className={styles["home--intro"]}>
          A collection of {`"little"`} challenges 🎨✨! I love experimenting, refining my skills, and recreating eye-catching effects and animations
          that inspire me. Each project is a step forward, a playground for creativity and technique. Take a look around—you might find something that
          sparks your curiosity! 🚀 If you’d like to connect, discuss a project, or just say hi, feel free to reach out! Looking forward to chatting
          with you! 👋
        </p>
      </section>
      <section className={styles["home--challenges"]}>
        {challenges.map((challenge) => (
          <ChallengeCard challenge={challenge} key={challenge.pathname} />
        ))}
      </section>
    </main>
  );
}
