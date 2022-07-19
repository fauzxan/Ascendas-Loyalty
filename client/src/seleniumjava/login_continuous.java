package seleniumjava;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.Keys;
import java.util.Random;

public class login_continuous {
	
	public static void main(String[] args) throws InterruptedException {		
		
		System.setProperty("webdriver.chrome.driver","/Users/zouhl/Downloads/chromedriver_win32/chromedriver.exe");
		WebDriver driver = new ChromeDriver();

		int rounds = 3;
		
		driver.get("http://localhost:3000/Ascendas-Loyalty#");

		for (int i = 0; i < rounds; i++) {
			driver.findElement(By.id("login_email")).sendKeys(randomStringGenerator.getEmailString(new Random().nextInt(20)));
			driver.findElement(By.id("login_password")).sendKeys(randomStringGenerator.getPasswordString(new Random().nextInt(20)), Keys.RETURN);
			//driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();
        	Thread.sleep(5000);
			driver.switchTo().activeElement();
			driver.findElement(By.id("login_email")).clear();
			driver.findElement(By.id("login_password")).clear();
			Thread.sleep(5000);


			// try {
			// 	driver.findElement(By.id("login_email")).sendKeys(randomStringGenerator.getEmailString((int)Math.random()*(20-2)));
			// 	driver.findElement(By.id("login_password")).sendKeys(randomStringGenerator.getPasswordString((int)Math.random()*(20-2)));
			// 	driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();
			// 	Thread.sleep(5000);
			// 	driver.findElement(By.id("login_email")).clear();
			// 	driver.findElement(By.id("login_password")).clear();
			// 	Thread.sleep(5000);
			// } catch (Exception e) {
			// 	continue;
			// }
		}
	
		driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
		driver.findElement(By.id("login_password")).sendKeys("test1");
		driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();

		Thread.sleep(5000);

		String textValue = driver.getCurrentUrl();
		System.out.println(textValue);

		driver.quit();

	}

}
