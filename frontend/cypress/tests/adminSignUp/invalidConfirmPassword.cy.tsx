import React from "react";
import AdminSignUp from "@/components/adminSignUp/adminSignUp";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";

const pathname = "/admin";

describe("<AdminSignUp />", () => {
  it("Should be an invalid confirm password", () => {
    const push = cy.stub();
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });

    cy.stub(NextRouter, "useRouter").returns({ pathname, push });
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Localization>
        <AdminSignUp />
      </Localization>
    );

    cy.get('[data-cy="name"]').type("Miguel");
    cy.get('[data-cy="email"]').type("teste@gmail.com");
    cy.get('[data-cy="password"]').type("Bestpass123@");
    cy.get('[data-cy="confirmPassword"]').type("Bestpass123");
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "unable to sign up");
  });
});
