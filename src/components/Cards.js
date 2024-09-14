import "./styles/Cards.scss"


export const CardTitle = ({ title, theme }) => {
    return (
        <div className="cardTitle" style={{ backgroundColor: theme ? theme : "#aaa" }}>
            {title}
        </div>
    )
}


export const Card = ({ title, data, theme }) => {
    return (
        <div className="card">
            <CardTitle title={title} theme={theme} />
            <pre className="cardContent">
                {data || <span className="no-content">データがありません</span>}
            </pre>
        </div >
    )
}


export const ChildCard = ({ title, data }) => {
    return (
        <div className="ChildCard">
            <span className="title">{title}</span>
            <pre className="cardContent">
                {data || "データがありません"}
            </pre>
        </div >
    )
}
