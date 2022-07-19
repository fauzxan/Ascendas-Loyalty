const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function makeRandom(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var charactersLength = characters.length;
  var numbers = numbers.length;
  for ( var i = 0; i < length; i++ ) {
    if (i == length - 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  return result;
}

//compile cases for lengths of random input
//amount not a number
//exception in node and react

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

    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(9));
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[3]/div/div/div/button/span")).click();

    await sleep(5000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/bank-1", textValue);
      });

    await driver.quit();
}

claimpoints_randominput();