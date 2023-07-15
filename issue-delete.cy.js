describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue in beforeEach block  
      cy.visit(url + '/board');
      cy.contains("This is an issue of type: Task.").click()
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });


  /*
  Test 1
  */

  it('Delete an issue', () => {
    cy.get('[data-testid="button:delete"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Delete issue ?');
    cy.get('[data-testid="modal:confirm"]').find('button: Yes').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').should('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '3')
        .first()
        .find('p')
        .contains('Task');
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:Task"]').should('be.visible');
      cy.get('[data-testid="list-issue"]').find('p').contains('Task').should('not.exist');
    });
  });

  /*
  Test 2
  */
  it('Starting the deleting issue process, but cancelling this action', () => {
    cy.get('[data-testid="button:delete"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Delete issue ?');
    cy.get('[data-testid="modal:confirm"]').find('button: Yes').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').should('have.length', '3').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('Task');
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:Task"]').should('be.visible');
      cy.get('[data-testid="list-issue"]').find('p').contains('Task').should('not.exist');
    });
  });
