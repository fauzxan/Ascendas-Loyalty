const {Builder, By, Key, WebDriver,  WebElement, until, DELAY, wait, ofSeconds} = require ("selenium-webdriver");
const assert = require ("assert");
const { SeleniumServer } = require("selenium-webdriver/remote");
const { Code } = require("mongodb");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

var test_codes = {"20220000": "success",
                  "20220098": "success",
                  "20220001": "member not found", 
                  "20220002": "member name mismatch", 
                  "20220003": "member account closed", 
                  "20220004": "member acount suspended", 
                  "20220005": "member ineligible for accrual", 
                  "20220100": "to be done", 
                  "20220099": "unable to process, please contact support for more information"};
var test_codes_length = test_codes.length;

var outcome_codes = ["success", "fail", "pending"];
var outcome_codes_length = outcome_codes.length;

//correct return
async function enquiry_everything(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("enquire_button")).click();
    await sleep(1500);

    // search by reference codes
    for (var code in test_codes) {
      await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
      await sleep(1500);
      await driver.findElement(By.id("input_code_search_ReferenceCode")).sendKeys(code);
      await sleep(1500);
      await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
      await sleep(1500);
      await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
      await sleep(1500);
      await driver.findElement(By.id("reset_enquiry_ReferenceCode")).click();
      await sleep(1500);
      await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
      await sleep(1500);
      var message = "Test for " + code + " (" + test_codes[code] + ") done.";
      console.log(message)
    }

    // search by outcome
    for (i = 0; i < outcome_codes_length; i++) {
      await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div/div/table/thead/tr/th[2]/div/span[2]/span")).click();
      await sleep(1500);
      await driver.findElement(By.id("input_code_search_State")).sendKeys(outcome_codes[i]);
      await sleep(1500);
      await driver.findElement(By.id("search_enquiry_State")).click();
      await sleep(1500);
      await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[2]/div/span[2]/span")).click();
      await sleep(1500);
      await driver.findElement(By.id("reset_enquiry_State")).click();
      await sleep(1500);
      await driver.findElement(By.id("search_enquiry_State")).click();
      await sleep(1500);
    }

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