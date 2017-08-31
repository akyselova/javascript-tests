var signUpCommands = {
    fillInSignUpForm: function(username, fullname, email, password) {
        return this.waitForElementVisible('@usernameInput', 3000)
                .setValue('@usernameInput', username)
                .setValue('@fullnameInput', fullname)
                .setValue('@emailInput', email)
                .waitForElementPresent('@passwordInput', 3000)
                .waitForElementPresent('@passwordPlaceholder', 3000)
                .click('@passwordPlaceholder')
                .setValue('@passwordInput', password)
    },
    sumbitSignUpForm: function () {
        return this.click('@termsAgreement')
                .waitForElementVisible('@yesOption', 2000)
                .click('@yesOption')
                .click('@signUpButton')
    }
};

module.exports = {
  url: function() { 
    return this.api.launchUrl; 
  },
  sections: {
    menuNotSigned: {
        selector: '#cbsocial.notsignedin',
        elements: {
            signInButton: { 
                selector: '.onright span' 
            }
        }
    },
    signInForm: {
    	selector: '#cbsocialsigninup > form:nth-child(1)',
    	elements: {
    		verificationMessage: {
    			selector: 'p#cbsocialmessagesignin span'
    		},
    		usernameInput: {
                selector: 'input[name=username]'
            },
            passwordInput: {
                selector: 'input.passwordnormal'
            },
            passwordPlaceholder: {
                selector: 'input.passwordclear'
            }
    	}
    },
    signUpForm: {
        selector: '#cbsocialsignupform',
        commands: [signUpCommands],
        elements: {
            signUpButton: {
                selector: 'input[type=submit]'
            },
            usernameInput: {
                selector: 'input[name=username]'
            },
            fullnameInput: {
                selector: 'input[name=fullname]'
            },
            emailInput: {
                selector: 'input[name=email]'
            },
            passwordInput: {
                selector: 'input.passwordnormal'
            },
            passwordPlaceholder: {
                selector: 'input.passwordclear'
            },
            termsAgreement: {
                selector: 'select[name=terms]'
            },
            yesOption: {
                selector: 'option[value="yes"]'
            }
        }
    }
  }
};