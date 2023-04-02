/// <reference types="cypress" />
//import { slowCypressDown } from "cypress-slow-down";

// Slow cypress tests for debugging purposes.
//slowCypressDown(250);

// This is just a simple sample of an E2E Test using Cypress.
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should show welcome message", () => {
    cy.get("[data-test='msg-welcome']")
      .should("be.visible")
      .should("contain", "We are PackShop");
  });

  it("Should show marketing message", () => {
    cy.get("[data-test='sample-text']")
      .should("be.visible")
      .should("contain", "Soon delivering all kind of goods to you");
  });

  it("Should contain a message box that receive and remove messages", () => {
    cy.get("[data-test='form-message-box'").should("be.visible");

    cy.get("[data-test='list-msg']")
      .should("exist")
      .children()
      .should("have.length", 0);

    cy.get("[data-test='input-msg']")
      .should("be.visible")
      .focus()
      .type("My name is Tatsu!{enter}");

    cy.get("[data-test='list-msg']").children().should("have.length", 1);

    cy.get("[data-test='input-msg']")
      .focus()
      .type("And my name is Miku!{enter}");

    cy.get("[data-test='list-msg']").children().should("have.length", 2);

    cy.get("[data-test='list-msg']")
      .children()
      .first()
      .should("contain", "My name is Tatsu!")
      .next()
      .should("contain", "And my name is Miku!");

    cy.get("[data-test='list-msg']")
      .children()
      .first()
      .find("[data-test='btn-rmv-msg']")
      .click();

    cy.get("[data-test='list-msg']").children().should("have.length", 1);

    cy.get("[data-test='list-msg']")
      .children()
      .first()
      .find("[data-test='btn-rmv-msg']")
      .click();

    cy.get("[data-test='list-msg']").children().should("have.length", 0);
  });

  after(() => {
    // Ensure recordings are ended properly.
    cy.wait(250);
  });
});
