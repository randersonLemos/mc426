import React from "react";
import Admin from "@/pages/admin/dashboard";
// import SendMessageForm from "@/components/sendMessageForm/sendMessageForm";
import * as NextRouter from "next/router";

const pathname = "/admin/dashboard";

describe("<SendMessageForm />", () => {
  it("No message - Should not send message", () => {
    const push = cy.stub();

    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });

    cy.stub(NextRouter, "useRouter").returns({ pathname, push });

    cy.mount(<Admin />);

    cy.get('[aria-label="Select all rows"]').click();
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("not.be.calledWith", "cant send");
    cy.get("@consoleLog").should("not.be.calledWith", "can send");
  });
});
