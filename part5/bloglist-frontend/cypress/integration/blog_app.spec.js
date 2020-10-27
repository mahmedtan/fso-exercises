describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3002/api/test/reset");
    cy.request("POST", "http://localhost:3002/api/users", {
      username: "krypton",
      password: "123Abc3ewq",
      name: "Jamie",
    });
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.get("form")
      .should("contain", "username")
      .and("contain", "password")
      .and("contain", "Login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("krypton");
      cy.get("#password").type("123Abc3ewq");
      cy.get("#login").click();
      cy.contains("Jamie logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("kypton");
      cy.get("#password").type("123Abc3ewq");
      cy.get("#login").click();
      cy.contains("username or password is not correct");
    });
  });
});
