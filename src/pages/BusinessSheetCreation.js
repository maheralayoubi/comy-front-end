import { useCallback, useEffect, useState } from "react";
import Header from "../components/global/Header";
import Stepper, { Step } from "../components/Stepper";
import {
  TextArea,
  Input,
  Fonts,
  Themes,
  UploadImage,
} from "../components/FormElements";
import useLocalStorage from "../hooks/useLocalStorage";

const BusinessSheetCreation = () => {
  const { getValue, setValue } = useLocalStorage();

  const [businessSheetData, setBusinessSheetData] = useState(null);

  const handleInit = useCallback(() => {
    console.log("clear");
    setBusinessSheetData({
      shortBiography: getValue("shortBiography") || "",
      businessDescription: getValue("businessDescription") || "",
      personalInformation: getValue("personalInformation") || "",
      goals: getValue("goals") || "",
      accomplishments: getValue("accomplishments") || "",
      interests: getValue("interests") || "",
      networks: getValue("networks") || "",
      skills: getValue("skills") || "",
      goldenEgg: getValue("goldenEgg") || Array(3).fill(""),
      goldenGoose: getValue("goldenGoose") || Array(3).fill(""),
      goldenFarmer: getValue("goldenFarmer") || Array(3).fill(""),
      companyStrengths: getValue("companyStrengths") || "",
      powerWords: getValue("powerWords") || Array(6).fill(""),
      itemsProducts: getValue("itemsProducts") || Array(3).fill(""),
      headerBackgroundImage: null,
      profileImage: null,
      referralSheetBackgroundImage: null,
      colorPreference: getValue("colorPreference") || "",
      fontPreference: getValue("fontPreference") || "",
    });
  }, [getValue]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    // is file
    if (files && files.length > 0) {
      const file = files[0];
      setBusinessSheetData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
    // is array
    else if (index !== undefined) {
      businessSheetData[name][index] = value;
      const newArray = [...businessSheetData[name]];
      setValue(name, newArray);
      setBusinessSheetData((prevState) => ({
        ...prevState,
        [name]: newArray,
      }));
    }
    // is string
    else {
      setValue(name, value);
      setBusinessSheetData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Header />

      <Stepper data={businessSheetData} handleInit={handleInit}>
        {/* step 1 */}
        <Step title="メンバー略歴シート">
          <TextArea
            placeholder="メンバー略歴を入力"
            maxLength={400}
            value={businessSheetData?.shortBiography}
            onChange={handleChange}
            name="shortBiography"
          />
        </Step>

        {/* step 2 */}
        <Step title="ビジネスについて">
          <TextArea
            placeholder="ビジネスについて入力"
            maxLength={400}
            value={businessSheetData?.businessDescription}
            onChange={handleChange}
            name="businessDescription"
          />
        </Step>

        {/* step 3 */}
        <Step title="個人的な情報">
          <TextArea
            placeholder="個人的な情報について入力"
            maxLength={200}
            value={businessSheetData?.personalInformation}
            onChange={handleChange}
            name="personalInformation"
          />
        </Step>

        {/* step 4 */}
        <Step title="goals / 目標">
          <TextArea
            placeholder="goals / 目標について入力"
            maxLength={1000}
            value={businessSheetData?.goals}
            onChange={handleChange}
            name="goals"
          />
        </Step>

        {/* step 5 */}
        <Step title="Accomplishment / 実績">
          <TextArea
            placeholder="Accomplishment / 実績について入力"
            maxLength={1000}
            value={businessSheetData?.accomplishments}
            onChange={handleChange}
            name="accomplishments"
          />
        </Step>

        {/* step 6 */}
        <Step title="interests / 興味・関心">
          <TextArea
            placeholder="interests / 興味・関心について入力"
            maxLength={1000}
            value={businessSheetData?.interests}
            onChange={handleChange}
            name="interests"
          />
        </Step>

        {/* step 7 */}
        <Step title="networks / 人脈">
          <TextArea
            placeholder="networks / 人脈について入力"
            maxLength={1000}
            value={businessSheetData?.networks}
            onChange={handleChange}
            name="networks"
          />
        </Step>

        {/* step 8 */}
        <Step title="skills / 能力">
          <TextArea
            placeholder="skills / 能力について入力"
            maxLength={1000}
            value={businessSheetData?.skills}
            onChange={handleChange}
            name="skills"
          />
        </Step>

        {/* step 9 */}
        <Step title="金のタマゴ">
          {businessSheetData?.goldenEgg.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`エリア${index + 1}`}
              placeholder="金のタマゴについて入力"
              maxLength={10}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name="goldenEgg"
            />
          ))}
        </Step>

        {/* step 10 */}
        <Step title="金のガチョウ">
          {businessSheetData?.goldenGoose.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`エリア${index + 1}`}
              placeholder="金のガチョウについて入力"
              maxLength={40}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name="goldenGoose"
            />
          ))}
        </Step>

        {/* step 11 */}
        <Step title="金のファーマー">
          {businessSheetData?.goldenFarmer.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`エリア${index + 1}`}
              placeholder="金のファーマーについて入力"
              maxLength={10}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name="goldenFarmer"
            />
          ))}
        </Step>

        {/* step 12 */}
        <Step title="自社の強み">
          <TextArea
            placeholder="自社の強みについて入力"
            maxLength={1000}
            value={businessSheetData?.companyStrengths}
            onChange={handleChange}
            name="companyStrengths"
          />
        </Step>

        {/* step 13 */}
        <Step title="パワーワード">
          {businessSheetData?.powerWords.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`パワーワード${index + 1}`}
              placeholder="パワーワードについて入力"
              maxLength={40}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name="powerWords"
            />
          ))}
        </Step>

        {/* step 14 */}
        <Step title="アイテム / 商品・商材">
          {businessSheetData?.itemsProducts.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`アイテム / 商品・商材${index + 1}`}
              placeholder="アイテム / 商品・商材について入力"
              maxLength={40}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name="itemsProducts"
            />
          ))}
        </Step>

        {/* step 15 */}
        <Step title="カスタマイズ">
          <UploadImage
            title="ヘッダー背景画像を設定してください"
            value={businessSheetData?.headerBackgroundImage}
            onChange={handleChange}
            name="headerBackgroundImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <UploadImage
            title="プロフィール画像を設定してください"
            value={businessSheetData?.profileImage}
            onChange={handleChange}
            name="profileImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <UploadImage
            title="リファーラルシートの背景画像をアップロードしてください"
            value={businessSheetData?.referralSheetBackgroundImage}
            onChange={handleChange}
            name="referralSheetBackgroundImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <Fonts
            title="文字のタイプを選んでください"
            value={businessSheetData?.fontPreference}
            onChange={handleChange}
            name="fontPreference"
          />
          <Themes
            title="色を選んでください"
            value={businessSheetData?.colorPreference}
            onChange={handleChange}
            name="colorPreference"
          />
        </Step>
      </Stepper>

    </>
  );
};

export default BusinessSheetCreation;
