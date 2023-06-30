import React from "react";
import SignUpForm from "../../../components/signUpForm/signUpForm";
import Localization from "@/cypress/utils/localization";
import * as NextRouter from "next/router";

import Home from "@/pages";

const pathname = "/";

describe("<Home />", () => {
  it("Should be a valid campaign", () => {
    const push = cy.stub();
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });
    cy.stub(NextRouter, "useRouter").returns({ pathname, push });
    cy.mount(
      <Localization>
        <Home />
      </Localization>
    );    
    cy.get('[data-cy="submit"]').click();
    cy.get("@consoleLog").should("be.calledWith", "cant procceed");
  });
});
