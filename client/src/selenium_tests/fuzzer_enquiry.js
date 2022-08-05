const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');
const fuzzer = require('./fuzzyFuzzer.js')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// random fuzzeer output
async function fuzzer_enquiry(times) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    var fuzz_counter = 10;

    await driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
    await driver.findElement(By.id("login_password")).sendKeys("test1", Key.RETURN);
    await sleep(1000);
    await driver.findElement(By.id("enquire_button")).click();
    await sleep(1000);

    for (j = 0; j < times; j++) {
        // By reference codes
        await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
        await sleep(1500);
        await driver.findElement(By.id("input_code_search_ReferenceCode")).sendKeys(fuzzer.fuzzyFuzzer(10));
        await sleep(1500);
        await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
        await sleep(1500);
        await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[1]/div/span[2]/span")).click();
        await sleep(1500);
        await driver.findElement(By.id("reset_enquiry_ReferenceCode")).click();
        await sleep(1500);
        await driver.findElement(By.id("search_enquiry_ReferenceCode")).click();
        await sleep(1500);

        // By outcome
        await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div/div/div/div/div/table/thead/tr/th[2]/div/span[2]/span")).click();
        await sleep(1500);
        await driver.findElement(By.id("input_code_search_State")).sendKeys(fuzzer.fuzzyFuzzer(10));
        await sleep(1500);
        await driver.findElement(By.id("search_enquiry_State")).click();
        await sleep(1500);
        await driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div/table/thead/tr/th[2]/div/span[2]/span")).click();
        await sleep(1500);
        await driver.findElement(By.id("reset_enquiry_State")).click();
        await sleep(1500);
        await driver.findElement(By.id("search_enquiry_State")).click();
        await sleep(1500);

        if (j % 10 == 0) {
            fuzz_counter++;
        }
    }

    await driver.quit();
}

fuzzer_enquiry(1000);