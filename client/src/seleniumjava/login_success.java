package seleniumjava;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import java.util.Random;

public class login_success {
	
	public static void main(String[] args) throws InterruptedException {		
		
		System.setProperty("webdriver.chrome.driver","/Users/zouhl/Downloads/chromedriver_win32/chromedriver.exe");
		WebDriver driver = new ChromeDriver();

		driver.get("http://localhost:3000/Ascendas-Loyalty#");
				
		driver.findElement(By.id("login_email")).sendKeys("test1@test.com");
		driver.findElement(By.id("login_password")).sendKeys("test1");
		driver.findElement(By.xpath("/html/body/div/div/div/div/div[2]/div/button")).click();

		Thread.sleep(5000);

		String textValue = driver.getCurrentUrl();
		System.out.println(textValue);

		driver.quit();

	}
}
