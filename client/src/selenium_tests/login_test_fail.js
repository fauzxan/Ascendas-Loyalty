const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//incorrect user login
async function login_test_fail() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    //login
    await driver.findElement(By.id("login_email")).sendKeys("test2@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test2", Key.RETURN);

    await sleep(5000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#", textValue);
      });

    await driver.quit();
    await driver.close();
}

login_test_fail();