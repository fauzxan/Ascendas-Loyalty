const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');
const fuzzer = require('./fuzzyFuzzer.js');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// random fuzzeer output
async function fuzzer_creditreq(times) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    var fuzz_counter = 20;

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("bank-1")).click();
    await sleep(1000);
    await driver.findElement(By.id("claim_rewards_Sands Group")).click();
    await sleep(1000);

    for (j = 0; j < times; j++) {
        await driver.findElement(By.id("basic_membership_number")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
        await driver.findElement(By.id("basic_amount")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
        await driver.findElement(By.id("claim_submit_Sands Group")).click();
        await sleep(1000);
        try {
          await driver.switchTo().alert().then((alert) => alert.dismiss());
        } catch {
          continue;
        } finally {
          await sleep(1000);  
          await driver.findElement(By.id("basic_membership_number")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
          await driver.findElement(By.id("basic_amount")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
          await sleep(1000);
        }      

        if (j % 10 == 0) {
            fuzz_counter++;
          }
    }

    await driver.quit();
}

fuzzer_creditreq(10000);