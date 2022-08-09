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

//incorrect user signup
async function signups() {
    let driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.id("login_to_signup")).click();
    await sleep(500);

    //signup back to signin back to signup
    await driver.findElement(By.id("signup_to_login")).click();
    await sleep(3000);
    await driver.findElement(By.id("login_to_signup")).click();
    await sleep(3000);

    //empty signup form test
    await driver.findElement(By.id("signup_button")).click();
    await sleep(1500);
    await driver.switchTo().alert().then((alert) => alert.dismiss()); 
    await sleep(2000);

    //existing user signup test
    await driver.findElement(By.id("login_fullname")).sendKeys("test1");
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1");
    await driver.findElement(By.id("login_confirm")).sendKeys("test1");
    await driver.findElement(By.id("signup_button")).click();
    await sleep(1500);

    //clear form
    await driver.switchTo().alert().then((alert) => alert.dismiss()); 
    await driver.findElement(By.id("login_fullname")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_confirm")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1500);

    //password mismatch signup test
    await driver.findElement(By.id("login_fullname")).sendKeys("test10");
    await driver.findElement(By.id("login_email")).sendKeys("test10@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test10");
    await driver.findElement(By.id("login_confirm")).sendKeys("test100");
    await driver.findElement(By.id("signup_button")).click();
    await sleep(1500);

    //clear form
    await driver.findElement(By.id("login_fullname")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_confirm")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1500);

    //signup test success
    var new_user2 = makeRandom(8);
    await driver.findElement(By.id("login_fullname")).sendKeys(new_user2);
    await driver.findElement(By.id("login_email")).sendKeys(new_user2 + "@test.com");
    await driver.findElement(By.id("login_password")).sendKeys(new_user2);
    await driver.findElement(By.id("login_confirm")).sendKeys(new_user2);
    await driver.findElement(By.id("signup_button")).click();
    await sleep(1500);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/Home", textValue);
      });

    await driver.quit();
}

signups();