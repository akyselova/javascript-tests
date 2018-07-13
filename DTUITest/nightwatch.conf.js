const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  "src_folders": [
    "test"
  ],
  "output_folder": "reports",
  "page_objects_path" : "test/po",
  "selenium": { 
    "start_process": true, 
    "server_path": "./node_modules/nightwatch/bin/selenium.jar",
    "host": "127.0.0.1",
    "port": 4444, 
    "cli_args": { 
      "webdriver.chrome.driver" : "./node_modules/nightwatch/bin/chromedriver"
    }
  },
  "test_settings": {
    "default": {
      "launch_url" : "https://dreamteam.gg/",
      "screenshots": {
        "enabled": false, 
        "path": ''
      },
      "globals": {
        "waitForConditionTimeout": 10000,
        "generateUsername": function() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
        },
        "fullname": "Anastasiia Kyselova",
        "password": "qwertyui"
      },
      "desiredCapabilities": { 
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true 
      }
    }
  }
}

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
