import { useState } from 'react';
import Header from '../components/global/Header';
import Stepper, { Step } from '../components/Stepper';
import { TextArea, Input, Fonts, Themes } from '../components/FormElements';

const BusinessSheetCreation = () => {

    const [businessSheetData, setBusinessSheetData] = useState({
        "memberBiography": "",
        "aboutBusiness": "",
        "personalInformation": "",
        "goals": "",
        "achievements": "",
        "interests": "",
        "networks": "",
        "skills": "",
        "goldenEgg1": "",
        "goldenEgg2": "",
        "goldenEgg3": "",
        "goldenGoose1": "",
        "goldenGoose2": "",
        "goldenGoose3": "",
        "strengths": "",
        "powerWord1": "",
        "powerWord2": "",
        "powerWord3": "",
        "powerWord4": "",
        "powerWord5": "",
        "powerWord6": "",
        "products1": "",
        "products2": "",
        "products3": "",
        "themeColor": "",
        "font": ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBusinessSheetData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };


    return (
        <div>
            <Header />

            <Stepper data={businessSheetData}>
                <Step title="メンバー略歴シート">
                    <TextArea placeholder="メンバー略歴を入力" maxLength={400} value={businessSheetData.memberBiography} onChange={handleChange} name="memberBiography" />
                </Step>

                <Step title="ビジネスについて">
                    <TextArea placeholder="ビジネスについて入力" maxLength={400} value={businessSheetData.aboutBusiness} onChange={handleChange} name="aboutBusiness" />
                </Step>

                <Step title="個人的な情報">
                    <TextArea placeholder="個人的な情報について入力" maxLength={200} value={businessSheetData.personalInformation} onChange={handleChange} name="personalInformation" />
                </Step>

                <Step title="Goals / 目標">
                    <TextArea placeholder="Goals / 目標について入力" maxLength={1000} value={businessSheetData.goals} onChange={handleChange} name="goals" />
                </Step>

                <Step title="Accomplishment / 実績">
                    <TextArea placeholder="Accomplishment / 実績について入力" maxLength={1000} value={businessSheetData.achievements} onChange={handleChange} name="achievements" />
                </Step>

                <Step title="Interests / 興味・関心">
                    <TextArea placeholder="Interests / 興味・関心について入力" maxLength={1000} value={businessSheetData.interests} onChange={handleChange} name="interests" />
                </Step>

                <Step title="Networks / 人脈">
                    <TextArea placeholder="Networks / 人脈について入力" maxLength={1000} value={businessSheetData.networks} onChange={handleChange} name="networks" />
                </Step>

                <Step title="Skills / 能力">
                    <TextArea placeholder="Skills / 能力について入力" maxLength={1000} value={businessSheetData.skills} onChange={handleChange} name="skills" />
                </Step>

                <Step title="金のタマゴ">
                    <Input lable="エリア1" placeholder="金のタマゴについて入力" maxLength={10} value={businessSheetData.goldenEgg1} onChange={handleChange} name="goldenEgg1" />
                    <Input lable="エリア2" placeholder="金のタマゴについて入力" maxLength={10} value={businessSheetData.goldenEgg2} onChange={handleChange} name="goldenEgg2" />
                    <Input lable="エリア3" placeholder="金のタマゴについて入力" maxLength={10} value={businessSheetData.goldenEgg3} onChange={handleChange} name="goldenEgg3" />
                </Step>

                <Step title="金のガチョウ">
                    <Input lable="エリア1" placeholder="金のガチョウについて入力" maxLength={40} value={businessSheetData.goldenGoose1} onChange={handleChange} name="goldenGoose1" />
                    <Input lable="エリア2" placeholder="金のガチョウについて入力" maxLength={40} value={businessSheetData.goldenGoose2} onChange={handleChange} name="goldenGoose2" />
                    <Input lable="エリア3" placeholder="金のガチョウについて入力" maxLength={40} value={businessSheetData.goldenGoose3} onChange={handleChange} name="goldenGoose3" />

                </Step>

                <Step title="自社の強み">
                    <TextArea placeholder="自社の強みについて入力" maxLength={1000} value={businessSheetData.strengths} onChange={handleChange} name="strengths" />

                </Step>

                <Step title="パワーワード">
                    <Input lable="パワーワード1" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord1} onChange={handleChange} name="powerWord1" />
                    <Input lable="パワーワード2" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord2} onChange={handleChange} name="powerWord2" />
                    <Input lable="パワーワード3" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord3} onChange={handleChange} name="powerWord3" />
                    <Input lable="パワーワード4" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord4} onChange={handleChange} name="powerWord4" />
                    <Input lable="パワーワード5" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord5} onChange={handleChange} name="powerWord5" />
                    <Input lable="パワーワード6" placeholder="パワーワードについて入力" maxLength={40} value={businessSheetData.powerWord6} onChange={handleChange} name="powerWord6" />

                </Step>

                <Step title="アイテム / 商品・商材">
                    <Input lable="アイテム / 商品・商材1" placeholder="アイテム / 商品・商材について入力" maxLength={40} value={businessSheetData.products1} onChange={handleChange} name="products1" />
                    <Input lable="アイテム / 商品・商材2" placeholder="アイテム / 商品・商材について入力" maxLength={40} value={businessSheetData.products2} onChange={handleChange} name="products2" />
                    <Input lable="アイテム / 商品・商材3" placeholder="アイテム / 商品・商材について入力" maxLength={40} value={businessSheetData.products3} onChange={handleChange} name="products3" />
                </Step>

                <Step title="カスタマイズ">
                    <Fonts title="文字のタイプを選んでください" value={businessSheetData.font} onChange={handleChange} name="font" />
                    <Themes title="色を選んでください" value={businessSheetData.themeColor} onChange={handleChange} name="themeColor" />
                </Step>

            </Stepper>

        </div>
    )
}

export default BusinessSheetCreation