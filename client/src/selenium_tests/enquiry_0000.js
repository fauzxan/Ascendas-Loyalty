const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

//correct return

async function enquiry_0000(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);

    await sleep(5000);

    await driver.findElement(By.xpath("/html/body/div/div/div[1]/button[4]")).click();

    await sleep(5000);

    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220000",Key.RETURN);

    await sleep(5000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/enquire", textValue);
      });

    await driver.quit();

}

enquiry_0000();

/*20220000
20220001
20220002
20220003
20220004
20220005
20220099
20220100*/