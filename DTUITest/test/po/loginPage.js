var loginPageCommands = {
    performLogin: function(email, password) {
        return this.navigate()
            .waitForElementVisible('@emailInput', 3000)
            .setValue('@emailInput', email)
            .setValue('@passwordInput', password)
            .click('@loginButton');
    }
};

module.exports = {
    commands: [loginPageCommands],
    url: function () {
        return this.api.launchUrl + 'login';
    },
    elements: {
        title: {selector: 'div.login-form__title'},
        emailLabel: {selector: 'div#email-login label.form-control-label'},
        emailInput: {selector: "input[name='email']"},
        passwordLabel: {selector: 'div#password-login label.form-control-label'},
        passwordInput: {selector: "input[name='password']"},
        keepSignedCheckbox: {selector: 'label.checkbox'},
        keepSignedLabel: {selector: 'span.checkbox__title'},
        loginButton: {selector: "button[data-role='sign-in__submit']"},
        forgetPasswordLink: {selector: "a[href='/reset-password']"},
        registerText: {selector: 'p.login__register-text'},
        registerButton: {selector: "button[data-role='sign-in__sign-up-link-button']"},
        incorrectCredentialsError: {selector: "div[data-role='sign-in__validation-error']"}
    }
};
