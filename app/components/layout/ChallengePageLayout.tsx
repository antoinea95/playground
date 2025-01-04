"use client";
import { PropsWithChildren } from "react";
import styles from "./challengePageLayout.module.scss";
import Link from "next/link";

export const ChallengePageLayout = ({
  title,
  number,
  date,
  url,
  inspiration,
  children,
}: PropsWithChildren<{ title: string; number: number; date: string; url: string; inspiration: string }>) => {
  return (
    <main className={styles["challenge--page"]}>
      <header className={styles["challenge--page__header"]}>
        <h1>{title}</h1>
        <p>n° 00{number}</p>
      </header>
      <section className={styles["challenge--page__container"]}>{children}</section>
      <footer className={styles["challenge--page__footer"]}>
        <p>
          Inspiration: <Link href={url} target="_blank">{inspiration}</Link>
        </p>
        <p>{date}</p>
      </footer>
    </main>
  );
};
