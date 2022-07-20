const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

//correct return

async function enquiry_everything(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div/div/div[1]/button[4]")).click();
    await sleep(5000);

    //success case
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220000", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //member not found
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220001", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //member name mismatch
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220002", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //member account closed
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220003", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //member account suspended
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220004", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //member ineligible for accrual
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220005", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //to be done
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220100", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(7000);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(5000);

    //unable to process, please contact support for more information
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/form/div[1]/div[2]/div/div/input")).sendKeys("20220099", Key.RETURN);
    await sleep(5000);
    await driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/div/div[2]/button")).click();
    await sleep(5000);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/enquire", textValue);
      });

    await driver.quit();

}

enquiry_everything();

/*20220000
20220001
20220002
20220003
20220004
20220005
20220099
20220100*/