/* eslint-disable no-undef */
describe("Page Load and Basic Structure Verification:", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email").type("hakamha8@gmail.com");
    cy.get("#password").type("Hakamaldeen17");
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.visit("/member-list");
  });

  it("Verify that the member-list page loads successfully.", () => {
    cy.visit("/member-list");
    cy.url().should("include", "member-list");
  });

  it("Confirm the page contains the heading “メンバー一覧”.", () => {
    cy.get("h2").should("be.visible").and("contain", "メンバー一覧");
  });

  it("Check that each member has: An image, name (e.g., “正岡夏門”), A category or job title (e.g., “UI/UX デザイン”).", () => {
    cy.get(".member-list .user-card").each(($el, index) => {
      cy.wrap($el).find("img").should("be.visible");
      cy.wrap($el).find(".user-position").should("be.visible");
      cy.wrap($el).find(".user-name").should("be.visible");
    });
  });
});

describe("Member Profile Click Navigation with Data Validation:", () => {
  beforeEach(() => {
    // Log in and navigate to the member list page
    cy.visit("/login");
    cy.get("#email").type("hakamha8@gmail.com");
    cy.get("#password").type("Hakamaldeen17");
    cy.get('button[type="submit"]').click();
    cy.wait(10000); // Adjust or replace with more reliable waiting mechanism
    cy.visit("/member-list");
  });

  it("The user is navigated to the correct details page for each member and data is validated.", () => {
    // Ensure there are user cards available
    cy.get(".member-list .user-card")
      .should("have.length.greaterThan", 0)
      .then((userCards) => {
        const totalUsers = userCards.length;
        for (let i = 0; i < totalUsers; i++) {
          // Ensure there's an element at the current index before proceeding
          cy.get(".member-list .user-card")
            .eq(i)
            .should("exist")
            .then((userCard) => {
              // Directly target the link inside the user card
              cy.wrap(userCard)
                .find("a")
                .invoke("attr", "href")
                .then((href) => {
                  const id = href.split("/").pop();
                  cy.log(`Setting up intercept for Member ID: ${id}`);

                  // Set up the intercept before clicking
                  cy.intercept("GET", `**/business-sheets/${id}`, (req) => {
                    req.headers["Cache-Control"] = "no-cache";
                    req.headers["Pragma"] = "no-cache";
                  }).as("getMemberDetails");

                  // Click the link to go to the member details page
                  cy.wrap(userCard)
                    .find("a")
                    .invoke("removeAttr", "target")
                    .then(() => {
                      cy.visit(`/preview/${id}`);
                    });

                  cy.wait("@getMemberDetails", { timeout: 15000 }).then(
                    (interception) => {
                      // Log the status code for debugging
                      cy.log(
                        `API Response Status Code: ${interception.response.statusCode}`,
                      );

                      // Check if the response was successful
                      if (
                        interception.response &&
                        (interception.response.statusCode === 200 ||
                          interception.response.statusCode === 304)
                      ) {
                        const businessSheetData = interception.response.body;
                        cy.log("Business Sheet Data:", businessSheetData);

                        // Validate each field on the member details page
                        [
                          "shortBiography",
                          "businessDescription",
                          "personalInformation",
                          "goals",
                          "accomplishments",
                          "interests",
                          "networks",
                          "skills",
                          "companyStrengths",
                        ].forEach((key) => {
                          if (businessSheetData[key]) {
                            // Log each key-value pair for debugging
                            cy.log(
                              `Validating key: ${key} with value: ${businessSheetData[key]}`,
                            );

                            // Split the data by newline if it contains any
                            const values = businessSheetData[key].split("\n");

                            // Validate if each part of the data appears on the details page
                            cy.url().should("include", "preview");

                            values.forEach((value) => {
                              cy.contains(value.trim(), { timeout: 10000 });
                            });
                          } else {
                            // Log if the key is missing
                            cy.log(
                              `Key ${key} not found in businessSheetData.`,
                            );
                          }
                          // Verify array fields after reload
                          // Function to verify array fields after reload
                          const verifyArrayData = (arrayData, arrayName) => {
                            if (
                              Array.isArray(arrayData) &&
                              arrayData.length > 0
                            ) {
                              arrayData.forEach((item, index) => {
                                if (item) {
                                  // Log each item for debugging
                                  cy.log(
                                    `Validating item in ${arrayName} at index ${index} with value: ${item}`,
                                  );

                                  // Split the data by newline if it contains any
                                  const values = item.split("\n");

                                  // Validate if each part of the data appears on the details page
                                  cy.url().should("include", "preview");

                                  values.forEach((value) => {
                                    cy.contains(value.trim(), {
                                      timeout: 10000,
                                    });
                                  });
                                } else {
                                  // Log if the item is missing
                                  cy.log(
                                    `Item in ${arrayName} at index ${index} is empty or undefined.`,
                                  );
                                }
                              });
                            } else {
                              // Log if the arrayData is undefined or empty
                              cy.log(`${arrayName} is undefined or empty.`);
                            }
                          };

                          // Call verifyArrayData for each array
                          verifyArrayData(
                            businessSheetData.goldenEgg,
                            "goldenEgg",
                          );
                          verifyArrayData(
                            businessSheetData.goldenFarmer,
                            "goldenFarmer",
                          );
                          verifyArrayData(
                            businessSheetData.goldenGoose,
                            "goldenGoose",
                          );
                          verifyArrayData(
                            businessSheetData.powerWords,
                            "powerWords",
                          );
                          verifyArrayData(
                            businessSheetData.itemsProducts,
                            "itemsProducts",
                          );

                          // Verify the images
                          cy.get(".headerBg img")
                            .invoke("attr", "src")
                            .should(
                              "include",
                              `${businessSheetData.headerBackgroundImageUrl}`,
                            );
                          cy.get(".profile img")
                            .invoke("attr", "src")
                            .should(
                              "include",
                              `${businessSheetData.profileImageUrl}`,
                            );
                          cy.get(".businessSheetData-s2 img")
                            .invoke("attr", "src")
                            .should(
                              "include",
                              `${businessSheetData.referralSheetBackgroundImageUrl}`,
                            );
                        });
                      } else {
                        cy.log("Failed to fetch member details.");
                      }
                    },
                  );
                });
            });

          // Go back to the member list page and wait for it to load
          cy.go("back");
          cy.wait(3000);
        }
      });
  });
});
