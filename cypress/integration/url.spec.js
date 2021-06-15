describe('Url Shortener', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', { fixture: 'test-data.json' })
      .visit('http://localhost:3000')
  })

    it('should display a page title and existing shortened URLs', () => {
      cy.get('h1').should('be.visible').should('contain', 'URL Shortener')
    })
})