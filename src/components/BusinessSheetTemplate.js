import "./styles/BusinessSheetTemplate.scss"
import { Card, CardTitle, ChildCard } from "./Cards"

const BusinessSheetTemplate = ({ data }) => {

    const userName = "佐野真吾（さの しんご）"

    return (
        <div className="BusinessSheet">
            <img src="/images/cover.png" alt="cover" />

            <div className="profile">
                <img src="/images/profile.png" alt="cover" />
                <h1 className="userName">{userName}</h1>
            </div>

            <div className="businessSheetData-s1">

                <div className="left">
                    <Card title={"メンバー略歴シート"} data={data.memberBiography} theme={data.themeColor} />
                    <Card title={"ビジネスについて"} data={data.aboutBusiness} theme={data.themeColor} />
                    <Card title={"個人的な情報"} data={data.personalInformation} theme={data.themeColor} />
                </div>

                <div className="right">
                    <CardTitle title={"GAINSワークシート"} theme={data.themeColor} />
                    <ChildCard title={"Goals / 目標"} data={data.goals} />
                    <ChildCard title={"Accomplishment / 実績"} data={data.achievements} />
                    <ChildCard title={"Interests / 興味・関心"} data={data.interests} />
                    <ChildCard title={"Networks / 人脈"} data={data.networks} />
                    <ChildCard title={"Skills / 能力"} data={data.skills} />
                </div>
            </div>

            <div className="businessSheetData-s2">
                {/* <img src="/images/cover.png" alt="cover" /> */}
                <div>

                </div>
            </div>


        </div>




    )
}

export default BusinessSheetTemplate