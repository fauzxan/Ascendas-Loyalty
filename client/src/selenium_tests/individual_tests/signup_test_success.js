const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");

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

//correct user signup
async function signup_test_success() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.id("login_to_signup")).click();
    await sleep(500);

    var new_user = makeRandom(8);
    await driver.findElement(By.id("login_fullname")).sendKeys(new_user);
    await driver.findElement(By.id("login_email")).sendKeys(new_user + "@test.com");
    await driver.findElement(By.id("login_password")).sendKeys(new_user);
    await driver.findElement(By.id("login_confirm")).sendKeys(new_user);
    await driver.findElement(By.id("signup_button")).click();
    await sleep(2000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/Home", textValue);
      });

    await driver.quit();
}

signup_test_success();