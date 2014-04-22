<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Competitions manager</title>
        <link rel="stylesheet" href="js/libs/jquery-ui/themes/smoothness/jquery-ui.custom.min.css">
        <link rel="stylesheet" href="js/libs/leaflet/leaflet.css">
        <link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/base.css">
        <link rel="stylesheet" href="css/map.css">
        <link rel="stylesheet" href="css/loading.css">
        <script data-main="js/main" src="js/libs/require/require.js"></script>
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
    </head>
    <body>

        <section id="app">
            <header id="header">
                <h1>Competition Management</h1>
            </header>
            <section id="content">
                <section id="main">
                </section>
                <section id="menu">
                    <sec:authorize access="isAnonymous()">
                        <div id="login-button"><a href="${loginUrl}">Login</a></div>
                        <div id="signup-button"><a href="#signup">Sign up</a></div>
                    </sec:authorize>
                    <sec:authorize access="isAuthenticated()">
                        <div><span>${user.username}-${user.name}${user.surname}</span></div>
                        <sec:authentication  property="principal.name" />
                        <div id="logout-button"><a href="${logoutUrl}">Logout</a></div>
                        <div id="create-competition-button"><a href="#create-competition">Create new competition</a></div>
                    </sec:authorize>
                    <div id="show-competitions-button"><a href="#competitions">Show competitions</a></div>
                    <div id="admin-users"><a href="#users">Users</a></div>
                    <sec:authorize access="hasRole('ADMIN')">
                        <div id="admin-competition-types"><a href="#competition-types">Competition types</a></div>
                    </sec:authorize>
                </section>
            </section>
            <footer id="footer">
                <p>Developed by Lucas González Pascual - Trabajo de fin de grado del CAIT-ES. Universidad de A Coruña.</p>
            </footer>
        </section>
        <div id="facebookG">
            <!-- Loading animation -->
            <div id="blockG_1" class="facebook_blockG">
            </div>
            <div id="blockG_2" class="facebook_blockG">
            </div>
            <div id="blockG_3" class="facebook_blockG">
            </div>
        </div>
        <div id="overlay"><!-- Overlay --></div>
    </body>
</html>