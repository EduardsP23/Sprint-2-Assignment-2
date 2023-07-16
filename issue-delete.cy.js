describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      // System will already open issue in beforeEach block  
      cy.visit(url + '/board');
      cy.contains("This is an issue of type: Task.").click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });


  /*
  Test 1
  */

  it('Delete an issue', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Delete issue');
    cy.get('[data-testid="modal:confirm"]').find('button:contains("Delete issue")').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '3')
        .first()
        .find('p');
      cy.get('[data-testid="list-issue"]').find('p').contains('Task').should('not.exist');
    });
  });


  /*
  Test 2
  */
  it('Starting the deleting issue process, but cancelling this action', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Cancel');
    cy.get('[data-testid="modal:confirm"]').find('button:contains("Cancel")').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', '4');
      cy.get('[data-testid="list-issue"]')
        .first()
        .find('p');
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="list-issue"]').find('p').contains('Task').should('exist');
    });
  });
});
