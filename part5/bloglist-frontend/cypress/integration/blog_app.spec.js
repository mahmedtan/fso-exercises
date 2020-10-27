describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3002/api/test/reset");
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.get("form")
      .should("contain", "username")
      .and("contain", "password")
      .and("contain", "Login");
  });
});
