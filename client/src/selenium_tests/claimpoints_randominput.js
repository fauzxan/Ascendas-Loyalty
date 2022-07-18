const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function slowTyping(driver, text) {
  for (let i = 0; i < text.length; i++) {
    driver.send_keys(text[i]);
    sleep(500);
  }
}

//click on first bank in home page
async function claimpoints_randominput() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#");

    //login
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);

    await sleep(5000);

    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div[1]/div/span[3]/button/span")).click();

    await sleep(5000);

    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/button")).click();

    await sleep(5000);

    await driver.findElement(By.id("basic_membership_number")).sendKeys(getRandomInt(10000000000));
    await driver.findElement(By.id("basic_amount")).sendKeys(getRandomInt(1000000));
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[3]/div/div/div/button/span")).click();

    await sleep(5000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/bank-1", textValue);
      });

    await driver.quit();
}

claimpoints_randominput();