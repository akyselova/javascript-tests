# Test automation framework for UI testing

The main idea of this framework is to provide easy, maintainable and reliable automated tests for UI part of the application. It was developed using Javascript ES6, Node.js, WebdriverIO and Cucumber.js. 

## Framework installation

**Install node js**

download here https://nodejs.org/en/download/

**Install Java 8**

download here https://www.java.com/en/download/

**Install all dependency** 

```
npm install
```

**Install stand alone selenium driver**

```
npm run wd-install
```

**Run stand alone selenium driver**

```
npm run wd-start
```

## Alternatively you could use selenoid (recomended for *nix systems)

- Download and install docker.
- Follow the guide to install selenoid - https://aerokube.com/selenoid/latest/
- Now you could use selenoid instead of selenium standalone.

**Run tests**

```
npm run test
```

## Framework configuration
Define Url that is going to be tested as baseUrl in **"/config/*.conf.js"**.

For instance for local testing use **"baseUrl: 'localhost:3000'"**

## Framework reporting

**View html report at:**
```
./reports/html-results/wdio-report.html

```
