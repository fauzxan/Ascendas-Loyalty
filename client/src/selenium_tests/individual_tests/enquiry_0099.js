const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

//correct return

async function enquiry_0099(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");    
    driver.manage().window().maximize();

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("enquire_button")).click();
    await sleep(1000);

    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
    await sleep(1500);
    await driver.findElement(By.id("input_code_search_ReferenceCode")).sendKeys("20220099");
    await sleep(1500);
    await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
    await sleep(1500);
    await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
    await sleep(1500);
    await driver.findElement(By.id("reset_enquiry_ReferenceCode")).click();
    await sleep(1500);
    await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
    await sleep(1500);

    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/enquire", textValue);
      });

    await driver.quit();

}

enquiry_0099();

/*20220000
20220001
20220002
20220003
20220004
20220005
20220099
20220100*/