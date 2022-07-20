const {Builder, By, Key, WebDriver,  WebElement} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//click on first bank in home page
async function homepage_test() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#");
    driver.manage().window().maximize();

    //login
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(2000);

    await driver.findElement(By.id("bank-1")).click();
    await sleep(2000);
    await driver.findElement(By.id("BoS_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("bank-2")).click();
    await sleep(2000);
    await driver.findElement(By.id("BoS_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("bank-3")).click();
    await sleep(2000);
    await driver.findElement(By.id("BoS_button")).click();
    await sleep(2000);

    //running through the navbar
    await driver.findElement(By.id("companies_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("about_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("contact_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("enquire_button")).click();
    await sleep(2000);
    await driver.findElement(By.id("BoS_button")).click();
    await sleep(2000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/home", textValue);
      });

    await driver.quit();
}

homepage_test();