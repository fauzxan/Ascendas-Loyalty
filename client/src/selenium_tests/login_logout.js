const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//correct user login
async function login_test_success() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    //login
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);

    await sleep(3000);

    await driver.findElement(By.id("logout_button")).click();

    await sleep(3000);
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/", textValue);
      });

    await driver.quit();
}

login_test_success();