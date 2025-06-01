import React, { useEffect } from "react";
import styles from "./styles/RejectionCard.module.scss";
import './styles/RejectionMessage.scss';

const RejectionSection = ({ messages = [], images = [] }) => {
  useEffect(() => {
    console.log("✅ RejectionSection loaded");
    console.log("📨 messages:", messages);
    console.log("🖼️ images:", images);
  }, [messages, images]);

  return (
    <article className={styles.messageContainer}>
      <div className="frame-1">
        <div className="div">
          {messages.map((msg, index) => (
            <div className="div-wrapper" key={index}>
              <div className="text-wrapper-3">{msg}</div>
            </div>
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <div className={styles.eventCardsContainer}>
          {images.map((img, idx) => (
            <a
              key={idx}
              href={img.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.eventCard}
            >
              <img
                src={img.imageUrl}
                alt={`event-${idx}`}
                className={styles.eventCardImage}
              />
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

export default RejectionSection;
