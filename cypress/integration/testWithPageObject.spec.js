const { naviTo } = require("../support/pageObjects/navigationPage");
const { onFormLayout } = require("../support/pageObjects/formLayoutPage");
const { onDatepickerPage } = require("../support/pageObjects/datepickerPage");
const { onSmartTablePage } = require("../support/pageObjects/smartTablePage");


describe('Test with page objects', () => {

    beforeEach('open app', () => {
        cy.openHomePage();
    })

    it('verify navigation', () => {
        naviTo.formTab();
        naviTo.formLayoutPage();
        naviTo.datepickerPage();
        naviTo.modalOverlaysTab();
        naviTo.toastrPage();
        naviTo.tooltipPage();
        naviTo.tablesDataTab();
        naviTo.smartTablePage();
    })

    it.only('shoul sumbit Inline and Basic form and select tomorrow date in the calendar', () => {
        naviTo.formTab();
        naviTo.formLayoutPage();
        onFormLayout.submitInlineForm('DD', 'test@test.com');
        onFormLayout.submitBasicForm('test@test.com', 'test');
        naviTo.datepickerPage();
        onDatepickerPage.selectCommonDatepickerDate(1);
        onDatepickerPage.selectDatepickerWithRange(1, 3);
        naviTo.tablesDataTab();
        naviTo.smartTablePage();
        onSmartTablePage.modifyAgeByFirstName('Larry', '25');
        onSmartTablePage.addNewPerson('Dim', 'Dred');
        onSmartTablePage.deleteRowByIndex(0);
    })
})