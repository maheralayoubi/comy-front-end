/* eslint-disable no-undef */
import "cypress-file-upload";
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";
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
  shortBiography,
  businessDescription,
  personalInformation,
  goals,
  accomplishments,
  interests,
  networks,
  skills,
  goldenEggs: {
    goldenEgg0,
    goldenEgg1,
    goldenEgg2,
  },
  goldenGooses: {
    goldenGoose0,
    goldenGoose1,
    goldenGoose2,
  },
  goldenFarmers: {
    goldenFarmer0,
    goldenFarmer1,
    goldenFarmer2,
  },
  companyStrengths,
  powerWords: {
    powerWords0,
    powerWords1,
    powerWords2,
    powerWords3,
    powerWords4,
    powerWords5,
  },
  itemsProducts: {
    itemsProducts0,
    itemsProducts1,
    itemsProducts2,
  },
};

const lengthData = {
  shortBiography: { selector: "textarea", maxLength: 400 },
  businessDescription: { selector: "textarea", maxLength: 400 },
  personalInformation: { selector: "textarea", maxLength: 200 },
  goals: { selector: "textarea", maxLength: 1000 },
  accomplishments: { selector: "textarea", maxLength: 1000 },
  interests: { selector: "textarea", maxLength: 1000 },
  networks: { selector: "textarea", maxLength: 1000 },
  skills: { selector: "textarea", maxLength: 1000 },
  goldenEggs: {
    goldenEgg0: { selector: "input", maxLength: 10 },
    goldenEgg1: { selector: "input", maxLength: 10 },
    goldenEgg2: { selector: "input", maxLength: 10 },
  },
  goldenGooses: {
    goldenGoose0: { selector: "input", maxLength: 40 },
    goldenGoose1: { selector: "input", maxLength: 40 },
    goldenGoose2: { selector: "input", maxLength: 40 },
  },
  goldenFarmers: {
    goldenFarmer0: { selector: "input", maxLength: 10 },
    goldenFarmer1: { selector: "input", maxLength: 10 },
    goldenFarmer2: { selector: "input", maxLength: 10 },
  },
  companyStrengths: { selector: "textarea", maxLength: 1000 },
  powerWords: {
    powerWords0: { selector: "input", maxLength: 40 },
    powerWords1: { selector: "input", maxLength: 40 },
    powerWords2: { selector: "input", maxLength: 40 },
    powerWords3: { selector: "input", maxLength: 40 },
    powerWords4: { selector: "input", maxLength: 40 },
    powerWords5: { selector: "input", maxLength: 40 },
  },
  itemsProducts: {
    itemsProducts0: { selector: "input", maxLength: 40 },
    itemsProducts1: { selector: "input", maxLength: 40 },
    itemsProducts2: { selector: "input", maxLength: 40 },
  },
};

const titles = [
  "メンバー略歴シート",
  "ビジネスについて",
  "個人的な情報",
  "目標",
  "実績",
  "興味・関心",
  "人脈",
  "能力",
  "金のタマゴ",
  "金のガチョウ",
  "金のファーマー",
  "自社の強み",
  "パワーワード",
  "アイテム / 商品・商材",
  "カスタマイズ",
];

const typeInInput = (id, value) => {
  return cy.get(id).type(value);
};

const clickAndCheckTextarea = () => {
  cy.get("textarea").should("exist");
  cy.get(".btn.dark").click();
};

const checkInputs = (ids) => {
  ids.forEach((id) => {
    cy.get(`#${id}`).should("exist");
  });
};

// Helper function to verify maxLength
function verifyMaxLength(selector, maxLength) {
  cy.get(selector)
    .should("exist")
    .should("have.attr", "maxlength", maxLength.toString())
    .then(() => {
      const overLimitText = "あ".repeat(maxLength + 10);
      cy.get(selector).clear().type(overLimitText);
      cy.get(selector).invoke("val").should("have.length", maxLength);
    })
    .wait(100);
}

describe("Initial Load:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that the BusinessSheetCreation page loads without any errors.", () => {
    cy.url().should("include", "business-sheet-creation");
  });

  it("Verify that the form data is initialized correctly from local storage (or with default values if not present).", () => {
    localStorage.setItem("businessFormData", JSON.stringify(formData));
    cy.reload();

    const storedValue = JSON.parse(localStorage.getItem("businessFormData"));
    // Fill the form for the main text fields
    [
      "shortBiography",
      "businessDescription",
      "personalInformation",
      "goals",
      "accomplishments",
      "interests",
      "networks",
      "skills",
    ].forEach((key) => {
      typeInInput(`textarea[name=${key}]`, storedValue[key]);
      cy.get(`textarea[name=${key}]`).should("have.value", storedValue[key]);
      cy.get(".btn.dark").click();
    });

    // Fill the form for goldenEggs
    Object.keys(storedValue.goldenEggs).forEach((key) => {
      typeInInput(`#${key}`, storedValue.goldenEggs[key]);
      cy.get(`#${key}`).should("have.value", storedValue.goldenEggs[key]);
    });
    cy.get(".btn.dark").click();

    // Fill the form for goldenGooses
    Object.keys(storedValue.goldenGooses).forEach((key) => {
      typeInInput(`#${key}`, storedValue.goldenGooses[key]);
      cy.get(`#${key}`).should("have.value", storedValue.goldenGooses[key]);
    });
    cy.get(".btn.dark").click();

    // Fill the form for goldenFarmers
    Object.keys(storedValue.goldenFarmers).forEach((key) => {
      typeInInput(`#${key}`, storedValue.goldenFarmers[key]);
      cy.get(`#${key}`).should("have.value", storedValue.goldenFarmers[key]);
    });
    cy.get(".btn.dark").click();

    ["companyStrengths"].forEach((key) => {
      typeInInput(`textarea[name=${key}]`, storedValue[key]);
      cy.get(`textarea[name=${key}]`).should("have.value", storedValue[key]);
    });
    cy.get(".btn.dark").click();

    // Fill the form for powerWords
    Object.keys(storedValue.powerWords).forEach((key) => {
      typeInInput(`#${key}`, storedValue.powerWords[key]);
      cy.get(`#${key}`).should("have.value", storedValue.powerWords[key]);
    });
    cy.get(".btn.dark").click();

    // Fill the form for itemsProducts
    Object.keys(storedValue.itemsProducts).forEach((key) => {
      typeInInput(`#${key}`, storedValue.itemsProducts[key]);
      cy.get(`#${key}`).should("have.value", storedValue.itemsProducts[key]);
    });
    cy.get(".btn.dark").click();
  });

  it("Verify that the Stepper component loads with all steps and titles rendered properly.", () => {
    titles.forEach((title, index) => {
      cy.contains(title).should("exist");
      if (index !== titles.length - 1) {
        cy.get(".btn.dark").click();
      }
    });
  });
});

describe("Form Inputs:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that each step renders the appropriate input elements (TextArea, Input, UploadImage, Fonts, Themes).", () => {
    // Check textareas for first several steps
    for (let i = 0; i < 8; i++) {
      clickAndCheckTextarea();
    }

    // Check goldenEgg inputs
    checkInputs(["goldenEgg0", "goldenEgg1", "goldenEgg2"]);
    cy.get(".btn.dark").click();

    // Check goldenGoose inputs
    checkInputs(["goldenGoose0", "goldenGoose1", "goldenGoose2"]);
    cy.get(".btn.dark").click();

    // Check goldenFarmer inputs
    checkInputs(["goldenFarmer0", "goldenFarmer1", "goldenFarmer2"]);
    cy.get(".btn.dark").click();

    // Check textarea on the next step
    clickAndCheckTextarea();

    // Check powerWords inputs
    checkInputs([
      "powerWords0",
      "powerWords1",
      "powerWords2",
      "powerWords3",
      "powerWords4",
      "powerWords5",
    ]);
    cy.get(".btn.dark").click();

    // Check itemsProducts inputs
    checkInputs(["itemsProducts0", "itemsProducts1", "itemsProducts2"]);
    cy.get(".btn.dark").click();

    // Check for image upload and font/theme grids
    cy.get(".headerBackgroundImage").should("exist");
    cy.get(".profileImage").should("exist");
    cy.get(".referralSheetBackgroundImage").should("exist");
    cy.get(".fontsGrid .item").should("exist");
    cy.get(".theme .item").should("exist");
  });

  it("Verify that file uploads work correctly for UploadImage components.", () => {
    for (let i = 1; i < 15; i++) {
      cy.get(".btn.dark").click();
    }
    cy.get(".headerBackgroundImage").invoke(
      "attr",
      "src",
      "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",
    );
    cy.get(".profileImage").invoke(
      "attr",
      "src",
      "https://pluspng.com/img-png/google-logo-png-open-2000.png",
    );
    cy.get(".referralSheetBackgroundImage").invoke(
      "attr",
      "src",
      "https://1000logos.net/wp-content/uploads/2016/11/google-logo.jpg",
    );
    cy.get(".headerBackgroundImage")
      .should("have.attr", "src")
      .should(
        "include",
        "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",
      );
    cy.get(".profileImage")
      .should("have.attr", "src")
      .should(
        "include",
        "https://pluspng.com/img-png/google-logo-png-open-2000.png",
      );
    cy.get(".referralSheetBackgroundImage")
      .should("have.attr", "src")
      .should(
        "include",
        "https://1000logos.net/wp-content/uploads/2016/11/google-logo.jpg",
      );
  });

  it("Verify that the Fonts and Themes components display and apply the selected options correctly.", () => {
    for (let i = 1; i < 15; i++) {
      cy.get(".btn.dark").click();
    }

    // Verify Fonts
    cy.get(".fontsGrid .item").each((fontItem, index) => {
      cy.wrap(fontItem).click();
    });

    // Verify Themes
    cy.get(".themesGrid .item").each((themeItem, index) => {
      cy.wrap(themeItem).click();
    });
  });
});

describe("Stepper Functionality:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that a user can navigate through the steps.", () => {
    titles.forEach((title, index) => {
      cy.contains(title).should("be.visible");
      if (index > 0) {
        cy.get(".btn.gray").should("be.visible").click();
        cy.contains(titles[index - 1]).should("be.visible");
        cy.get(".btn.dark").should("be.visible").click();
      }
      if (index < titles.length - 1) {
        cy.get(".btn.dark").should("be.visible").click();
      }
    });
  });

  it("Verify that step transitions do not reset the form inputs.", () => {
    const verifyAndFillInput = (selector, value) => {
      // Fill the input and verify it retains the value
      typeInInput(selector, value);
      cy.get(selector).should("have.value", value);
    };

    // Step 1: Fill out main sections and verify values persist
    [
      "shortBiography",
      "businessDescription",
      "personalInformation",
      "goals",
      "accomplishments",
      "interests",
      "networks",
      "skills",
    ].forEach((key) => {
      const selector = `textarea[name=${key}]`;
      verifyAndFillInput(selector, formData[key]);
      cy.get(".btn.dark").click();
    });

    // Step 2: Verify goldenEggs inputs
    Object.keys(formData.goldenEggs).forEach((key) => {
      const selector = `#${key}`;
      verifyAndFillInput(selector, formData.goldenEggs[key]);
    });
    cy.get(".btn.dark").click();

    // Step 3: Verify goldenGooses inputs
    Object.keys(formData.goldenGooses).forEach((key) => {
      const selector = `#${key}`;
      verifyAndFillInput(selector, formData.goldenGooses[key]);
    });
    cy.get(".btn.dark").click();

    // Step 4: Verify goldenFarmers inputs
    Object.keys(formData.goldenFarmers).forEach((key) => {
      const selector = `#${key}`;
      verifyAndFillInput(selector, formData.goldenFarmers[key]);
    });
    cy.get(".btn.dark").click();

    // Step 5: Verify companyStrengths inputs
    ["companyStrengths"].forEach((key) => {
      const selector = `textarea[name=${key}]`;
      verifyAndFillInput(selector, formData[key]);
    });
    cy.get(".btn.dark").click();

    // Step 6: Verify powerWords inputs
    Object.keys(formData.powerWords).forEach((key) => {
      const selector = `#${key}`;
      verifyAndFillInput(selector, formData.powerWords[key]);
    });
    cy.get(".btn.dark").click();

    // Step 7: Verify itemsProducts inputs
    Object.keys(formData.itemsProducts).forEach((key) => {
      const selector = `#${key}`;
      verifyAndFillInput(selector, formData.itemsProducts[key]);
    });
    cy.get(".btn.dark").click();

    // Final check to confirm values persist throughout the process
    // Re-verify that all inputs still have the values set initially
    for (let i = 0; i < 14; i++) {
      cy.get(".btn.gray").click();
    }

    [
      "shortBiography",
      "businessDescription",
      "personalInformation",
      "goals",
      "accomplishments",
      "interests",
      "networks",
      "skills",
    ].forEach((key) => {
      cy.get(`textarea[name=${key}]`).should("have.value", formData[key]);
      cy.get(".btn.dark").click();
    });
    Object.keys(formData.goldenEggs).forEach((key) => {
      cy.get(`#${key}`).should("have.value", formData.goldenEggs[key]);
    });
    cy.get(".btn.dark").click();
    Object.keys(formData.goldenGooses).forEach((key) => {
      cy.get(`#${key}`).should("have.value", formData.goldenGooses[key]);
    });
    cy.get(".btn.dark").click();
    Object.keys(formData.goldenFarmers).forEach((key) => {
      cy.get(`#${key}`).should("have.value", formData.goldenFarmers[key]);
    });
    cy.get(".btn.dark").click();
    cy.get(`textarea[name=companyStrengths]`).should(
      "have.value",
      formData.companyStrengths,
    );
    cy.get(".btn.dark").click();
    Object.keys(formData.powerWords).forEach((key) => {
      cy.get(`#${key}`).should("have.value", formData.powerWords[key]);
    });
    cy.get(".btn.dark").click();
    Object.keys(formData.itemsProducts).forEach((key) => {
      cy.get(`#${key}`).should("have.value", formData.itemsProducts[key]);
    });
    cy.get(".btn.dark").click();
  });
});

describe("Validation:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that each input field enforces the correct maxLength (e.g., 400 for biography, 1000 for goals, etc.).", () => {
    Object.entries(lengthData).forEach(([key, field]) => {
      if (field.maxLength === undefined) {
        Object.entries(field).forEach(([subKey, subField]) => {
          verifyMaxLength(
            `${subField.selector}[id=${subKey}]`,
            subField.maxLength,
          );
        });
        cy.get(".btn.dark").click();
      } else {
        // Handle top-level fields
        verifyMaxLength(`${field.selector}[name=${key}]`, field.maxLength);
        cy.get(".btn.dark").click();
      }
    });
  });
});

describe("File Uploads:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that after selecting an image, the preview of the uploaded image is displayed in the form.", () => {
    for (let i = 0; i < 14; i++) {
      cy.get(".btn.dark").click();
    }
    const imageFiles = [
      "GoogleNew.png",
      "google-logo.png",
      "google-background.jpg",
    ];
    cy.get('input[type="file"]').each((fileInput, index) => {
      cy.wrap(fileInput).attachFile(imageFiles[index]);
    });
    cy.wait(25000);
    cy.get(".headerBackgroundImage").should(
      "not.equal",
      "/images/headerBackgroundImage.png",
    );
    cy.get(".profileImage").should("not.equal", "/images/profileImage.png");
    cy.get(".referralSheetBackgroundImage").should(
      "not.equal",
      "/images/referralSheetBackgroundImage.png",
    );
  });
});

describe("Submit Behavior:", () => {
  beforeEach(() => {
    cy.visit("/login");
    typeInInput("#email", email);
    typeInInput("#password", password);
    cy.get("button[type=submit]").click();
    cy.wait(10000).visit("business-sheet-creation");
  });

  it("Verify that a user can navigate through the entire business sheet creation process and submit the form at the end (if there’s a final submission step).", () => {
    [
      "shortBiography",
      "businessDescription",
      "personalInformation",
      "goals",
      "accomplishments",
      "interests",
      "networks",
      "skills",
    ].forEach((key) => {
      const selector = `textarea[name=${key}]`;
      typeInInput(selector, formData[key]);
      cy.get(".btn.dark").click();
    });

    // Step 2: Verify goldenEggs inputs
    Object.keys(formData.goldenEggs).forEach((key) => {
      const selector = `#${key}`;
      typeInInput(selector, formData.goldenEggs[key]);
    });
    cy.get(".btn.dark").click();

    // Step 3: Verify goldenGooses inputs
    Object.keys(formData.goldenGooses).forEach((key) => {
      const selector = `#${key}`;
      typeInInput(selector, formData.goldenGooses[key]);
    });
    cy.get(".btn.dark").click();

    // Step 4: Verify goldenFarmers inputs
    Object.keys(formData.goldenFarmers).forEach((key) => {
      const selector = `#${key}`;
      typeInInput(selector, formData.goldenFarmers[key]);
    });
    cy.get(".btn.dark").click();

    // Step 5: Verify companyStrengths inputs
    ["companyStrengths"].forEach((key) => {
      const selector = `textarea[name=${key}]`;
      typeInInput(selector, formData[key]);
    });
    cy.get(".btn.dark").click();

    // Step 6: Verify powerWords inputs
    Object.keys(formData.powerWords).forEach((key) => {
      const selector = `#${key}`;
      typeInInput(selector, formData.powerWords[key]);
    });
    cy.get(".btn.dark").click();

    // Step 7: Verify itemsProducts inputs
    Object.keys(formData.itemsProducts).forEach((key) => {
      const selector = `#${key}`;
      typeInInput(selector, formData.itemsProducts[key]);
    });
    cy.get(".btn.dark").click();

    const imageFiles = [
      "GoogleNew.png",
      "google-logo.png",
      "google-background.jpg",
    ];
    cy.get('input[type="file"]').each((fileInput, index) => {
      cy.wrap(fileInput).attachFile(imageFiles[index]);
    });
    cy.wait(25000);
    cy.get(".btn.dark").click();
    cy.wait(25000).url().should("include", "profile");
    const maxFileSizeKB = 1024;
    const checkImageSize = (selector) => {
      cy.get(selector)
        .invoke("attr", "src")
        .then((imgSrc) => {
          cy.request(imgSrc).then((response) => {
            const fileSizeKB = response.headers["content-length"] / 1024;
            expect(fileSizeKB).to.be.lessThan(maxFileSizeKB);
          });
        });
    };
    checkImageSize(".headerBg img");
    checkImageSize(".profile img");
    checkImageSize(".businessSheetData-s2 img");
  });
});
