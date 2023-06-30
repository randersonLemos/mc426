import React from "react";
import Admin from "@/pages/admin/dashboard";
// import SendMessageForm from "@/components/sendMessageForm/sendMessageForm";
import * as NextRouter from "next/router";

const pathname = "/admin/dashboard";

describe("<SendMessageForm />", () => {
  it("Empty recipients - Should not send message", () => {
    const push = cy.stub();

    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("consoleLog");
      });

    cy.stub(NextRouter, "useRouter").returns({ pathname, push });

    cy.mount(<Admin />);

    cy.get('[data-cy="message"]').type("Hello world");
    cy.get(".MuiDataGrid-row").should("have.attr", "aria-selected", "false");
    cy.get('[data-cy="submit"]').click();

    cy.get("@consoleLog").should("be.calledWith", "cant send");
  });
});
