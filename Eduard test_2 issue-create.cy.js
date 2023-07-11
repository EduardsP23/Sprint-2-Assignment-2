import { faker } from '@faker-js/faker';

/* 
TEST 2
*/

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

const randomTitle = faker.animal.cat();
const randomDescription = faker.lorem.sentence();

it('Should create an issue and validate it successfully', () => {
  //System finds modal for creating issue and does next steps inside of it
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    
    //open issue type dropdown and choose type Task
    cy.get('[data-testid="select:type"]').contains('Task');
              
    //Type value to description input field
    cy.get('.ql-editor').type('randomDescription');

    //Issue type
    cy.get('input[name="title"]').type('randomTitle')

    //Select priority Highest
    cy.get('[data-testid="select:priority"]').click()
    cy.get('[data-testid="select-option:Low"]').click()

    //Select Pickle Rick from reporter dropdown
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    cy.get('[data-testid="select:reporterId"]').should('contain','Baby Yoda')

    //Click on button "Create issue"
    cy.get('button[type="submit"]').click();
  });

  //Assert that modal window is closed and successful message is visible
  cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');
  
  //Reload the page to be able to see recently created issue
  //Assert that successful message has dissappeared after the reload
  cy.reload();
  cy.contains('Issue has been successfully created.').should('not.exist');

  //Assert than only one list with name Backlog is visible and do steps inside of it
  cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    //Assert that this list contains 5 issues and first element with tag p has specified text
    cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('randomTitle');
    //Assert that correct avatar and type icon are visible
    cy.get('[data-testid="icon:story"]').should('be.visible');
  });
});
});
