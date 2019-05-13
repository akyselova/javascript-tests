class NavigationHelper {
  static open(url) {
    const path = `${browser.options.baseUrl}/${url}`;

    return browser.url(path);
  }
}

module.exports = NavigationHelper;
