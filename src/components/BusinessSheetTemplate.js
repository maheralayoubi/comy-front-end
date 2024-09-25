import "./styles/BusinessSheetTemplate.scss"
import { Card, CardTitle, ChildCard, SectionTitle, CardData } from "./Cards"

const BusinessSheetTemplate = ({ data, isEdit }) => {
    const userName = "佐野真吾（さの しんご）"

    return (
        <div
            className="BusinessSheet"
            style={{
                fontFamily: data?.fontPreference
                    ? `${data.fontPreference} !important`
                    : "sans-serif !important",
            }}
        >
            <img
                src={
                    isEdit && data?.headerBackgroundImageUrl
                        ? data.headerBackgroundImageUrl
                        : data?.headerBackgroundImage
                          ? URL.createObjectURL(data.headerBackgroundImage)
                          : "/images/headerBackgroundImage.png"
                }
                alt="cover"
            />

            <div className="profile">
                <img
                    src={
                        isEdit && data?.profileImageUrl
                            ? data.profileImageUrl
                            : data?.profileImage
                              ? URL.createObjectURL(data.profileImage)
                              : "/images/profileImage.png"
                    }
                    alt="profile"
                />
                <h1 className="userName">{userName}</h1>
            </div>

            <div className="businessSheetData-s1">
                <div className="left">
                    <Card
                        title={"メンバー略歴シート"}
                        data={data?.shortBiography}
                        theme={data?.colorPreference}
                    />
                    <Card
                        title={"ビジネスについて"}
                        data={data?.businessDescription}
                        theme={data?.colorPreference}
                    />
                    <Card
                        title={"個人的な情報"}
                        data={data?.personalInformation}
                        theme={data?.colorPreference}
                    />
                </div>

                <div className="right">
                    <SectionTitle
                        title={"GAINSワークシート"}
                        theme={data?.colorPreference}
                    />
                    <ChildCard title={"Goals / 目標"} data={data?.goals} />
                    <ChildCard
                        title={"Accomplishment / 実績"}
                        data={data?.accomplishments}
                    />
                    <ChildCard
                        title={"Interests / 興味・関心"}
                        data={data?.interests}
                    />
                    <ChildCard
                        title={"Networks / 人脈"}
                        data={data?.networks}
                    />
                    <ChildCard title={"Skills / 能力"} data={data?.skills} />
                </div>
            </div>

            <div className="businessSheetData-s2">
                <img
                    src={
                        isEdit && data?.referralSheetBackgroundImageUrl
                            ? data.referralSheetBackgroundImageUrl
                            : data?.referralSheetBackgroundImage
                              ? URL.createObjectURL(
                                    data.referralSheetBackgroundImage
                                )
                              : "/images/referralSheetBackgroundImage.png"
                    }
                    alt="background"
                />
                <div className="section2Container">
                    <SectionTitle
                        title={"リファーラルシート"}
                        theme={data?.colorPreference}
                    />

                    <div className="goldenEgg">
                        <CardTitle
                            title={"金のタマゴ"}
                            theme={data?.colorPreference}
                            name="goldenEgg"
                        />
                        {data?.goldenEgg.map((item, index) => (
                            <CardData
                                key={index}
                                rank={index + 1}
                                data={item}
                            />
                        ))}
                    </div>

                    <div className="goldenGoose">
                        <CardTitle
                            title={"金のガチョウ"}
                            theme={data?.colorPreference}
                            name="goldenGoose"
                        />
                        {data?.goldenGoose.map((item, index) => (
                            <CardData
                                key={index}
                                rank={index + 1}
                                data={item}
                            />
                        ))}
                    </div>

                    <div className="goldenFarmer">
                        <CardTitle
                            title={"金のタマゴ"}
                            theme={data?.colorPreference}
                            name="goldenFarmer"
                        />
                        {data?.goldenFarmer.map((item, index) => (
                            <CardData
                                key={index}
                                rank={index + 1}
                                data={item}
                            />
                        ))}
                    </div>

                    <div className="ourStrengths">
                        <CardTitle
                            title={"自社の強み"}
                            theme={data?.colorPreference}
                            name="ourStrengths"
                        />
                        <CardData data={data?.companyStrengths} />
                    </div>

                    <div className="powerWord">
                        <CardTitle
                            title={"パワーワード"}
                            theme={data?.colorPreference}
                            name="powerWord"
                        />
                        <div className="gridContainer">
                            {data?.powerWords.map((item, index) => (
                                <CardData key={index} data={item} />
                            ))}
                        </div>
                    </div>

                    <div className="products">
                        <CardTitle
                            title={"アイテム / 商品・商材"}
                            theme={data?.colorPreference}
                            name="products"
                        />
                        {data?.itemsProducts.map((item, index) => (
                            <CardData key={index} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessSheetTemplate
