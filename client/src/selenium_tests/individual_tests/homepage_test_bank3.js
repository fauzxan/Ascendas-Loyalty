const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//click on first bank in home page
async function homepage_test_bank3() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#");
    driver.manage().window().maximize();

    //login
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);

    await sleep(2000);

    await driver.findElement(By.id("bank-3")).click();
    await sleep(2000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/bank-3", textValue);
      });

    await driver.quit();
}

homepage_test_bank3();