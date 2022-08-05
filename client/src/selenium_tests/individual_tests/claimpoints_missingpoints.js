const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function makeRandom(length, endingLetter) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var charactersLength = characters.length;
  var numbersLength = numbers.length;
  for ( var i = 0; i < length; i++ ) {
    if (i == length - 1 && length ==9 && endingLetter == true) {
      result += numbers.charAt(Math.floor(Math.random() * numbersLength));
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    else {
      result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
  }
  return result;
}

//click on first bank in home page
async function claimpoints_missingpoints() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#");

    //login
    await driver.get("http://localhost:3000/Ascendas-Loyalty#");
    driver.manage().window().maximize();

    //login and navigating to partner card page
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("bank-1")).click();
    await sleep(1000);

    await driver.findElement(By.id("claim_rewards_Sands Group")).click();
    await sleep(1000);

    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/bank-1", textValue);
      });

    await driver.quit();
}

claimpoints_missingpoints();