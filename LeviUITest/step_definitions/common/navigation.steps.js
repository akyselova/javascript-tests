const { Given } = require('cucumber'),
  navigationHelper = require('../../utils/helpers/navigationHelper');

Given(/^I navigate to "([^"]*)" page$/, url => navigationHelper.open(url));
