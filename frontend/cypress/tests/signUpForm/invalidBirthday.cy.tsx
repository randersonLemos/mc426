import React from "react";
import SignUpForm from "../../../components/signUpForm/signUpForm";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";

const pathname = "/";

describe("<SignUpForm />", () => {
  it("After today Should not be a valid birthday", () => {
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
    cy.get('[data-cy="city"]').type("Campinas");
    cy.get('[data-cy="phone"]').type("19999999996");
    const today = new Date();
    cy.get("#birth").type(
      `${today.getDay() + 1}${today.getMonth() + 1}${today.getFullYear()}`
    ); // today
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "login failed");
  });

  // MUI COMPONENT FIXS FEBRUARY 30

  it("3-digit year Should not be a valid birthday", () => {
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
    cy.get('[data-cy="city"]').type("Campinas");
    cy.get('[data-cy="phone"]').type("19999999996");
    cy.get("#birth").type("0102999"); // Year 999
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "login failed");
  });

  const newArr: number[] = new Array(12).fill(0);
  // Testing day 32 of all months
  it(`Day 32/MM/2000 Should not be a valid birthday`, () => {
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
    cy.get('[data-cy="city"]').type("Campinas");
    cy.get('[data-cy="phone"]').type("19999999996");
    cy.wrap(newArr).each((el, index) => {
      cy.get("#birth").clear();
      if (index < 10) {
        cy.get("#birth").type(`320${index + 1}2000`); // day 32
      } else {
        cy.get("#birth").type(`32${index + 1}2000`); // day 32
      }
      cy.get('[data-cy="submit"]').click();

      cy.get("@consoleLog").should("be.calledWith", "login failed");
    });
  });

  it(`Month 13/2000 Should not be a valid birthday`, () => {
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
    cy.get('[data-cy="city"]').type("Campinas");
    cy.get('[data-cy="phone"]').type("19999999996");
    cy.wrap(newArr).each((el, index) => {
      cy.get("#birth").clear();
      if (index < 10) {
        cy.get("#birth").type(`0${index + 1}/13/2000`); // day 32
      } else {
        cy.get("#birth").type(`${index + 1}/13/2000`); // day 32
      }
      cy.get('[data-cy="submit"]').click();

      cy.get("@consoleLog").should("be.calledWith", "login failed");
    });
  });
});
