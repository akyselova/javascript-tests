const convertPrice = (price) => {
    return parseInt(price.substr(2, price.length).replace(/[^\d]/g, ''))
}

describe ('Search, filter and sort cars functionality:', function() {
    beforeEach(() => {
        cy.fixture('cars').as('car')
        cy.visit('/')
    })
    
    it('Should be possible to find car by brand and model', function() {
        const { brand, model } = this.car.carTest
        cy
            .selectCheckboxFromDropdown('[data-e2e-id=brandDropdown]', brand.toLowerCase())
            .selectCheckboxFromDropdown('[data-e2e-id=modelDropdown]', model.toLowerCase())
        cy
            .get('[data-e2e-id=searchButton]')
            .click()
        cy
            .url()
            .should('include', `${brand.toLowerCase()}/${model.toLowerCase()}`)
        cy
            .get('[data-e2e-id=cardCarBrand]')
            .each(($elem) => {
                expect($elem).to.have.text(brand)
        })
        cy
            .get('[data-e2e-id=cardCarModel]')
            .each(($elem) => {
                expect($elem).to.have.text(model)
        })
    })
    
    it('Should show correct results if filter and sort', function() {
        const minimumPrice = 15000
        const maximumPrice = 20000
        const transmission = 'Manual'
        const sortingType = 'price'
        let prices = []
        
        cy.visit('/cars')
        cy
            .selectOptionFromDropdown('#salePriceFrom select', minimumPrice)
            .selectOptionFromDropdown('#salePriceTo select', maximumPrice)
            .get('[type=checkbox]')
            .check(transmission.toLowerCase(), {force:true})
            .selectOptionFromDropdown('[data-e2e-id=sortingDropdown] select', sortingType)
            .wait(1000)
        
        cy.get('[data-e2e-id=carBuyPrice]').each(($elem) => {
            const price = $elem.text()
            if (price !== 'Sold') {
                const convertedPrice = convertPrice(price)
                expect(convertedPrice).to.be.greaterThan(minimumPrice)
                expect(convertedPrice).to.be.lessThan(maximumPrice)
                prices.push(convertedPrice)
            }
        })
        cy.log(prices).then(() => {
            expect(prices[0]).to.be.lessThan(prices[prices.length - 1])
        })
    })
})