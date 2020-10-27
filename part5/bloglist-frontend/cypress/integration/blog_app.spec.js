describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3002/api/test/reset");
    cy.request("POST", "http://localhost:3002/api/users", {
      username: "krypton",
      password: "123Abc3ewq",
      name: "Jamie",
    });
    cy.request("POST", "http://localhost:3002/api/users", {
      username: "kryton",
      password: "123Abc3ewq",
      name: "Kanye",
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
    describe("When logged in", function () {
      beforeEach(function () {
        cy.login("krypton", "123Abc3ewq");
      });
      it("A blog can be created", function () {
        cy.contains("new note").click();
        cy.get("#title").type("What is going on");
        cy.get("#author").type("Abdoollah");
        cy.get("#url").type("http://www.google.com");
        cy.get("#createblog").click();
        cy.contains("What is going on");
      });
      it("A blog can be liked", function () {
        cy.addBlog("How to be fun", "Jackall", "http://www.iksf.com");
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes: 1");
      });
      it("A blog can be removed by the creator", function () {
        cy.addBlog("How to be fun", "Jackall", "http://www.iksf.com");
        cy.contains("view").click();
        cy.contains("remove").click();
        cy.get("html").should("not.contain", "How to be fun");
      });
      it("A blog cannot be removed by other users", function () {
        cy.addBlog("How to be fun", "Jackall", "http://www.iksf.com");
        cy.contains("logout").click();
        cy.login("kryton", "123Abc3ewq");
        cy.contains("view").click();
        cy.get("html").should("not.contain", "remove");
      });
    });
  });
});
