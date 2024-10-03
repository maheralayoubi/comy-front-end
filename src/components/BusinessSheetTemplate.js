import "./styles/BusinessSheetTemplate.scss";
import {
  Card,
  CardTitle,
  CardTitle2,
  ChildCard,
  SectionTitle,
  CardData,
} from "./Cards";
import EditDesignAndImgModal from "./EditDesignAndImgModal";

const BusinessSheetTemplate = ({ data, isEdit, isPreview, handleEdit, setBusinessSheetData }) => {


  const copyProfileUrl = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/preview/${data?.userId}`)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        alert("Failed to copy text: ", err);
      });
  };

  return (
    <div
      className="BusinessSheet"
      style={{
        fontFamily: data?.fontPreference
          ? `${data?.fontPreference} !important`
          : "sans-serif !important",
      }}
    >
      <div className="headerBg">
        <img
          src={
            isPreview && data?.headerBackgroundImageUrl ?
              data?.headerBackgroundImageUrl :
              isEdit && data?.headerBackgroundImageUrl
                ? `${data?.headerBackgroundImageUrl}?timestamp=${new Date().getTime()}`
                : data?.headerBackgroundImage
                  ? URL.createObjectURL(data?.headerBackgroundImage)
                  : "/images/headerBackgroundImage.png"
          }
          alt="cover"
        />


        {isEdit && (
          <EditDesignAndImgModal
            size={"sm"}
            title={"プロフィール"}
            setBusinessSheetData={setBusinessSheetData}
            theme={data?.colorPreference}
            data={data}
          />
        )}
      </div>

      <div className="profile">
        <img
          src={
            isPreview && data?.profileImageUrl ?
              data?.profileImageUrl :
              isEdit && data?.profileImageUrl
                ? `${data?.profileImageUrl}?timestamp=${new Date().getTime()}`
                : data?.profileImage
                  ? URL.createObjectURL(data?.profileImage)
                  : "/images/profileImage.png"
          }
          alt="profile"
        />
        <div className="profileContent">
          <div className="userData">
            <h6 className="userCategory">{data?.userCategory}</h6>
            <h1 className="userName">{data?.userName}</h1>
          </div>
          {isEdit && (
            <div className="copyContent">
              <div
                href={`/user/${data?.userId}`}
                target="_blanck"
                className="copyImg"
                onClick={copyProfileUrl}
              >
                <img src="/images/content_copy.png" alt="copy content" />
              </div>

              <span>ビジネスシートのURLをコピー</span>
            </div>
          )}
        </div>
      </div>

      <div className="businessSheetData-s1">
        <div className="left">
          <Card
            title={"メンバー略歴シート"}
            data={data?.shortBiography}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="shortBiography"
            placeholder={"メンバー略歴を入力"}
            maxLength={400}
          />
          <Card
            title={"ビジネスについて"}
            data={data?.businessDescription}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="businessDescription"
            placeholder={"ビジネスについて入力"}
            maxLength={400}
          />
          <Card
            title={"個人的な情報"}
            data={data?.personalInformation}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="personalInformation"
            placeholder={"個人的な情報について入力"}
            maxLength={200}
          />
        </div>

        <div className="right">
          <SectionTitle
            title={"GAINSワークシート"}
            theme={data?.colorPreference}
          />
          <ChildCard
            title={"Goals / 目標"}
            data={data?.goals}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="goals"
            placeholder={"goals / 目標について入力"}
            maxLength={1000}
          />
          <ChildCard
            title={"Accomplishment / 実績"}
            data={data?.accomplishments}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="accomplishments"
            placeholder={"Accomplishment / 実績について入力"}
            maxLength={1000}
          />
          <ChildCard
            title={"Interests / 興味・関心"}
            data={data?.interests}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="interests"
            placeholder={"interests / 興味・関心について入力"}
            maxLength={1000}
          />
          <ChildCard
            title={"Networks / 人脈"}
            data={data?.networks}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="networks"
            placeholder={"networks / 人脈について入力"}
            maxLength={1000}
          />
          <ChildCard
            title={"Skills / 能力"}
            data={data?.skills}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="skills"
            placeholder={"skills / 能力について入力"}
            maxLength={1000}
          />
        </div>
      </div>

      <div className="businessSheetData-s2">
        <img
          src={
            isPreview && data?.referralSheetBackgroundImageUrl ?
              data?.referralSheetBackgroundImageUrl :
              isEdit && data?.referralSheetBackgroundImageUrl
                ? `${data?.referralSheetBackgroundImageUrl}?timestamp=${new Date().getTime()}`
                : data?.referralSheetBackgroundImage
                  ? URL.createObjectURL(data?.referralSheetBackgroundImage)
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
              isEdit={isEdit}
              data={data?.goldenEgg}
              handleEdit={handleEdit}
              placeholder={"金のタマゴについて入力"}
              maxLength={10}
            />
            {(data?.goldenEgg ? data?.goldenEgg : Array(3).fill("")).map(
              (item, index) => (
                <CardData key={index} rank={index + 1} data={item} />
              ),
            )}
          </div>

          <div className="goldenGoose">
            <CardTitle
              title={"金のガチョウ"}
              theme={data?.colorPreference}
              name="goldenGoose"
              isEdit={isEdit}
              data={data?.goldenGoose}
              handleEdit={handleEdit}
              placeholder={"金のガチョウについて入力"}
              maxLength={40}
            />
            {(data?.goldenGoose ? data?.goldenGoose : Array(3).fill("")).map(
              (item, index) => (
                <CardData key={index} rank={index + 1} data={item} />
              ),
            )}
          </div>

          <div className="goldenFarmer">
            <CardTitle
              title={"金のタマゴ"}
              theme={data?.colorPreference}
              name="goldenFarmer"
              isEdit={isEdit}
              data={data?.goldenFarmer}
              handleEdit={handleEdit}
              placeholder={"金のファーマーについて入力"}
              maxLength={10}
            />
            {(data?.goldenFarmer ? data?.goldenFarmer : Array(3).fill("")).map(
              (item, index) => (
                <CardData key={index} rank={index + 1} data={item} />
              ),
            )}
          </div>

          <div className="companyStrengths">
            <CardTitle2
              title={"自社の強み"}
              theme={data?.colorPreference}
              name="companyStrengths"
              isEdit={isEdit}
              data={data?.companyStrengths}
              handleEdit={handleEdit}
              placeholder={"自社の強みについて入力"}
              maxLength={1000}
            />
            <CardData data={data?.companyStrengths} />
          </div>

          <div className="powerWords">
            <CardTitle
              title={"パワーワード"}
              theme={data?.colorPreference}
              name="powerWords"
              isEdit={isEdit}
              data={data?.powerWords}
              handleEdit={handleEdit}
              lable="パワーワード"
              placeholder={"パワーワードについて入力"}
              maxLength={40}
            />
            <div className="gridContainer">
              {(data?.powerWords ? data?.powerWords : Array(6).fill("")).map(
                (item, index) => (
                  <CardData key={index} data={item} />
                ),
              )}
            </div>
          </div>

          <div className="products">
            <CardTitle
              title={"アイテム / 商品・商材"}
              theme={data?.colorPreference}
              name="itemsProducts"
              isEdit={isEdit}
              data={data?.itemsProducts}
              handleEdit={handleEdit}
              placeholder={"アイテム / 商品・商材について入力"}
              lable="アイテム / 商品・商材"
              maxLength={40}
            />
            {(data?.itemsProducts
              ? data?.itemsProducts
              : Array(3).fill("")
            ).map((item, index) => (
              <CardData key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSheetTemplate;
