const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

//correct return

async function enquiry_0003(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");    
    driver.manage().window().maximize();

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(2000);
    await driver.findElement(By.id("enquire_button")).click();
    await sleep(2000);

    await driver.findElement(By.id("basic_reference")).sendKeys("20220003");
    await sleep(2000);
    await driver.findElement(By.id("enquiry_submit_button")).click();
    await sleep(2000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/enquire", textValue);
      });

    await driver.quit();

}

enquiry_0003();

/*20220000
20220001
20220002
20220003
20220004
20220005
20220099
20220100*/