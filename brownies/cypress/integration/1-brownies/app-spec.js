describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.intercept('/getPins', {fixture: "getPins.json"})
      cy.visit('http://localhost:3000')
    })

    it('look for app', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('.App h1').should('have.text', 'Brownies Are Cookies')
    })

})


cy.get("text-center").contains("which would you prefer")
cy.get(".btn").contains("About").click()
cy.url().should('include', '#about-container')
next button, check next url