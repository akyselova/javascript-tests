var homePageCommands = {};

module.exports = {
    commands: [homePageCommands],
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        loginButton: {selector: "a[href='/login']"},
        registerButton: {selector: 'div.top-bar-menu-register'},
        registerDropdown: {selector: 'div.top-bar-menu-register-dropdown'},
        registerPlayerOption: {selector: "a[href='/register?origin=player']"},
        registerTeamOption: {selector: "a[href='/register?origin=team']"}
    }
};