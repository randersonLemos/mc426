import React from "react";
import AdminSignIn from "@/components/adminSignIn/adminSignIn";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";

const pathname = "/admin";

describe("<AdminSignIn />", () => {
  it("100 characters (upper bound) - Should be a valid password", () => {
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
        <AdminSignIn />
      </Localization>
    );

    cy.get('[data-cy="email"]').type("teste@gmail.com");
    cy.get('[data-cy="password"]').type(
      "gaQ7&Auo@QDsVRngjVTqseTqzj3rSaDjbWoSAbZf$!mPT*L4atZ2iVMJPT8yYBt8L9&Z8Z&b3%4syWBU^GdVJ@aQTdX#!a5McE%V"
    );
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "able to sign in");
  });

  it("101 characters (upper bound) - Should be an invalid password", () => {
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
        <AdminSignIn />
      </Localization>
    );

    cy.get('[data-cy="email"]').type("teste@gmail.com");
    cy.get('[data-cy="password"]').type(
      "gaQ7&Auo@QDsVRngjVTqseTqzj3rSaDjbWoSAbZf$!mPT*L4atZ2iVMJPT8yYBt8L9&Z8Z&b3%4syWBU^GdVJ@aQTdX#!a5McE%V2"
    );
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "unable to sign in");
  });
});
