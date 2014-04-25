<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
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
                <h1 id="header-title" data-i18n="app.title"></h1>
            </header>
            <section id="content">
                <!-- Page content -->
            </section>
            <footer id="footer">
                <p id="footer-content" data-i18n="app.footer"></p>
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