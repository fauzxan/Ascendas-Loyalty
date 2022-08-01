const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');
const fuzzer = require('./fuzzyFuzzer.js')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// random fuzzeer output
async function fuzzer_login(times) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    var fuzz_counter = 10;

    //login
    for (j = 0; j < times; j++) {
      await driver.findElement(By.id("login_email")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
      await driver.findElement(By.id("login_password")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter), Key.RETURN);
      await sleep(2000);
      await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await sleep(2000);

      if (j % 10 == 0) {
        fuzz_counter++;
      }
    }
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/", textValue);
      });

    await driver.quit();
}

fuzzer_login(1000);

