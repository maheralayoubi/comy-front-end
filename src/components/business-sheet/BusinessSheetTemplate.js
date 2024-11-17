import "./styles/BusinessSheetTemplate.scss";

import EditDesignAndImgModal from "./EditDesignAndImgModal";
import {
  Card,
  CardTitle,
  CardTitle2,
  ChildCard,
  SectionTitle,
  CardData,
} from "./Cards";
import CopySheetUrl from "./CopySheetUrl";

const BusinessSheetTemplate = ({
  data,
  isEdit,
  handleEdit,
  setBusinessSheetData,
}) => {
  const getHeaderBackgroundSrc = (data) => {
    if (data?.headerBackgroundImageUrl) {
      return `${data?.headerBackgroundImageUrl}?timestamp=${new Date().getTime()}`;
    }

    if (data?.headerBackgroundImage) {
      return URL.createObjectURL(data?.headerBackgroundImage);
    }

    return "/images/headerBackgroundImage.png";
  };

  const getProfileImageSrc = (data) => {
    if (data?.profileImageUrl) {
      return `${data?.profileImageUrl}?timestamp=${new Date().getTime()}`;
    }

    if (data?.profileImage) {
      return URL.createObjectURL(data?.profileImage);
    }

    return "/images/profileImage.png";
  };

  const getReferralSheetBackgroundSrc = (data) => {
    if (data?.referralSheetBackgroundImageUrl) {
      return `${data?.referralSheetBackgroundImageUrl}?timestamp=${new Date().getTime()}`;
    }

    if (data?.referralSheetBackgroundImage) {
      return URL.createObjectURL(data?.referralSheetBackgroundImage);
    }

    return "/images/referralSheetBackgroundImage.png";
  };

  return (
    <div
      className="BusinessSheet"
      style={{
        fontFamily: data?.fontPreference && `${data?.fontPreference}`,
      }}
    >
      {/* header bg section */}
      <div className="headerBg">
        <img src={getHeaderBackgroundSrc(data)} alt="cover" />

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

      {/* profile section */}
      <div className="profile">
        <img src={getProfileImageSrc(data)} alt="profile" />

        <div className="profileContent">
          <div className="userData">
            <h6 className="userCategory">{data?.userCategory}</h6>
            <h1 className="userName">{data?.userName}</h1>
          </div>

          {isEdit && <CopySheetUrl userId={data?.userId} />}
        </div>
      </div>

      {/* main busniness info section */}
      <div className="businessSheetData-s1">
        <div className="left">
          {/* shortBiography */}
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

          {/* businessDescription */}
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

          {/* personalInformation */}
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
            title={"ビジネスシート"}
            theme={data?.colorPreference}
          />

          {/* goals */}
          <ChildCard
            title={"目標"}
            data={data?.goals}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="goals"
            placeholder={"目標について入力"}
            maxLength={1000}
          />

          {/* accomplishments */}
          <ChildCard
            title={"実績"}
            data={data?.accomplishments}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="accomplishments"
            placeholder={"実績について入力"}
            maxLength={1000}
          />

          {/* interests */}
          <ChildCard
            title={"興味・関心"}
            data={data?.interests}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="interests"
            placeholder={"興味・関心について入力"}
            maxLength={1000}
          />

          {/* networks */}
          <ChildCard
            title={"人脈"}
            data={data?.networks}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="networks"
            placeholder={"人脈について入力"}
            maxLength={1000}
          />

          {/* skills */}
          <ChildCard
            title={"能力"}
            data={data?.skills}
            theme={data?.colorPreference}
            isEdit={isEdit}
            handleEdit={handleEdit}
            name="skills"
            placeholder={"能力について入力"}
            maxLength={1000}
          />
        </div>
      </div>

      {/* background cover section */}
      <div className="businessSheetData-s2">
        <img src={getReferralSheetBackgroundSrc(data)} alt="background" />

        <div className="section2Container">
          <SectionTitle
            title={"リファーラルシート"}
            theme={data?.colorPreference}
          />

          {/* goldenEgg */}
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

          {/* goldenGoose */}
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

          {/* goldenFarmer */}
          <div className="goldenFarmer">
            <CardTitle
              title={"金のファーマー"}
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

          {/* companyStrengths */}
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

          {/* powerWords */}
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

          {/* products */}
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
