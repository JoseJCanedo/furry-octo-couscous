describe('mars spec test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/mars')
    })

    it('look for current days picture to load', () => {
        //before each runs
        cy.get('.App h1').should('have.text', 'Hello World!')
        cy.get(".search-input-lass-name").type("buzz lightyear")
        cy.get(".search-button").click()
    })

    it('test date chosen loads', () => {
        //before each runs
        cy.get(".search-calendar").type("11/11/2010")
        cy.get(".search-button").click()
       // cy.get(... make sure data loaded)
    })

})