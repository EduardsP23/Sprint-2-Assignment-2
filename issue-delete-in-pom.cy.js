
/*
ASSIGNMENT 4: COVER ISSUE DELETION FUNCTIONALITY USING POM APPROACH
*/

import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board');
      cy.contains(issueTitle).click();
    });
  });

  const issueTitle = 'This is an issue of type: Task.';

  it('Delete Issue', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });


  it('Starting the deleting issue process, but cancelling this action', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
  });
});

