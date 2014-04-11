<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Competitions manager <sec:authentication property="principal.username" /></title>
        <link rel="stylesheet" href="css/base.css">
    </head>
    <body>

        <section id="app">
            <header id="header">
                <h1>Competition Management</h1>
            </header>
            <section id="content">
                <section id="main">
                    <input id="new-competition-name" placeholder="New competition?" autofocus>
                    <input id="new-competition-description" placeholder="What's this competition about?">
                    <input id="new-competition-start-date">
                    <input id="new-competition-finish-date">
                    <ul id="competition-list"></ul>
                </section>
                <section id="menu"></section>
            </section>
            <footer id="footer">
                <p>Developed by Lucas GonzÃ¡lez Pascual - Trabajo de fin de grado del CAIT-ES. Universidad de A CoruÃ±a.</p>
            </footer>
        </section>

        <script type="text/template" id="item-template">
            <![CDATA[
            <div class="title">
            <span class="name"><%- name %>&nbsp;</span>
            </div>
            <div><span>From&nbsp;<%- startDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) : '' %></span>&nbsp;To&nbsp;<%- finishDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(finishDate)) : '' %></div>
            <div class="description">
            <p><%- description %>&nbsp;</p>
            </div>
            <div class="menu">
            <a href="#" class="destroy">&nbsp;</a>
            <a href="#" class="edit">&nbsp;</a>
            <div>
            ]]>
        </script>
        <script src="js/lib/jquery-2.1.0.js"></script>
        <script src="js/lib/jquery-ui.js"></script>
        <script src="js/lib/underscore.js"></script>
        <script src="js/lib/backbone.js"></script>
        <script src="js/common/backbone-extension.js"></script>
        <script src="js/common/query.js"></script>
        <script src="js/models/models.js"></script>
        <script src="js/collections/collections.js"></script>
        <script src="js/views/competitions.js"></script>
        <script src="js/views/app.js"></script>
        <script src="js/routers/router.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>