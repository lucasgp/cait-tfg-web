<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:url value="/web/login.html" var="loginUrl"/>
<c:url value="/web/logout" var="logoutUrl"/>
<sec:authorize access="isAuthenticated()">
    <sec:authentication  property="principal.user" var="user" />
    <script>

        user = {
            id: "${user.id}",
            name: "${user.name}",
            username: "${user.username}"
        };
    </script>
</sec:authorize>