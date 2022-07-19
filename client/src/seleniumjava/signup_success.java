package seleniumjava;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Random;

public class signup_success {
	
	public static void main(String[] args) throws InterruptedException {		
		
		System.setProperty("webdriver.chrome.driver","/Users/zouhl/Downloads/chromedriver_win32/chromedriver.exe");
		WebDriver driver = new ChromeDriver();

		driver.get("http://localhost:3000/Ascendas-Loyalty#");

		driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/span[3]/a")).click();	

		Thread.sleep(5000);			
		
		driver.findElement(By.id("login_fullname")).sendKeys(randomStringGenerator.getName(new Random().nextInt(20)));
    	driver.findElement(By.id("login_email")).sendKeys(randomStringGenerator.getEmailString(new Random().nextInt(20)));
    	driver.findElement(By.id("login_password")).sendKeys("signuptest");
    	driver.findElement(By.id("login_confirm")).sendKeys("signuptest");
    	driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();

		Thread.sleep(5000);

		String textValue = driver.getCurrentUrl();
		System.out.println(textValue);

		driver.quit();

	}
}
