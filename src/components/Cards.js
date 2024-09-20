import "./styles/Cards.scss"
import { useState } from "react"

export const SectionTitle = ({ title, theme }) => {
    return (
        <div className="sectionTitle" style={{ backgroundColor: theme ? theme : "#aaa" }}>
            {title}
        </div>
    )
}

export const CardTitle = ({ title, theme, name }) => {
    return (
        <div className="cardTitle" style={{ backgroundColor: theme ? theme : "#aaa" }}>
            <img src={`/images/${name}.png`} alt={name} />
            <p>{title}</p>
        </div>
    )
}

export const CardData = ({ rank, data }) => {
    return (
        <div className="valueContainer">
            {rank && <img src={`/images/rank${rank}.png`} alt={`rank${rank}`} />}
            <p>{data ? data : "データがありません"}</p>
        </div>
    )
}

export const Card = ({ title, data, theme }) => {
    const lines = data?.split('\n');

    return (
        <div className="card">
            <SectionTitle title={title} theme={theme} />
            <div className="cardContent">
                {data ?
                    lines.map((item, index) =>
                        <p key={index}>{item}</p>
                    )
                    : <span className="no-content">データがありません</span>}
            </div>
        </div >
    )
}


export const ChildCard = ({ title, data }) => {
    const [showMore, setShowMore] = useState(0);
    const lines = data?.split('\n');

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    return (
        <div className="ChildCard">
            <span className="title">{title}</span>
            <div className="cardContent" style={showMore ? {} : { "WebkitLineClamp": 4, "lineClamp": 4 }}>
                {data ?
                    lines.map((item, index) =>
                        <p key={index}>{item}</p>
                    )
                    : <span className="no-content">データがありません</span>}
            </div>
            {data && <div className="showMore" onClick={toggleShowMore}>
                <img style={{ rotate: `${180 * !showMore}deg` }} src="/images/arrow.png" alt="arrow" />
                <span>一部を表示</span>
            </div>}
        </div >
    )
}
