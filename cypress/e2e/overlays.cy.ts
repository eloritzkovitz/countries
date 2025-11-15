/// <reference types="cypress" />

describe("Overlays", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('button[aria-label="Overlays"],button[title="Overlays"]')
      .should("be.visible")
      .click();
    cy.contains(/overlays/i).should("be.visible");
  });

  const overlayName = `Test Overlay`;
  const updatedOverlayName = `Updated Overlay`;

  it("can add an overlay", () => {
    cy.get('button[aria-label="Add Overlay"],button[title="Add Overlay"]')
      .first()
      .click();

    cy.get('input[placeholder="Name"],input[name="name"]')
      .should("be.visible")
      .type(overlayName);

    cy.get("form").within(() => {
      cy.contains("button", "Add Overlay").click();
    });

    cy.contains(overlayName).should("exist");
  });

  it("can edit an overlay", () => {
    // Edit overlay
    cy.get(".panel-list-item").contains(overlayName).click();
    cy.get(".panel-list-item")
      .contains(overlayName)
      .parents(".panel-list-item")
      .find('button[aria-label="Edit"],button[title="Edit"]')
      .click();
    cy.get('input[placeholder="Name"],input[name="name"]')
      .clear()
      .type(updatedOverlayName);
    cy.get("form").within(() => {
      cy.contains("button", "Save Changes").click();
    });

    // Wait for updated overlay to appear
    cy.contains(updatedOverlayName).should("exist");
  });

  it("can delete an overlay", () => {
    // Delete overlay
    cy.get(".panel-list-item").contains(updatedOverlayName).click();
    cy.get(".panel-list-item")
      .contains(updatedOverlayName)
      .parents(".panel-list-item")
      .find('button[aria-label="Remove"],button[title="Remove"]')
      .click();

    // Wait for overlay to be removed
    cy.contains(updatedOverlayName).should("not.exist");
  });
});
