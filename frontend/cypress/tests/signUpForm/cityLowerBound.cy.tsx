import React from "react";
import SignUpForm from "../../../components/signUpForm/signUpForm";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";

const pathname = "/";

describe("<SignUpForm />", () => {
  it("3 characters (lower bound) - Should be valid", () => {
    const push = cy.stub();
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });
    cy.stub(NextRouter, "useRouter").returns({ pathname, push });
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    );
    cy.get('[data-cy="name"]').type("Miguel");
    cy.get('[data-cy="email"]').type("teste100@gmail.com");
    cy.get('[data-cy="city"]').type("São");
    cy.get('[data-cy="phone"]').type("19999999996");
    cy.get("#birth").type("08102000");
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "login successful");
  });

  it("2 characters (lower bound) - Should be invalid", () => {
    const push = cy.stub();
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });
    cy.stub(NextRouter, "useRouter").returns({ pathname, push });
    cy.mount(
      <Localization>
        <SignUpForm />
      </Localization>
    );
    cy.get('[data-cy="name"]').type("Miguel");
    cy.get('[data-cy="email"]').type("teste100@gmail.com");
    cy.get('[data-cy="city"]').type("Sã");
    cy.get('[data-cy="phone"]').type("19999999996");
    cy.get("#birth").type("08102000");
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "login failed");
  });
});
