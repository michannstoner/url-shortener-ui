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
      .get('section').should('have.length', 1)
  })

  it('should display a form for a user to enter a URL to be shortened', () => {
    cy.get('form').should('be.visible')
      .get('input[name="title"]').should('be.empty').should('be.visible')
      .get('input[name="long_url"]').should('be.empty').should('be.visible')
      .get('button').should('be.visible').should('contain', 'Shorten Please!')
  })

  it('should allow a user to type information in the input fields', () => {
    cy.get('input[name="title"]').type('Title')
      .get('input[name="long_url"]').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
})

describe('POST requests', () => {
  beforeEach(() => {
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3001/api/v1/urls'},
      {
        statusCode: 201,
        body: {
          "id": 2,
          "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          "short_url": "http://localhost:3001/useshorturl/1",
          "title": "Title"
        }
      })
    cy.intercept('http://localhost:3001/api/v1/urls', { fixture: 'test-data.json' })
      .visit('http://localhost:3000')
  })

  it('should display the new shortened URL when the form is submitted', () => {
    cy.get('input[name="title"]').type('Title')
      .get('input[name="long_url"]').type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('button').click()
      cy.get('div').eq(2).should('be.visible')
        .get('h3').should('contain', 'Title').should('be.visible')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/1').should('be.visible')
        .get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80').should('be.visible')
  })
})