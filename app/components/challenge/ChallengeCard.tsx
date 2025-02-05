import Link from "next/link";
import styles from "./challenge.module.scss";
import ChallengeVideo from "./ChallengeVideo";

export const ChallengeCard = ({ challenge }: { challenge: { pathname: string; name: string; videoSrc: string } }) => {
  return (
    <Link href={challenge.pathname} className={styles.challenge}>
      <section className={styles["challenge--container"]}>
        <ChallengeVideo videoSrc={challenge.videoSrc} />
        <h2>{challenge.name}</h2>
      </section>
    </Link>
  );
};
