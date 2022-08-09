const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');
const fuzzer = require('./fuzzyFuzzer.js')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function fuzzer_signup(times) {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
  driver.manage().window().maximize();

  await driver.findElement(By.id("login_to_signup")).click();
  await sleep(500);

  var fuzz_counter = 10;

  for (j = 0; j < times; j++) {
    await driver.findElement(By.id("login_fullname")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
    await driver.findElement(By.id("login_email")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
    await driver.findElement(By.id("login_password")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
    await driver.findElement(By.id("login_confirm")).sendKeys(fuzzer.fuzzyFuzzer(fuzz_counter));
    await driver.findElement(By.id("signup_button")).click();
    await sleep(1500);

    await driver.findElement(By.id("login_fullname")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await driver.findElement(By.id("login_confirm")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await sleep(1500);

    if (j % 10 == 0) {
      fuzz_counter++;
    }
  }

  await driver.quit();
}

fuzzer_signup(10000);