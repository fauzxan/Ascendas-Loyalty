//Cohort Exercise 1.2

const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");
const e = new Error("An error message");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function makeRandom(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//incorrect user login
async function login_test_random(times) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    //login
    for (i = 0; i < times; i++) {
      await driver.findElement(By.id("login_email")).sendKeys(makeRandom(9) + '@test.com');
      await driver.findElement(By.id("login_password")).sendKeys(makeRandom(9), Key.RETURN);

      await sleep(5000);
      await driver.switchTo().alert().then((alert) => alert.dismiss()); 

      await sleep(7000);
      await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await sleep(3000);
    }
    
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(5000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/Home", textValue);
      });

    await driver.quit();
}

login_test_random(3);