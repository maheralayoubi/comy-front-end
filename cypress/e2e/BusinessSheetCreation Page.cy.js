/* eslint-disable no-undef */
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";
const shortBiography = 'フロントエンド開発者として、最新の技術やユーザー体験に焦点を当てて、効率的で美しいウェブサイトを構築しています。';
const businessDescription = 'ユーザーインターフェースのデザインと開発に情熱を持ち、フロントエンド技術を駆使して、魅力的なウェブ体験を提供することを目指しています。';
const personalInformation = '名前: [あなたの名前], 国: 日本, 職業: フロントエンド開発者';
const goals = '技術的なスキルをさらに向上させ、業界のリーダーシップを発揮しつつ、ユーザーにとって価値のあるプロダクトを開発すること。';
const accomplishments = '複数のプロジェクトで高い評価を得ており、ユーザー数が急増したウェブアプリケーションの開発に成功しました。';
const interests = 'ウェブパフォーマンスの最適化、アクセシビリティ向上、最新のJavaScriptフレームワークへの興味。';
const networks = 'LinkedIn、GitHub、Twitter';
const skills = 'JavaScript、React、HTML、CSS、UI/UXデザインのスキル。';
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

const titles = ['メンバー略歴シート' , 'ビジネスについて' , '個人的な情報' , '目標' , '実績' , '興味・関心' ,'人脈' , '能力' , '金のタマゴ' , '金のガチョウ' , '金のファーマー' , '自社の強み' , 'パワーワード' , 'アイテム / 商品・商材' , 'カスタマイズ']

const typeInInput = (id, value) => {
  return cy.get(id).type(value);
};

const clickAndCheckTextarea = () => {
  cy.get('textarea').should('exist');
  cy.get('.btn.dark').click();
};

const checkInputs = (ids) => {
  ids.forEach(id => {
    cy.get(`#${id}`).should('exist');
  });
};


// describe('Initial Load:', () => {
//   beforeEach(() => {
//     cy.visit('/login');
//     typeInInput('#email', email);
//     typeInInput('#password', password);
//     cy.get('button[type=submit]').click();
//     cy.wait(10000).visit('business-sheet-creation');
//   });

//   it('Verify that the BusinessSheetCreation page loads without any errors.', () => {
//     cy.url().should('include', 'business-sheet-creation');
//   });

//   it('Verify that the form data is initialized correctly from local storage (or with default values if not present).', () => {
//     const formData = {
//       shortBiography,
//       businessDescription,
//       personalInformation,
//       goals,
//       accomplishments,
//       interests,
//       networks,
//       skills,
//       goldenEggs: {
//         goldenEgg0,
//         goldenEgg1,
//         goldenEgg2
//       },
//       goldenGooses: {
//         goldenGoose0,
//         goldenGoose1,
//         goldenGoose2
//       },
//       goldenFarmers: {
//         goldenFarmer0,
//         goldenFarmer1,
//         goldenFarmer2
//       },
//       companyStrengths,
//       powerWords: {
//         powerWords0,
//         powerWords1,
//         powerWords2,
//         powerWords3,
//         powerWords4,
//         powerWords5
//       },
//       itemsProducts: {
//         itemsProducts0,
//         itemsProducts1,
//         itemsProducts2
//       }
//     };
//     localStorage.setItem('businessFormData', JSON.stringify(formData));
//     cy.reload();

//     const storedValue = JSON.parse(localStorage.getItem('businessFormData'));
//     cy.log(storedValue);
    
//     // Fill the form for the main text fields
//     ['shortBiography', 'businessDescription', 'personalInformation', 'goals', 'accomplishments', 'interests', 'networks', 'skills'].forEach(key => {
//       typeInInput(`textarea[name=${key}]`, storedValue[key]);
//       cy.get(`textarea[name=${key}]`).should('have.value', storedValue[key]);
//       cy.get('.btn.dark').click();
//     });
    
//     // Fill the form for goldenEggs
//     Object.keys(storedValue.goldenEggs).forEach(key => {
//       typeInInput(`#${key}`, storedValue.goldenEggs[key]);
//       cy.get(`#${key}`).should('have.value', storedValue.goldenEggs[key]);
//     });
//     cy.get('.btn.dark').click();
    
//     // Fill the form for goldenGooses
//     Object.keys(storedValue.goldenGooses).forEach(key => {
//       typeInInput(`#${key}`, storedValue.goldenGooses[key]);
//       cy.get(`#${key}`).should('have.value', storedValue.goldenGooses[key]);
//     });
//     cy.get('.btn.dark').click();
    
//     // Fill the form for goldenFarmers
//     Object.keys(storedValue.goldenFarmers).forEach(key => {
//       typeInInput(`#${key}`, storedValue.goldenFarmers[key]);
//       cy.get(`#${key}`).should('have.value', storedValue.goldenFarmers[key]);
//     });
//     cy.get('.btn.dark').click();

//     ['companyStrengths'].forEach(key => {
//       typeInInput(`textarea[name=${key}]`, storedValue[key]);
//       cy.get(`textarea[name=${key}]`).should('have.value', storedValue[key]);
//     })
//     cy.get('.btn.dark').click();

//     // Fill the form for powerWords
//     Object.keys(storedValue.powerWords).forEach(key => {
//       typeInInput(`#${key}`, storedValue.powerWords[key]);
//       cy.get(`#${key}`).should('have.value', storedValue.powerWords[key]);
//     });
//     cy.get('.btn.dark').click();

//     // Fill the form for itemsProducts
//     Object.keys(storedValue.itemsProducts).forEach(key => {
//       typeInInput(`#${key}`, storedValue.itemsProducts[key]);
//       cy.get(`#${key}`).should('have.value', storedValue.itemsProducts[key]);
//     });
//     cy.get('.btn.dark').click();
//   });

//   it('Verify that the Stepper component loads with all steps and titles rendered properly.', () => {
//     titles.forEach((title, index) => {
//       cy.contains(title).should('exist');
//       if (index !== titles.length - 1) {
//         cy.get('.btn.dark').click();
//       }
//     });
//   });
// });

describe('Form Inputs:', () => {
  beforeEach(() => {
    cy.visit('/login');
    typeInInput('#email', email);
    typeInInput('#password', password);
    cy.get('button[type=submit]').click();
    cy.wait(10000).visit('business-sheet-creation');
  });

it('Verify that each step renders the appropriate input elements (TextArea, Input, UploadImage, Fonts, Themes).', () => {
  // Check textareas for first several steps
  for (let i = 0; i < 8; i++) {
    clickAndCheckTextarea();
  }

  // Check goldenEgg inputs
  checkInputs(['goldenEgg0', 'goldenEgg1', 'goldenEgg2']);
  cy.get('.btn.dark').click();

  // Check goldenGoose inputs
  checkInputs(['goldenGoose0', 'goldenGoose1', 'goldenGoose2']);
  cy.get('.btn.dark').click();

  // Check goldenFarmer inputs
  checkInputs(['goldenFarmer0', 'goldenFarmer1', 'goldenFarmer2']);
  cy.get('.btn.dark').click();

  // Check textarea on the next step
  clickAndCheckTextarea();

  // Check powerWords inputs
  checkInputs(['powerWords0', 'powerWords1', 'powerWords2', 'powerWords3', 'powerWords4', 'powerWords5']);
  cy.get('.btn.dark').click();

  // Check itemsProducts inputs
  checkInputs(['itemsProducts0', 'itemsProducts1', 'itemsProducts2']);
  cy.get('.btn.dark').click();

  // Check for image upload and font/theme grids
  cy.get('.headerBackgroundImage').should('exist');
  cy.get('.profileImage').should('exist');
  cy.get('.referralSheetBackgroundImage').should('exist');
  cy.get('.fontsGrid .item').should('exist');
  cy.get('.theme .item').should('exist');
});
})
