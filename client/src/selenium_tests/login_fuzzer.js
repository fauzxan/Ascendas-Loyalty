const {Builder, By, Key, WebDriverWait, until} = require ('selenium-webdriver');
const assert = require ('assert');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function fuzzyFuzzer(length, mode) {
    const alphabets_capital = "abcdefghijklmnopqrstuvwxyz";
    const alphabets_lower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const characters = "`~!@#$%^&*()_+-={}|[]:;<>?,./\\\\";
    var input_pool_length = 0;
    var input_pool;
    var output = "";

    if (mode == "email") {
        input_pool = alphabets_capital + alphabets_lower + "`~!#$%^&*_+-={}|?./";
        input_pool_length = input_pool.length;
        var at_index = Math.floor(Math.random()*length - 2);
        var dot_index = Math.floor(Math.random()*length + at_index);
        for (i = 0; i < length; i++) {
            if (i == at_index) {
                output += "@";
            } else if (i == dot_index) {
                output += ".";
            } else if (i > at_index) {
                input_pool = alphabets_capital + alphabets_lower + ".";
                input_pool_length = input_pool.length;
                output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
            } else {
                output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
            }
        }

    } else {
        input_pool = alphabets_capital + alphabets_lower + numbers + characters;
        input_pool_length = input_pool.length;
        for (i = 0; i < length; i++) {
            output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
        }
    }
    return output; 
}

async function login_test_random(times) {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/Ascendas-Loyalty#/");
    driver.manage().window().maximize();

    //login
    for (j = 0; j < times; j++) {
      await driver.findElement(By.id("login_email")).sendKeys(fuzzyFuzzer(9));
      await driver.findElement(By.id("login_password")).sendKeys(fuzzyFuzzer(9), Key.RETURN);
      await sleep(2000);
      await driver.findElement(By.id("login_email")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await driver.findElement(By.id("login_password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
      await sleep(2000);
      console.log(j + " th iteration");
    }
    
    await driver.getCurrentUrl().then(textValue => {
        console.log(textValue);
        assert.strictEqual("http://localhost:3000/Ascendas-Loyalty#/", textValue);
      });

    await driver.quit();
}

login_test_random(3);

