function selectDayFromCurrent(day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleString('default', {month: 'short'});
    let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttr => {
        if(!dateAttr.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
        }
        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
    })

    return dateAssert;
}

export class DatepickerPage {

    selectCommonDatepickerDate(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('[placeholder="Form Picker"]').then( input => {
            cy.wrap(input).click();
            let dateAssert = selectDayFromCurrent(dayFromToday);
            cy.wrap(input).invoke("prop", "value").should("equal", dateAssert);
            cy.wrap(input).should('have.value', dateAssert);
        })
    }

    selectDatepickerWithRange(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('[placeholder="Range Picker"]').then( input => {
            cy.wrap(input).click();
            let dateAssertFirst = selectDayFromCurrent(firstDay);
            let dateAssertSecond = selectDayFromCurrent(secondDay);
            let finalDate = `${dateAssertFirst} - ${dateAssertSecond}`;
            cy.wrap(input).should('have.value', finalDate);
        })
    }
}

export const onDatepickerPage = new DatepickerPage();