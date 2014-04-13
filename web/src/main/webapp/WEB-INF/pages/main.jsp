<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Competitions manager</title>
        <link rel="stylesheet" href="css/base.css">
        <script data-main="js/main" src="js/libs/require/require.js"></script>
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
                        <sec:authentication  property="principal.name" />
                        <div id="logout-button"><a href="${logoutUrl}">Logout</a></div>
                        <div id="create-competition-button"><a href="#createCompetition">Create new competition</a></div>
                    </sec:authorize>
                    <div id="signup-button"><a href="#showCompetitions">Show competitions</a></div>
                </section>
            </section>
            <footer id="footer">
                <p>Developed by Lucas González Pascual - Trabajo de fin de grado del CAIT-ES. Universidad de A Coruña.</p>
            </footer>
        </section>
    </body>
</html>