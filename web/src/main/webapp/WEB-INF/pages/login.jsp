<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
    </head>
    <body>
        <form name="loginForm" action="${loginUrl}" method="post">
            <c:if test="${param.error != null}">
                <p>
                    Invalid username and password. ${param.error}
                </p>
            </c:if>
            <c:if test="${param.logout != null}">
                <p>
                    You have been logged out. ${param.logout}
                </p>
            </c:if>
            <p>
                <label for="username">Username</label>
                <input type="text" id="username" name="username"/>
            </p>
            <p>
                <label for="password">Password</label>
                <input type="password" id="password" name="password"/>
            </p>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <button type="submit" class="btn">Log in</button>
        </form>

    </body>
</html>
