/// <reference types="cypress" />

describe("Markers", () => {
  before(() => {
    cy.visit("/");
  });
  
  beforeEach(() => {
    // Open the markers panel
    cy.get('button[aria-label="Markers"],button[title="Markers"]')
      .should("be.visible")
      .click();

    cy.contains(/markers/i).should("be.visible");
  });

  it("can add a marker", () => {
    cy.get('button[aria-label="Add Marker"],button[title="Add Marker"]')
      .first()
      .click();

    // Click on the map at coordinates (0, 0) using the map container
    cy.get(".map-container svg").first().click(0, 0, { force: true });

    // Fill in the marker details
    cy.get('input[placeholder="Marker name"],input[name="name"]')
      .should("be.visible")
      .type("Test Marker");
    cy.get(
      'input[name="description"],input[placeholder="Description (optional)"]'
    ).type("This is a test marker.");

    // Save the marker
    cy.get("form").within(() => {
      cy.contains("button", "Add Marker").click();
    });

    cy.contains("Test Marker").should("exist");
  });

  it("can edit a marker", () => {
    // Click the marker in the list to select it
    cy.get(".panel-list-item").contains("Test Marker").click();

    // Click the edit button for that marker
    cy.get(".panel-list-item")
      .contains("Test Marker")
      .parents(".panel-list-item")
      .find('button[aria-label="Edit"],button[title="Edit"]')
      .click();

    // Fill in the new name in the modal form
    cy.get('input[placeholder="Marker name"],input[name="name"]')
      .clear()
      .type("Updated Marker");

    // Click the submit button inside the modal form
    cy.get("form").within(() => {
      cy.contains("button", "Save Changes").click();
    });

    // Assert the updated marker appears
    cy.contains("Updated Marker").should("exist");
  });

  it("can delete a marker", () => {
    // Click the marker in the list to select it
    cy.get(".panel-list-item").contains("Updated Marker").click();

    // Click the delete button for that marker
    cy.get(".panel-list-item")
      .contains("Updated Marker")
      .parents(".panel-list-item")
      .find('button[aria-label="Remove"],button[title="Remove"]')
      .click();

    // Assert the marker is gone
    cy.contains("Updated Marker").should("not.exist");
  });
});
