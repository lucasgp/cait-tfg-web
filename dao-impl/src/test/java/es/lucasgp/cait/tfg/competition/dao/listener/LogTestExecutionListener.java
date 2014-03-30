package es.lucasgp.cait.tfg.competition.dao.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.TestExecutionListener;

public class LogTestExecutionListener implements TestExecutionListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(LogTestExecutionListener.class);

    @Override
    public void beforeTestClass(final TestContext testContext) throws Exception {
        LOGGER.debug("### Init {} ###", testContext.getTestClass().getName());
    }

    @Override
    public void prepareTestInstance(final TestContext testContext) throws Exception {
    }

    @Override
    public void beforeTestMethod(final TestContext testContext) throws Exception {
        LOGGER.debug("### Init {} ###", testContext.getTestMethod().getName());
    }

    @Override
    public void afterTestMethod(final TestContext testContext) throws Exception {
        LOGGER.debug("### End {} ###", testContext.getTestMethod().getName());
    }

    @Override
    public void afterTestClass(final TestContext testContext) throws Exception {
        LOGGER.debug("### Init {} ###", testContext.getTestClass().getName());
    }

}
