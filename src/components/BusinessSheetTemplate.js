import "./styles/BusinessSheetTemplate.scss"
import { Card, CardTitle, ChildCard, SectionTitle, CardData } from "./Cards"

const BusinessSheetTemplate = ({ data }) => {

  const userName = "佐野真吾（さの しんご）"

  return (
    <div className="BusinessSheet">
      <img src={data?.coverImage} alt="cover" />

      <div className="profile">
        <img src={data?.profileImage} alt="profile" />
        <h1 className="userName">{userName}</h1>
      </div>

      <div className="businessSheetData-s1">

        <div className="left">
          <Card title={"メンバー略歴シート"} data={data?.memberBiography} theme={data?.themeColor} />
          <Card title={"ビジネスについて"} data={data?.aboutBusiness} theme={data?.themeColor} />
          <Card title={"個人的な情報"} data={data?.personalInformation} theme={data?.themeColor} />
        </div>

        <div className="right">
          <SectionTitle title={"GAINSワークシート"} theme={data?.themeColor} />
          <ChildCard title={"Goals / 目標"} data={data?.goals} />
          <ChildCard title={"Accomplishment / 実績"} data={data?.achievements} />
          <ChildCard title={"Interests / 興味・関心"} data={data?.interests} />
          <ChildCard title={"Networks / 人脈"} data={data?.networks} />
          <ChildCard title={"Skills / 能力"} data={data?.skills} />
        </div>
      </div>

      <div className="businessSheetData-s2">
        <img src={data?.backgroundImage} alt="background" />
        <div className="section2Container">
          <SectionTitle title={"リファーラルシート"} theme={data?.themeColor} />

          <div className="goldenEgg">
            <CardTitle title={"金のタマゴ"} theme={data?.themeColor} name="goldenEgg" />
            <CardData rank={1} data={data?.goldenEgg1} />
            <CardData rank={2} data={data?.goldenEgg2} />
            <CardData rank={3} data={data?.goldenEgg3} />
          </div>

          <div className="goldenGoose">
            <CardTitle title={"金のガチョウ"} theme={data?.themeColor} name="goldenGoose" />
            <CardData rank={1} data={data?.goldenGoose1} />
            <CardData rank={2} data={data?.goldenGoose2} />
            <CardData rank={3} data={data?.goldenGoose3} />
          </div>

          <div className="ourStrengths">
            <CardTitle title={"自社の強み"} theme={data?.themeColor} name="ourStrengths" />
            <CardData data={data?.strengths} />
          </div>

          <div className="powerWord">
            <CardTitle title={"パワーワード"} theme={data?.themeColor} name="powerWord" />
            <div className="gridContainer">
              <CardData data={data?.powerWord1} />
              <CardData data={data?.powerWord2} />
              <CardData data={data?.powerWord3} />
              <CardData data={data?.powerWord4} />
              <CardData data={data?.powerWord5} />
              <CardData data={data?.powerWord6} />
            </div>
          </div>

          <div className="products">
            <CardTitle title={"アイテム / 商品・商材"} theme={data?.themeColor} name="products" />
            <CardData data={data?.products1} />
            <CardData data={data?.products2} />
            <CardData data={data?.products3} />
          </div>

        </div>
      </div>


    </div>




  )
}

export default BusinessSheetTemplate