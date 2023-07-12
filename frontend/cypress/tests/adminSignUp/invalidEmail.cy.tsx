import React from "react";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";
import AdminSignUp from "@/components/adminSignUp/adminSignUp";

const pathname = "/admin";

describe("<AdminSignUp />", () => {
  // THE BROWSER ALREADY BLOCKS SUBMITTING THE FORM IF THE EMAIL HAS NO @
  it("Should be an invalid email", () => {
    const push = cy.stub();
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });
    cy.stub(NextRouter, "useRouter").returns({ pathname, push });
    cy.mount(
      <Localization>
        <AdminSignUp />
      </Localization>
    );
    cy.get('[data-cy="name"]').type("Miguel");
    cy.get('[data-cy="email"]').type("teste_gmail.com");
    cy.get('[data-cy="password"]').type("Bestpass123@");
    cy.get('[data-cy="confirmPassword"]').type("Bestpass123@");
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("not.be.calledWith", "able to sign up");
    cy.get("@consoleLog").should("not.be.calledWith", "unable to sign up");
  });
});
