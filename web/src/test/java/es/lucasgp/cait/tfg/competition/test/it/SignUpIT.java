package es.lucasgp.cait.tfg.competition.test.it;

import static org.junit.Assert.*;
import org.junit.Test;
import org.openqa.selenium.By;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SignUpIT extends BaseWebDriverIT {

    private static final Logger LOGGER = LoggerFactory.getLogger(SignUpIT.class);

    @Test
    public void testSignUpAndLogin() {
        getUrl(BASE_URL, 10000L);
        click(getDriver().findElement(By.partialLinkText("Sign up")));
        getDriver().findElement(By.id("user-username")).sendKeys("test");
        getDriver().findElement(By.id("user-name")).sendKeys("test");
        getDriver().findElement(By.id("user-surname")).sendKeys("test");
        getDriver().findElement(By.id("user-phonePrefix")).sendKeys("+34");
        getDriver().findElement(By.id("user-phoneNumber")).sendKeys("123456789");
        getDriver().findElement(By.id("user-email")).sendKeys("test@test.test");
        getDriver().findElement(By.id("user-password")).sendKeys("test");
        click(getDriver().findElement(By.id("submit-user")));
        getDriver().findElement(By.id("username")).sendKeys("test");
        getDriver().findElement(By.id("password")).sendKeys("test");
        click(getDriver().findElement(By.id("submit-button")), 10000L);
        assertEquals("test test (test)", getDriver().findElement(By.partialLinkText("test")).getText());
    }
}
