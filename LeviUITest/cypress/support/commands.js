// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('selectCheckboxFromDropdown', (dropdown, checkboxValue) => {
    cy
            .get(dropdown)
            .click()
    cy
            .get('[type=checkbox]')
            .check(checkboxValue, {force:true})
})

Cypress.Commands.add('selectOptionFromDropdown', (select, optionValue) => {
    cy
            .get(select)
            .last()
            .select(optionValue.toString(), {force:true})
})

Cypress.Commands.add('convertPrice', priceString => {
    const pr = priceString.substr(2, priceString.length).replace(/[^\d]/g, '')
    return parseInt(pr)
})
