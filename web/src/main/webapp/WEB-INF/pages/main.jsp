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
                <h1>Competition Management</h1><h3><sec:authorize access="isAuthenticated()"><sec:authentication  property="principal.username" /></sec:authorize></h3>
            </header>
            <section id="content">
                <section id="main">
                </section>
                <section id="menu"></section>
            </section>
            <footer id="footer">
                <p>Developed by Lucas González Pascual - Trabajo de fin de grado del CAIT-ES. Universidad de A Coruña.</p>
            </footer>
        </section>
    </body>
</html>