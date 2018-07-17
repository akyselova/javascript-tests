var userHomePageCommands = {
    performLogout: function() {
        return this.moveToElement('@usernameLabel', 10, 10)
            .waitForElementVisible( '@userPanelDropdown', 1000)
            .click('@logoutButton');
    }
};

module.exports = {
    commands: [userHomePageCommands],
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
        usernameLabel: {selector: '.user-control-panel__name'},
        userPanelDropdown: {selector: 'div.user-control-panel__dropdown'},
        logoutButton: {selector: "a[href='#']"}
    }
};
