export class SmartTablePage {

    modifyAgeByFirstName(firstName, age) {
        cy.get('tbody').contains('tr', firstName).then( row => {
            cy.wrap(row).find('.nb-edit').click();
            cy.wrap(row).find('[placeholder="Age"]').clear().type(age);
            cy.wrap(row).find('.nb-checkmark').click();
            cy.wrap(row).find('td').eq(6).should('contain', age);
        })
    }

    addNewPerson(firstName, lastName) {
        cy.get('thead .nb-plus').click();
        cy.get('input-editor [placeholder="First Name"]').type(firstName);
        cy.get('input-editor [placeholder="Last Name"]').type(lastName);
        cy.get('.nb-checkmark').click();
        cy.get('tbody').find('tr').first().find('td').eq(2).should('contain', firstName)
        cy.get('tbody').find('tr').first().find('td').eq(3).should('contain', lastName)
    }

    deleteRowByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub)
        cy.get('tbody').find('tr').eq(index).find('.nb-trash').click().then( () => {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
    })
    }

}

export const onSmartTablePage = new SmartTablePage()