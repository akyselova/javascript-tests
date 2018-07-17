var seleniumServer = require('selenium-server');
var chromedriver = require('chromedriver');

module.exports = {
    "src_folders": ["test/specs"],
    "output_folder": "reports",
    "page_objects_path": "test/po",
    "selenium": {
        "start_process": true,
        "server_path": seleniumServer.path,
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": chromedriver.path
        }
    },
    "test_settings": {
        "default": {
            "launch_url": "https://dreamteam.gg/",
            "selenium_host": "localhost",
            "selenium_port": 4444,
            "pathname": "/wd/hub",
            "end_session_on_fail": true,
            "silent": true,
            "screenshots": {
                "enabled": false,
                "path": ''
            },
            "globals": {
                "waitForConditionTimeout": 10000,
                "generateUsername": function () {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text;
                },
                "fullname": "Anastasiia Kyselova",
                "username": "lapo44ka",
                "validEmail" : "lapo44ka@bigmir.net",
                "validPassword": 123456,
                "invalidEmail" : "incorrect@bigmir.net",
                "invalidPassword": "incorrect"
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "chromeOptions" : {
                    "args" : ["--disable-notifications"]
                }
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "marionette": true
            }
        }
    }
};

