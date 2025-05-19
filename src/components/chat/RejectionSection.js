import React from "react";
import styles from "./styles/RejectionCard.module.scss";
import RejectionEventCard from './RejectionEventCard';
import './styles/RejectionMessage.scss';
import photo from '../../assets/images/photo.png';
import LogoComy from '../../assets/images/Logocomy.png';
import Logo from '../../assets/images/COMY-favicon_48_48.svg';

const RejectionSection = ({ messages = [] }) => {
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

      <div className={styles.eventCardsContainer}>
        <RejectionEventCard
          title="ビジネスシート勉強会"
          time="毎週月曜日の21:00~22:00"
          backgroundSrc={photo}
          logoSrc={LogoComy}
          iconSrc={Logo}
        />
        <RejectionEventCard
          title="交流会"
          time="毎週月曜日の 20:00~21:00"
          backgroundSrc={photo}
          logoSrc={LogoComy}
          iconSrc={Logo}
        />
      </div>
    </article>
  );
};

export default RejectionSection;
