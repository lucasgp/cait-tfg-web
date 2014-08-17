package es.lucasgp.cait.tfg.competition.test.it;

import java.net.MalformedURLException;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseWebDriverIT extends BaseMongoDbSpringTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseWebDriverIT.class);

    public static final String BASE_URL = "http://localhost:8084/web/main.html";
    private static final long DEFAULT_WAIT_MILLIS = 5000;

    private WebDriver driver;

    public WebDriver getDriver() {
        return driver;
    }

    @Before
    public void setUp() throws MalformedURLException {

        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");

        DesiredCapabilities capabilities = DesiredCapabilities.chrome();

        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        driver = new ChromeDriver(capabilities);

    }

    @After
    public void tearDown() {
        getDriver().quit();
    }

    public void sleep() {
        sleep(DEFAULT_WAIT_MILLIS);
    }

    public void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException ex) {
            LOGGER.info("", ex);
        }
    }

    public void getUrl(String url) {
        getUrl(url, DEFAULT_WAIT_MILLIS);
    }

    public void getUrl(String url, long waitMillis) {
        getDriver().get(url);
        sleep(waitMillis);
    }

    public void click(WebElement element) {
        click(element, DEFAULT_WAIT_MILLIS);
    }

    public void click(WebElement element, long waitMillis) {
        element.click();
        sleep(waitMillis);
    }

    public void submit(WebElement element) {
        submit(element, DEFAULT_WAIT_MILLIS);
    }

    public void submit(WebElement element, long waitMillis) {
        element.submit();
        sleep(waitMillis);
    }
}
