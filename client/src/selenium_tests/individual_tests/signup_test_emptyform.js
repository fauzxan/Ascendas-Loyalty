const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//incorrect user signup
async function signup_test_emptyform() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.id("signup_button")).click();
    await sleep(2000);
    await driver.switchTo().alert().then((alert) => alert.dismiss()); 
    await sleep(2000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/Home", textValue);
      });

    await driver.quit();
}

signup_test_emptyform();