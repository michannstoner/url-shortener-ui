describe('Url Shortener', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', { fixture: 'test-data.json' })
      .visit('http://localhost:3000')
  })

    it('should display a page title and existing shortened URLs', () => {
      cy.get('h1').should('be.visible').should('contain', 'URL Shortener')
        .get('.url').should('be.visible')
          .get('h3').should('be.visible').should('contain', 'Awesome photo')
          .get('a').should('be.visible').should('contain', 'http://localhost:3001/useshorturl/1')
          .get('p').should('be.visible').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    })
})