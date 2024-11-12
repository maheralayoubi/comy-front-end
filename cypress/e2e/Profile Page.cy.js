/* eslint-disable no-undef */
const titles = ['メンバー略歴シート', 'ビジネスについて', '個人的な情報', 'ビジネスシート', '目標', '実績', '興味・関心', '人脈', '能力','リファーラルシート', '金のタマゴ', '金のガチョウ', '金のファーマー', '自社の強み', 'パワーワード', 'アイテム / 商品・商材']
// const savedData = JSON.parse(localStorage.getItem('businessSheetData'));
const shortBiography =
  "フロントエンド開発者として、最新の技術やユーザー体験に焦点を当てて、効率的で美しいウェブサイトを構築しています。";
const businessDescription =
  "ユーザーインターフェースのデザインと開発に情熱を持ち、フロントエンド技術を駆使して、魅力的なウェブ体験を提供することを目指しています。";
const personalInformation =
  "名前: [あなたの名前], 国: 日本, 職業: フロントエンド開発者";
const goals =
  "技術的なスキルをさらに向上させ、業界のリーダーシップを発揮しつつ、ユーザーにとって価値のあるプロダクトを開発すること。";
const accomplishments =
  "複数のプロジェクトで高い評価を得ており、ユーザー数が急増したウェブアプリケーションの開発に成功しました。";
const interests =
  "ウェブパフォーマンスの最適化、アクセシビリティ向上、最新のJavaScriptフレームワークへの興味。";
const networks = "LinkedIn、GitHub、Twitter";
const skills = "JavaScript、React、HTML、CSS、UI/UXデザインのスキル。";
const goldenEgg0 = "市場のニ";
const goldenEgg1 = "顧客のフィ";
const goldenEgg2 = "高品質で信";
const goldenGoose0 = "長期的な顧客関係の構築";
const goldenGoose1 = "強固なブランド認知";
const goldenGoose2 = "安定した収益モデル";
const goldenFarmer0 = "チームの一貫した";
const goldenFarmer1 = "業界のトレンドを";
const goldenFarmer2 = "効率的な運営と";

const companyStrengths = "技術的な優位性と顧客満足度の高さ";
const powerWords0 = "革新";
const powerWords1 = "信頼性";
const powerWords2 = "柔軟性";
const powerWords3 = "品質";
const powerWords4 = "効率性";
const powerWords5 = "持続可能性";
const itemsProducts0 = "カスタムウェブアプリケーションの開発";
const itemsProducts1 = "UX/UIデザインコンサルティング";
const itemsProducts2 = "パフォーマンス最適化サービス";
const formData = {
  shortBiography, //0
  businessDescription, //1
  personalInformation, //2
  goals, //3
  accomplishments, //4
  interests, //5
  networks, //6
  skills, //7
  goldenEggs: { //8
    goldenEgg0,
    goldenEgg1,
    goldenEgg2,
  },
  goldenGooses: { //9 
    goldenGoose0,
    goldenGoose1,
    goldenGoose2,
  },
  goldenFarmers: { //10
    goldenFarmer0,
    goldenFarmer1,
    goldenFarmer2,
  },
  companyStrengths, //11
  powerWords: { //12
    powerWords0,
    powerWords1,
    powerWords2,
    powerWords3,
    powerWords4,
    powerWords5,
  },
  itemsProducts: { //13
    itemsProducts0,
    itemsProducts1,
    itemsProducts2,
  },
};

// describe('Form Initialization:', () => {
//   beforeEach(() => {
//     cy.visit('/login')
//     cy.get('#email').type('hakamha8@gmail.com')
//     cy.get('#password').type('Hakamaldeen17')
//     cy.get('button[type="submit"]').click()
//     cy.wait(10000)
//     cy.url().should('include', 'profile')
//   })

//   it('Verify that the page displays default text ("データがありません" or "No data available") in sections where no data has been added.', () => {
//     // Function to check for <span> text
//     const checkForDefaultText = (selector) => {
//       cy.get(selector, { multiple: true }).each(($content) => {
//         cy.wrap($content).then(($el) => {
//           if ($el.find('span').length > 0) {
//             // Assert that <span> contains default text
//             cy.wrap($el).find('span').should('contain.text', 'データがありません')
//           }
//         })
//       })
//     }

//     // Check each section for default or backend text
//     checkForDefaultText('.cardContent')
//     checkForDefaultText('.section2Container p')
//   })

//   it('Verify that all section titles (e.g., "ビジネスについて", "個人的な情報") are rendered correctly on page load.', () => {
//     titles.map((title) =>(
//       cy.contains(title)
//     ))
//   })
// })

describe('Text Area and Input Field Testing:', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('hakamha8@gmail.com')
    cy.get('#password').type('Hakamaldeen17')
    cy.get('button[type="submit"]').click()
    cy.wait(10000)
    cy.url().should('include', 'profile')
  })
  
  it('Verify that TextArea and Input fields are populated with saved data from local storage if available.', () => {

    cy.window().then((win) => {
      const savedData = JSON.parse(win.localStorage.getItem('businessSheetData'));

      if (!savedData) {
        throw new Error("Saved data not found in local storage.");
      }


    // Helper function to verify input values
    function verifyInputValue(selector, expectedValue) {
      cy.get(selector, { timeout: 10000 })
        .should('exist')
        .invoke('val')
        .should('equal', expectedValue);
      cy.wait(500)
    }

    // Verify individual text fields against localStorage values
    verifyInputValue('textarea[name="shortBiography"]', savedData.shortBiography);
    verifyInputValue('textarea[name="accomplishments"]', savedData.accomplishments);
    verifyInputValue('textarea[name="businessDescription"]', savedData.businessDescription);
    verifyInputValue('textarea[name="goals"]', savedData.goals);
    verifyInputValue('textarea[name="companyStrengths"]', savedData.companyStrengths);
    verifyInputValue('textarea[name="interests"]', savedData.interests);
    verifyInputValue('textarea[name="networks"]', savedData.networks);
    verifyInputValue('textarea[name="personalInformation"]', savedData.personalInformation);
    verifyInputValue('textarea[name="skills"]', savedData.skills);
    cy.get('input[name="userCategory"]').should('have.value', savedData.userCategory);
    cy.get('input[name="userName"]').should('have.value', savedData.userName);

    // Verify array fields
    savedData.goldenEgg.forEach((item, index) => {
      verifyInputValue(`#goldenEgg${index}`, item);
    });
    savedData.goldenFarmer.forEach((item, index) => {
      verifyInputValue(`#goldenFarmer${index}`, item);
    });
    savedData.goldenGoose.forEach((item, index) => {
      verifyInputValue(`#goldenGoose${index}`, item);
    });
    savedData.itemsProducts.forEach((item, index) => {
      verifyInputValue(`#itemsProducts${index}`, item);
    });
    savedData.powerWords.forEach((item, index) => {
      verifyInputValue(`#powerWords${index}`, item);
    });

    // Verify images have correct src attributes
    cy.get('.headerBg img').should('have.attr', 'src').and('include', savedData.headerBackgroundImageUrl);
    cy.get('.profile img').should('have.attr', 'src').and('include', savedData.profileImageUrl);

    // Verify sections have the correct font
    cy.get('.BusinessSheet')
      .invoke('css', 'font-family')
      .should('equal', `"${savedData.fontPreference}"`);

    // Helper function to convert hex color to rgb
    function hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // Verify sections have the correct background color
    function checkColor(selector) {
      cy.get(selector, { multiple: true }).each((section) => {
        cy.wrap(section)
          .invoke('css', 'background-color')
          .should('equal', hexToRgb(savedData.colorPreference));
      });
    }

    checkColor('.cardTitle');
    checkColor('.sectionTitle');
  });
  });

  it('Verify that a user can enter text in each TextArea and Input field, with real-time checking, and that the data persists after page refresh.', () => {
      // Fill out primary text fields
      [
        "shortBiography",
        "businessDescription",
        "personalInformation",
        "goals",
        "accomplishments",
        "interests",
        "networks",
        "skills",
      ].forEach((key, index) => {
        // Click edit button to open form for each specific card
        cy.get('.btn.edit').eq(index).click();
        
        // Wrap the textarea or input field in the current card
        cy.get(`textarea[name="${key}"]`).clear().type(formData[key]);
        
        // Click update button for that specific card
        cy.get('button.update', { force: true }).eq(index + 1).click();
        cy.wait(5000)
      });
      cy.wait(10000)
      // Fill the form for goldenEggs, goldenGooses, goldenFarmers, powerWords, and itemsProducts
      const updateAndSaveSection = (arrayData, selectorPrefix, buttonIndex) => {
        cy.get('.cardTitle .btn.edit').eq(buttonIndex).click();
        if(buttonIndex === 3 ) {
          ["companyStrengths"].forEach((key) => {
            cy.get(`textarea[name="${key}"]`).clear().type(formData[key]);
          })
        }
        else {
          Object.keys(arrayData).forEach((key) => {
            cy.get(`#${key}`).clear().type(arrayData[key]);
            cy.get(`#${key}`).should('have.value', arrayData[key]);
          });
        }
        cy.get("button.update").eq(buttonIndex + 9).click(); // Save each section
        cy.wait(5000)
      };
      updateAndSaveSection(formData.goldenEggs, "goldenEgg", 0);
      updateAndSaveSection(formData.goldenGooses, "goldenGoose", 1);
      updateAndSaveSection(formData.goldenFarmers, "goldenFarmer", 2);
      updateAndSaveSection(formData.powerWords, "powerWord", 4);
      updateAndSaveSection(formData.itemsProducts, "itemsProduct", 5);
  
      // Reload the page to verify data persistence
      cy.reload();
  
      // Verify persistence of each textarea field after reload
      [
        "shortBiography",
        "businessDescription",
        "personalInformation",
        "goals",
        "accomplishments",
        "interests",
        "networks",
        "skills",
        "companyStrengths"
      ].forEach((key) => {
        cy.get(`textarea[name="${key}"]`).invoke('val').should('equal', formData[key]);
      });
  
      // Verify array fields after reload
      const verifyArrayData = (arrayData, selectorPrefix) => {
        Object.keys(arrayData).forEach((key) => {
          cy.get(`#${key}`).invoke('val').should('equal', arrayData[key]);
        });
      };
      verifyArrayData(formData.goldenEggs, "goldenEgg");
      verifyArrayData(formData.goldenGooses, "goldenGoose");
      verifyArrayData(formData.goldenFarmers, "goldenFarmer");
      verifyArrayData(formData.powerWords, "powerWord");
      verifyArrayData(formData.itemsProducts, "itemsProduct");
    });
})
