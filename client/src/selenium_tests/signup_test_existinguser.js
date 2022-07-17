const {Builder, By, Key} = require ("selenium-webdriver");
const assert = require ("assert");

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//correct user signup
async function signup_test_existinguser() {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/span[3]/a")).click();

    await sleep(500);

    await driver.findElement(By.id("login_fullname")).sendKeys("test1");
    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1");
    await driver.findElement(By.id("login_confirm")).sendKeys("test1");
    await driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();

    await sleep(5000);
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/Home", textValue);
      });

    await driver.quit();
}

signup_test_existinguser();