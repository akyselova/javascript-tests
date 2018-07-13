var CircularJSON = require('circular-json');
var chai = require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var should = chai.should;

var cleverbot, menuNotSignedSection, signUpFormSection, signInFormSection, username, email;

module.exports = {
	before: function(client) {
        cleverbot = client.page.cleverbot();
        menuNotSignedSection = cleverbot.section.menuNotSigned;
        signUpFormSection = cleverbot.section.signUpForm;
        signInFormSection = cleverbot.section.signInForm;
		username = client.globals.generateUsername(10);
		email = username + '@mailinator.com';
    	console.log('Setting up with user '+username+' and email '+email);
  		return username, email, menuNotSignedSection, cleverbot;
  	},

  	after: function(client) {
    	console.log('Closing down...');
    	client.end();
  	},

  	'Cleverbot landing pageshould have Sign In button': function (client) {
        
    	cleverbot.navigate()
            .expect.section('@menuNotSigned').to.be.visible;
		menuNotSignedSection.expect.element('@signInButton').to.be.visible;
		menuNotSignedSection.expect.element('@signInButton').text.to.equal('sign in');
    },

    'Registration form should open and contain proper elements': function (client) {
    	menuNotSignedSection.click('@signInButton');
        cleverbot.expect.section('@signUpForm').to.be.visible;
    	signUpFormSection.expect.element('@usernameInput').to.be.visible;
    	signUpFormSection.expect.element('@fullnameInput').to.be.visible;
    	signUpFormSection.expect.element('@emailInput').to.be.visible;
    	signUpFormSection.expect.element('@passwordInput').to.be.present;
    	signUpFormSection.expect.element('@termsAgreement').to.be.visible;
    },
    'Fill resistration form and sign up': function (client) {
    	signUpFormSection.fillInSignUpForm(username, client.globals.fullname, email, client.globals.password)
    		.sumbitSignUpForm()
    		.expect.element('@signUpButton').to.not.be.visible;
    },
    'Open verification link from mailbox': function(client) {
    	client  
  		    .useXpath()
    		.pause(3000)
    		.url('https://www.mailinator.com/inbox2.jsp?public_to='+username+'#/#public_maildirdiv')
    		.waitForElementPresent('//div[contains(text(), "Welcome")]', 10000)
    		.click('//div[contains(text(), "Welcome")]')
            .frame("publicshowmaildivcontent")
    		.waitForElementPresent('//a[contains(text(), "www.cleverbot.com")]', 10000)
    		.click('//a[contains(text(), "www.cleverbot.com")]')
            .pause(5000);

    },
    'Sign into verified account': function(client) {
    	var windowIds = client.windowHandles();
//    	var windowId = CircularJSON.stringify(windowIdJson);
		console.log(windowIds);
		console.log(client.elementActive());
    	client.closeWindow(windowIds[2])
    		.pause(3000);
    	cleverbot.expect.section('@signUpForm').to.be.visible;
    	cleverbot.expect.section('@signInForm').to.be.visible;
    	signInFormSection.expect.element('@verificationMessage').to.be.visible;
    	signInFormSection.expect.element('@verificationMessage').text.to.equal('account verified, please sign in');
    	signInFormSection.expect.element('@usernameInput').to.be.visible;
    	signInFormSection.expect.element('@passwordInput').to.be.present;
    } 


};