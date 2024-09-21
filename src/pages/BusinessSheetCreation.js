import { useState } from "react";
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

  const [businessSheetData, setBusinessSheetData] = useState({
    memberBiography: getValue("memberBiography"),
    aboutBusiness: getValue("aboutBusiness"),
    personalInformation: getValue("personalInformation"),
    goals: getValue("goals"),
    achievements: getValue("achievements"),
    interests: getValue("interests"),
    networks: getValue("networks"),
    skills: getValue("skills"),
    goldenEgg1: getValue("goldenEgg1"),
    goldenEgg2: getValue("goldenEgg2"),
    goldenEgg3: getValue("goldenEgg3"),
    goldenGoose1: getValue("goldenGoose1"),
    goldenGoose2: getValue("goldenGoose2"),
    goldenGoose3: getValue("goldenGoose3"),
    strengths: getValue("strengths"),
    powerWord1: getValue("powerWord1"),
    powerWord2: getValue("powerWord2"),
    powerWord3: getValue("powerWord3"),
    powerWord4: getValue("powerWord4"),
    powerWord5: getValue("powerWord5"),
    powerWord6: getValue("powerWord6"),
    products1: getValue("products1"),
    products2: getValue("products2"),
    products3: getValue("products3"),
    themeColor: getValue("themeColor"),
    font: getValue("font"),
    coverImage: getValue("coverImage") || "/images/coverImage.png",
    profileImage: getValue("profileImage") || "/images/profileImage.png",
    backgroundImage:
      getValue("backgroundImage") || "/images/backgroundImage.png",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          setValue(name, event.target.result);
          setBusinessSheetData((prevState) => ({
            ...prevState,
            [name]: event.target.result,
          }));
        };

        reader.readAsDataURL(file);
      }
    } else {
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

      <Stepper data={businessSheetData}>
        <Step title="メンバー略歴シート">
          <TextArea
            placeholder="メンバー略歴を入力"
            maxLength={400}
            value={businessSheetData.memberBiography}
            onChange={handleChange}
            name="memberBiography"
          />
        </Step>

        <Step title="ビジネスについて">
          <TextArea
            placeholder="ビジネスについて入力"
            maxLength={400}
            value={businessSheetData.aboutBusiness}
            onChange={handleChange}
            name="aboutBusiness"
          />
        </Step>

        <Step title="個人的な情報">
          <TextArea
            placeholder="個人的な情報について入力"
            maxLength={200}
            value={businessSheetData.personalInformation}
            onChange={handleChange}
            name="personalInformation"
          />
        </Step>

        <Step title="Goals / 目標">
          <TextArea
            placeholder="Goals / 目標について入力"
            maxLength={1000}
            value={businessSheetData.goals}
            onChange={handleChange}
            name="goals"
          />
        </Step>

        <Step title="Accomplishment / 実績">
          <TextArea
            placeholder="Accomplishment / 実績について入力"
            maxLength={1000}
            value={businessSheetData.achievements}
            onChange={handleChange}
            name="achievements"
          />
        </Step>

        <Step title="Interests / 興味・関心">
          <TextArea
            placeholder="Interests / 興味・関心について入力"
            maxLength={1000}
            value={businessSheetData.interests}
            onChange={handleChange}
            name="interests"
          />
        </Step>

        <Step title="Networks / 人脈">
          <TextArea
            placeholder="Networks / 人脈について入力"
            maxLength={1000}
            value={businessSheetData.networks}
            onChange={handleChange}
            name="networks"
          />
        </Step>

        <Step title="Skills / 能力">
          <TextArea
            placeholder="Skills / 能力について入力"
            maxLength={1000}
            value={businessSheetData.skills}
            onChange={handleChange}
            name="skills"
          />
        </Step>

        <Step title="金のタマゴ">
          <Input
            lable="エリア1"
            placeholder="金のタマゴについて入力"
            maxLength={10}
            value={businessSheetData.goldenEgg1}
            onChange={handleChange}
            name="goldenEgg1"
          />
          <Input
            lable="エリア2"
            placeholder="金のタマゴについて入力"
            maxLength={10}
            value={businessSheetData.goldenEgg2}
            onChange={handleChange}
            name="goldenEgg2"
          />
          <Input
            lable="エリア3"
            placeholder="金のタマゴについて入力"
            maxLength={10}
            value={businessSheetData.goldenEgg3}
            onChange={handleChange}
            name="goldenEgg3"
          />
        </Step>

        <Step title="金のガチョウ">
          <Input
            lable="エリア1"
            placeholder="金のガチョウについて入力"
            maxLength={40}
            value={businessSheetData.goldenGoose1}
            onChange={handleChange}
            name="goldenGoose1"
          />
          <Input
            lable="エリア2"
            placeholder="金のガチョウについて入力"
            maxLength={40}
            value={businessSheetData.goldenGoose2}
            onChange={handleChange}
            name="goldenGoose2"
          />
          <Input
            lable="エリア3"
            placeholder="金のガチョウについて入力"
            maxLength={40}
            value={businessSheetData.goldenGoose3}
            onChange={handleChange}
            name="goldenGoose3"
          />
        </Step>

        <Step title="自社の強み">
          <TextArea
            placeholder="自社の強みについて入力"
            maxLength={1000}
            value={businessSheetData.strengths}
            onChange={handleChange}
            name="strengths"
          />
        </Step>

        <Step title="パワーワード">
          <Input
            lable="パワーワード1"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord1}
            onChange={handleChange}
            name="powerWord1"
          />
          <Input
            lable="パワーワード2"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord2}
            onChange={handleChange}
            name="powerWord2"
          />
          <Input
            lable="パワーワード3"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord3}
            onChange={handleChange}
            name="powerWord3"
          />
          <Input
            lable="パワーワード4"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord4}
            onChange={handleChange}
            name="powerWord4"
          />
          <Input
            lable="パワーワード5"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord5}
            onChange={handleChange}
            name="powerWord5"
          />
          <Input
            lable="パワーワード6"
            placeholder="パワーワードについて入力"
            maxLength={40}
            value={businessSheetData.powerWord6}
            onChange={handleChange}
            name="powerWord6"
          />
        </Step>

        <Step title="アイテム / 商品・商材">
          <Input
            lable="アイテム / 商品・商材1"
            placeholder="アイテム / 商品・商材について入力"
            maxLength={40}
            value={businessSheetData.products1}
            onChange={handleChange}
            name="products1"
          />
          <Input
            lable="アイテム / 商品・商材2"
            placeholder="アイテム / 商品・商材について入力"
            maxLength={40}
            value={businessSheetData.products2}
            onChange={handleChange}
            name="products2"
          />
          <Input
            lable="アイテム / 商品・商材3"
            placeholder="アイテム / 商品・商材について入力"
            maxLength={40}
            value={businessSheetData.products3}
            onChange={handleChange}
            name="products3"
          />
        </Step>

        <Step title="カスタマイズ">
          <UploadImage
            title="ヘッダー背景画像を設定してください"
            value={businessSheetData.coverImage}
            onChange={handleChange}
            name="coverImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <UploadImage
            title="プロフィール画像を設定してください"
            value={businessSheetData.profileImage}
            onChange={handleChange}
            name="profileImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <UploadImage
            title="リファーラルシートの背景画像をアップロードしてください"
            value={businessSheetData.backgroundImage}
            onChange={handleChange}
            name="backgroundImage"
            setBusinessSheetData={setBusinessSheetData}
          />
          <Fonts
            title="文字のタイプを選んでください"
            value={businessSheetData.font}
            onChange={handleChange}
            name="font"
          />
          <Themes
            title="色を選んでください"
            value={businessSheetData.themeColor}
            onChange={handleChange}
            name="themeColor"
          />
        </Step>
      </Stepper>
    </>
  );
};

export default BusinessSheetCreation;
