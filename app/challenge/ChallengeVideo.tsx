import styles from "./challenge.module.scss";

const ChallengeVideo = ({videoSrc}: {videoSrc: string}) => {

    return (
        <div className={styles["challenge--video"]}>
        <video width="auto" height="auto" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
}

export default ChallengeVideo;