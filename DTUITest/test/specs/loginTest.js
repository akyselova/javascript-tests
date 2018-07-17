var homePage;
var loginPage;
var userHomePage;

module.exports = {

	before: function(client) {
        homePage = client.page.homePage();
        loginPage = client.page.loginPage();
        userHomePage = client.page.userHomePage();
//		username = client.globals.generateUsername(10);
//		email = username + '@mailinator.com';
//    	console.log('Setting up with user '+username+' and email '+email);
  		return homePage, loginPage, userHomePage;
  	},

  	after: function(client) {
    	console.log('Closing down...');
        client.end();
  	},

  	'Landing page should have Log In button': function () {
    	homePage.navigate()
            .waitForElementVisible( 'body', 1000);
        homePage.expect.element('@loginButton').to.be.visible;
		homePage.expect.element('@loginButton').text.to.equal('LOG IN');
    },

    'Log In button should navigate to Log In screen': function (client) {
        homePage.click('@loginButton');
        loginPage.expect.element('@title').to.be.visible.before(3000);
        client.assert.urlEquals(homePage.url() + 'login');
    },

    'Login page contains title': function () {
        loginPage.expect.element('@title').to.be.visible;
        loginPage.expect.element('@title').text.to.equal('LOGIN');
    },

    'Login page contains email input': function () {
        loginPage.expect.element('@emailLabel').to.be.visible;
        loginPage.expect.element('@emailLabel').text.to.equal('EMAIL');
        loginPage.expect.element('@emailInput').to.be.visible;
    },

    'Login page contains password input': function () {
        loginPage.expect.element('@passwordLabel').to.be.visible;
        loginPage.expect.element('@passwordLabel').text.to.equal('PASSWORD');
        loginPage.expect.element('@passwordInput').to.be.visible;
    },

    'Login page contains Keep me signed in checkbox': function () {
        loginPage.expect.element('@keepSignedCheckbox').to.be.visible;
        loginPage.expect.element('@keepSignedLabel').to.be.visible;
        loginPage.expect.element('@keepSignedLabel').text.to.equal('KEEP ME SIGNED IN');
    },

    'Login page contains Login button': function () {
        loginPage.expect.element('@loginButton').to.be.visible;
        loginPage.expect.element('@loginButton').text.to.equal('LOG IN');
    },

    'Login page contains Forget password link': function () {
        loginPage.expect.element('@forgetPasswordLink').to.be.visible;
        loginPage.expect.element('@forgetPasswordLink').text.to.equal('Forgot your password?');
    },

    'Login page contains register info text': function () {
        loginPage.expect.element('@registerText').to.be.visible;
        loginPage.expect.element('@registerText').text.to.equal('If you don’t already have an account click the Register button below to create an account');
    },

    'Login page contains Register button': function () {
        loginPage.expect.element('@registerButton').to.be.visible;
        loginPage.expect.element('@registerButton').text.to.equal('REGISTER');
    },

    'Should be possible to log in with correct credentials': function(client) {
        loginPage.performLogin(client.globals.validEmail, client.globals.validPassword);
        userHomePage.expect.element('@usernameLabel').to.be.visible.before(5000);
        userHomePage.expect.element('@usernameLabel').text.to.equal(client.globals.username);
        userHomePage.performLogout();
    },

    'Should be impossible to login with incorrect credentials': function(client) {
        loginPage.performLogin(client.globals.invalidEmail, client.globals.invalidPassword);
        loginPage.expect.element('@incorrectCredentialsError').to.be.visible;
        loginPage.expect.element('@incorrectCredentialsError').text.to.equal('These credentials do not match our records.');
    }
};