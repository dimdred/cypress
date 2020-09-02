/// <reference types="cypress" />

describe("Our first suit", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by Tad Name
    cy.get("input");

    // by Id
    cy.get("#inputEmail1");

    // by Class Name
    cy.get(".input-full-width");

    // by Attribute Name
    cy.get("[placeholder]");

    // by Attribute Name and Value
    cy.get('[placeholder="Email"]');

    // by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by Tag Nama and Attribute with Value
    cy.get('input[placeholder="Email"]');

    // by two different Attributes
    cy.get('[placeholder="Email"][type="email"]');

    // by Tag Nama, Attribute with Value, Id and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // The most recomended way by Cypress (you own attribute)
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get(
      '[class="appearance-filled size-medium status-primary shape-rectangle transitions"]'
    );
    cy.get('[data-cy="signInButton"]');
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find('[class="custom-checkbox"]')
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

    // selenium style
    // const firstForm = cy.contains('nb-card', 'Using the Grid');
    // const secondForm = cy.contains('nb-card', 'Basic form');

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email');
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password');
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address');

    // cypress style

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordLabelSecond);
        // wrap - return to cypress style
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    // 2
    cy.get('[for="exampleInputEmail1"]').then((inputLabel) => {
      expect(inputLabel.text()).to.equal("Email address");
    });

    //3.1
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .should("contain", "Email address");

    //3.2
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((label) => {
        expect(label).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //.should('contain', 'checked') // cypress style
      .then((checkboxClass) => expect(checkboxClass).to.contain("checked"));
  });

  it("invoke command assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    // cypress style
    cy.get('[placeholder="Form Picker"]')
      .click()
      .get("nb-calendar-day-picker")
      .contains("15")
      .click()
      .get('[placeholder="Form Picker"]')
      .invoke("prop", "value")
      .should("equal", "Aug 15, 2020");

    cy.get('[placeholder="Form Picker"]').then((input) => {
      cy.wrap(input).click();
      cy.get("nb-calendar-day-picker").contains("15").click();
      cy.wrap(input).invoke("prop", "value").should("equal", "Aug 15, 2020");
    });
  });

  it("Date picker", () => {

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
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
        })

        return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.get('[placeholder="Form Picker"]').click();
    let dateAssert = selectDayFromCurrent(5);
    cy.get('[placeholder="Form Picker"]').invoke("prop", "value").should("equal", dateAssert);
  })

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioBtns) => {
        cy.wrap(radioBtns).first().check({ force: true }).should("be.checked");

        cy.wrap(radioBtns).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioBtns).first().should("be.not.checked");

        cy.wrap(radioBtns).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(1).click({ force: true }); // can be used for uncheck
    cy.get('[type="checkbox"]').eq(0).check({ force: true }); // only check, can check all checkboxes
  });

  it("list and dropdown", () => {
    cy.visit("/");

    // 1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();
      cy.get(".options-list nb-option").each((item, index) => {
        const itemText = item.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(item).click();
        cy.wrap(dropDown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropDown).click();
        }
      });
    });
  });

  it("web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    cy.get('tbody').contains('tr', 'Larry').then( row => {
        cy.wrap(row).find('.nb-edit').click();
        cy.wrap(row).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(row).find('.nb-checkmark').click();
        cy.wrap(row).find('td').eq(6).should('contain', '25');
    })

    // 2
    cy.get('thead .nb-plus').click();
    cy.get('input-editor [placeholder="First Name"]').type('Dim');
    cy.get('input-editor [placeholder="Last Name"]').type('Dred');
    cy.get('.nb-checkmark').click();
    cy.get('tbody').find('tr').first().find('td').eq(2).should('contain', 'Dim')
    cy.get('tbody').find('tr').first().find('td').eq(3).should('contain', 'Dred')

    // 3
    const ages = [20, 30, 40];
    cy.wrap(ages).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((row) => {
        cy.wrap(row).find("td").eq(6).should("contain", age);
      });
    });

    // 4
    cy.get('thead [placeholder="Age"]').type(200);
    cy.get('tbody td').should('contain', 'No data found');
  });

  it("tooltip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains('nb-card', 'Colored Tooltips').contains('button', 'Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip');
  })

  it("dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    cy.get('tbody').find('tr').first().find('.nb-trash').click()
    cy.on('window:confirm', (confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?');
    }))

    // 2
    const stub = cy.stub();
    cy.on('window:confirm', stub)
    cy.get('tbody').find('tr').first().find('.nb-trash').click().then( () => {
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
    })

    // 3
    cy.get('tbody').find('tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false);
  })

  it("cypress assertion", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]')
        .should("contain", "Email address")
        .should('have.class', 'label')
        .and('have.text', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        cy.get('#exampleInputEmail1').then( input => {
            expect(input).to.have.id('exampleInputEmail1')
        })
  })
});
