var registerPageCommands = {
    performRegistration: function(email, username, password) {
        this.navigate()
            .waitForElementVisible('@title', 3000)
            .setValue('@emailInput', email)
            .setValue('@usernameInput', username)
            .setValue('@passwordInput', password);
        this.api.pause(3000);
        this.click('@personalDataCheckbox');
        this.api.pause(3000);
        this.click('@termsCheckbox')
            .click('@registerButton');
    }
};

module.exports = {
    commands: [registerPageCommands],
    url: function () {
        return this.api.launchUrl + 'register';
    },
    elements: {
        title: {selector: 'h3.dt-form__title'},
        emailLabel: {selector: "form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(1) > label.dt-form-item__label"},
        emailInput: {selector: "input[name='email']"},
        emailMessage: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(1) > div.dt-form-item__content > div.dt-form-item__message'},
        usernameLabel: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(2) > label.dt-form-item__label'},
        usernameInput: {selector: "input[name='name']"},
        usernameMessage: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(2) > div.dt-form-item__content > div.dt-form-item__message'},
        passwordLabel: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(3) > label.dt-form-item__label'},
        passwordInput: {selector: "input[name='password']"},
        passwordMessage: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(3) > div.dt-form-item__content > div.dt-form-item__message'},
        personalDataCheckbox: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(4) > div.dt-form-item__content > label.dt-checkbox > span.dt-checkbox__input'},
        personalDataLabel: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(4) > div.dt-form-item__content > label.dt-checkbox > span.dt-checkbox__label'},
        termsCheckbox: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(5) > div.dt-form-item__content > label.dt-checkbox > span.dt-checkbox__input'},
        termsLabel: {selector: 'form.dt-form.registration-form__body.dt-form--invalid > div:nth-of-type(5) > div.dt-form-item__content > label.dt-checkbox > span.dt-checkbox__label'},
        registerButton: {selector: "button[data-role='sign-up__submit']"},
        loginInfoText: {selector: 'p.login-link'},
        loginLink: {selector: "a[href='/login']"}
    }
};

