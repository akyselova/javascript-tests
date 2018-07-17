var homePage;
var loginPage;
var userHomePage;
var registerPage;
var username, email;

module.exports = {

    before: function(client) {
        homePage = client.page.homePage();
        loginPage = client.page.loginPage();
        userHomePage = client.page.userHomePage();
        registerPage = client.page.registerPage();
		username = client.globals.generateUsername(10);
		email = username + '@mailinator.com';
    	console.log('Setting up with user '+username+' and email '+email);
        return homePage, loginPage, userHomePage, registerPage, username. email;
    },

    after: function(client) {
        console.log('Closing down...');
        client.end();
    },

    beforeEach: function() {
        homePage.navigate()
            .waitForElementVisible( '@registerButton', 1000);
    },

    'Landing page should have Register button': function () {
        homePage.expect.element('@registerButton').to.be.visible;
        homePage.expect.element('@registerButton').text.to.equal('REGISTER');
    },
    'Dropdown with Register options should be visible': function() {
        homePage.moveToElement('@registerButton', 10, 10)
            .expect.element('@registerDropdown').to.be.visible;
        homePage.expect.element('@registerPlayerOption').to.be.visible
        homePage.expect.element('@registerTeamOption').to.be.visible;
    },
    'User is navigated to proper regiser flow when selecting a Player option': function (client) {
        homePage.moveToElement('@registerButton', 10, 10)
            .click('@registerPlayerOption');
        registerPage.expect.element('@title').to.be.visible.before(5000);
        client.assert.urlEquals(registerPage.url() + '?origin=player');
    },

    'User is navigated to proper regiser flow when selecting a Team option': function (client) {
        homePage.moveToElement('@registerButton', 10, 10)
            .click('@registerTeamOption');
        registerPage.expect.element('@title').to.be.visible.before(5000);
        client.assert.urlEquals(registerPage.url() + '?origin=team');
    },

    'User can navigate to Register page from Login Page': function(client) {
        loginPage.navigate()
            .expect.element('@title').to.be.visible.before(5000);
        loginPage.expect.element('@registerButton').to.be.visible;
        loginPage.click('@registerButton');
        registerPage.expect.element('@title').to.be.visible.before(5000);
        client.assert.urlEquals(registerPage.url());
    },

    'Register page contains proper title': function() {
        registerPage.navigate()
            .expect.element('@title').to.be.visible.before(5000);
        registerPage.expect.element('@title').text.to.equal('User registration');
    },

    'Register page contains email input': function() {
        registerPage.navigate()
            .expect.element('@emailLabel').to.be.visible;
        registerPage.expect.element('@emailLabel').text.to.contain('Email');
        registerPage.expect.element('@emailInput').to.be.visible;
        registerPage.expect.element('@emailMessage').to.be.visible;
        registerPage.expect.element('@emailMessage').text.to.equal('We won’t share your private email address with other users');
    },

    'Register page contains username input': function() {
        registerPage.navigate()
            .expect.element('@usernameLabel').to.be.visible;
        registerPage.expect.element('@usernameLabel').text.to.contain('Username');
        registerPage.expect.element('@usernameInput').to.be.visible;
        registerPage.expect.element('@usernameMessage').to.be.visible;
        registerPage.expect.element('@usernameMessage').text.to.equal('Username must be 4-30 characters long');
    },

    'Register page contains password input': function() {
        registerPage.navigate()
            .expect.element('@passwordLabel').to.be.visible;
        registerPage.expect.element('@passwordLabel').text.to.contain('Password');
        registerPage.expect.element('@passwordInput').to.be.visible;
        registerPage.expect.element('@passwordMessage').to.be.visible;
        registerPage.expect.element('@passwordMessage').text.to.equal('Minimum 6 characters');
    },

    'Register page contains terms&personal data checkboxes': function() {
        registerPage.navigate()
            .expect.element('@personalDataCheckbox').to.be.visible;
        registerPage.expect.element('@personalDataLabel').to.be.visible;
        registerPage.expect.element('@personalDataLabel').text.to.contain('I Agree to the');
        registerPage.expect.element('@termsCheckbox').to.be.visible;
        registerPage.expect.element('@termsLabel').to.be.visible;
        registerPage.expect.element('@termsLabel').text.to.contain('I Agree to the');
    },

    'Register page contains Register button': function() {
        registerPage.navigate()
            .expect.element('@registerButton').to.be.visible;
        registerPage.expect.element('@registerButton').text.to.equal('REGISTER');
        registerPage.expect.element('@registerButton').to.not.be.enabled;
    },

    'Register page contains login link and info text': function() {
        registerPage.navigate()
            .expect.element('@loginInfoText').to.be.visible;
        registerPage.expect.element('@loginInfoText').text.to.equal('If you already have an account click Log in');
        registerPage.expect.element('@loginLink').to.be.visible;
    },

    'User can register using valid credentials': function(client) {
        registerPage.navigate()
            .expect.element('@title').to.be.visible;
        registerPage.performRegistration(email, username, client.globals.validPassword);
        client.pause(3000);
        userHomePage.expect.element('@usernameLabel').to.be.visible.before(5000);
        userHomePage.expect.element('@usernameLabel').text.to.equal(username);
        userHomePage.performLogout();
    }
};
