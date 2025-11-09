/// <reference types="cypress" />

describe("Atlaset: View France Details", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("finds France, shows details, and closes the details modal", () => {
    // Search for France
    cy.get('input[placeholder*="Search"]').type("France");

    // Click on France in the results
    cy.contains("France").should("be.visible").click();

    // Assert that the country details modal appears
    cy.contains(/France|Country Details/i).should("be.visible");

    // Close the country details modal (scoped to modal)
    cy.get('button[aria-label="Close country details"]')
      .first()
      .click({ force: true });

    // Assert that the country details modal is closed (not visible)
    cy.get('button[aria-label="Close country details"]').should("not.exist");
  });

  it("finds Germany, shows details, and closes the details modal with keyboard", () => {
    // Search for Germany
    cy.get('input[placeholder*="Search"]').type("Germany");

    // Hover over the Germany list item, then press Enter
    cy.contains("li", "Germany")
      .should("be.visible")
      .trigger("mouseover")
      .trigger("keydown", { key: "Enter", code: "Enter", which: 13 });

    // Assert that the country details modal appears
    cy.contains(/Germany|Country Details/i).should("be.visible");

    // Close the modal with Escape key
    cy.get("body").type("{esc}");

    // Assert that the country details modal is closed (not visible)
    cy.get('button[aria-label="Close country details"]').should("not.exist");

    // Assert that the countries panel is closed (not visible)
    cy.get('input[placeholder*="Search"]').should("be.hidden");
  });
});
