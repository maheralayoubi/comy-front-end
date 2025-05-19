"use client";
import * as React from "react";
import styles from "./styles/RejectionCard.module.scss";
const EventCard = ({ title, time, logoSrc, iconSrc, backgroundSrc }) => {
  return (
    <article className={styles.eventCard}>
      <div className={styles.eventCardContent}>
        <img
          src={backgroundSrc}
          alt="Event background"
          className={styles.eventBackground}
        />
        <div className={styles.eventDetails}>
          <img
            src={logoSrc}
            alt="Event logo"
            className={styles.eventLogo}
          />
          <img
            src={iconSrc}
            alt="Event icon"
            className={styles.eventIcon}
          />
        </div>
        <h3 className={styles.eventTitle}>{title}</h3>
        <time className={styles.eventTime}>{time}</time>
      </div>
    </article>
  );
};
export default EventCard;
