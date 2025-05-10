import React from "react";
import styles from "./styles/RejectionCard.module.scss";
import RejectionEventCard from './RejectionEventCard';
import './styles/RejectionMessage.scss';
import photo from '../../assets/images/photo.png'
import LogoComy from '../../assets/images/Logocomy.png'
import Logo from '../../assets/images/COMY-favicon_48_48.svg'
const RejectionSection = () => {
  return (
    <article className={styles.messageContainer}>
      <div className="frame-1">
        <div className="div">
          <div className="div-wrapper">
            <div className="text-wrapper-3">
              マッチングを却下しました。田中さんのビジネスに合ったマッチングをご希望の場合は、ビジネスシートのブラッシュアップをしてください。
            </div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper-3">
              お手伝いが必要な場合は是非月曜日の21:00からのビジネスシートアップデート勉強会にご参加ください。
            </div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper-3">
              月曜日の20:00と水曜日の11:00からオンラインでの交流会も行っているのでそちらもご利用ください。
            </div>
          </div>
        </div>
      </div>
      <div className={styles.eventCardsContainer}>
        <RejectionEventCard
          title="ビジネスシート勉強会"
          time="毎週月曜日の21:00~22:00"
          backgroundSrc = {photo}
          logoSrc= {LogoComy}
          iconSrc= {Logo}
        />
        <RejectionEventCard
          title="交流会"
          time="毎週月曜日の 20:00~21:00"
          backgroundSrc= {photo}
          logoSrc= {LogoComy}
          iconSrc= {Logo}
        />
      </div>
    </article>
  );
};

export default RejectionSection;

