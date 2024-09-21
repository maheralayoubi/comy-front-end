import "./styles/Cards.scss";
import { useEffect, useState } from "react";

export const CardTitle = ({ title, theme }) => {
  return (
    <div
      className="cardTitle"
      style={{ backgroundColor: theme ? theme : "#aaa" }}
    >
      {title}
    </div>
  );
};

export const Card = ({ title, data, theme }) => {
  return (
    <div className="card">
      <CardTitle title={title} theme={theme} />
      <pre className="cardContent">
        {data || <span className="no-content">データがありません</span>}
      </pre>
    </div>
  );
};

export const ChildCard = ({ title, data }) => {
  const [showMore, setShowMore] = useState(0);
  const [lines, setlLines] = useState(0);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (showMore) setlLines(data.split("\n").length);
    else setlLines(4);
  }, [showMore, data]);

  return (
    <div className="ChildCard">
      <span className="title">{title}</span>
      <pre
        className="cardContent"
        style={{ WebkitLineClamp: lines, lineClamp: lines }}
      >
        {data || "データがありません"}
      </pre>
      <div className="showMore" onClick={toggleShowMore}>
        <img
          style={{ rotate: `${180 * !showMore}deg` }}
          src="/images/arrow.png"
          alt="arrow"
        />
        <span>一部を表示</span>
      </div>
    </div>
  );
};