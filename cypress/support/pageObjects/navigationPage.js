export class NavigationPage {

    formTab() {
        cy.contains("Forms").click();
    }
    modalOverlaysTab() {
        cy.contains("Modal & Overlays").click();
    }

    tablesDataTab() {
        cy.contains("Tables & Data").click();
    }

    formLayoutPage() {
        cy.contains("Form Layouts").click();
    }

    datepickerPage() {
        cy.contains("Datepicker").click();
    }

    toastrPage() {
        cy.contains("Toastr").click();
    }

    tooltipPage() {
        cy.contains("Tooltip").click();
    }

    smartTablePage() {
        cy.contains("Smart Table").click();
    }

}

export const naviTo = new NavigationPage()