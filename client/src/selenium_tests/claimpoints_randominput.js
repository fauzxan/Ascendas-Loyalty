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
async function claimpoints_randominput() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#");
    driver.manage().window().maximize();

    //login and navigating to partner card page
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("bank-1")).click();
    await sleep(1000);

    //incorrect length with 1st card
    await driver.findElement(By.id("claim_rewards_Sands Group")).click();
    await sleep(1000);
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(5, false));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(3));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("done with incorrect length test");

    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //amount 0 test
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, true));
    await driver.findElement(By.id("basic_amount")).sendKeys("0");
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("done with amount 0 test");

    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //amount negative test
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, true));
    await driver.findElement(By.id("basic_amount")).sendKeys("-" + makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("done with negative amount test");

    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //empty membership field
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("empty membership field test");

    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //empty amount field
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, true));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("empty amount field test");

    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //exceed number of points 
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, true));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(20, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("exceed amount test");

    await driver.switchTo().alert().then((alert) => alert.dismiss());
    await sleep(1000);
    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //with length 9 with one letter with 1st card
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, true));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);
    await driver.findElement(By.id("claim_rewards_ok")).click();
    await sleep(1000);

    await driver.findElement(By.id("claim_rewards_Sands Group")).click();
    await sleep(1000);
    await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1000);

    //with length 9 with 1st card
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(9, false));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);
    await driver.findElement(By.id("claim_rewards_ok")).click();
    await sleep(1000);

    await console.log("done with length 9 tests");

    //with length 10 with 2nd card
    await driver.findElement(By.id("claim_rewards_Kris Flyer")).click();
    await sleep(1000);
    await driver.findElement(By.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/form/div[1]/div[2]/div/div/input")).sendKeys(makeRandom(10, false));
    await driver.findElement(By.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/form/div[2]/div[2]/div/div/input")).sendKeys(makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Kris Flyer")).click();
    await sleep(1000);
    await driver.findElement(By.id("claim_rewards_ok")).click();
    await sleep(1000);

    await console.log("done with length 10 test");

    //with length 12 with 3rd card
    await driver.findElement(By.id("claim_rewards_Star Alliance")).click();
    await sleep(1000);
    await driver.findElement(By.xpath("/html/body/div[4]/div/div[2]/div/div[2]/div/form/div[1]/div[2]/div/div/input")).sendKeys(makeRandom(12, false));
    await driver.findElement(By.xpath("/html/body/div[4]/div/div[2]/div/div[2]/div/form/div[2]/div[2]/div/div/input")).sendKeys(makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Star Alliance")).click();
    await sleep(1000);
    await driver.findElement(By.id("claim_rewards_ok")).click();
    await sleep(1000);

    await console.log("done with length 12 test");

    //with length 16 with 1st card
    await driver.findElement(By.id("claim_rewards_Sands Group")).click();
    await sleep(1000);
    await driver.findElement(By.id("basic_membership_number")).sendKeys(makeRandom(16, false));
    await driver.findElement(By.id("basic_amount")).sendKeys(makeRandom(3, false));
    await driver.findElement(By.id("claim_submit_Sands Group")).click();
    await sleep(1000);

    await console.log("done with length 16 test");

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/bank-1", textValue);
      });

    await driver.quit();
}

claimpoints_randominput();