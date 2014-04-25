<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<section id="main">
</section>
<section id="menu">
    <div id="locales">
        <a id="locale-en" href="#lang/en">{{- $.t("i18n.en.name") }}</a>
        <a id="locale-es" href="#lang/es">{{- $.t("i18n.es.name") }}</a>
    </div>
    <sec:authorize access="isAnonymous()">
        <div id="login-button"><a href="${loginUrl}">{{- $.t("menu.login") }}</a></div>
        <div id="signup-button"><a href="#signup">{{- $.t("menu.signup") }}</a></div>
    </sec:authorize>
    <sec:authorize access="isAuthenticated()">
        <div><span>{{-user.name}}&nbsp;{{-user.surname}}&nbsp;({{-user.username}})</span></div>
        <div id="logout-button"><a href="${logoutUrl}">{{- $.t("menu.logout") }}</a></div>
        <div id="create-competition-button"><a href="#create-competition">{{- $.t("menu.create-competitions") }}</a></div>
    </sec:authorize>
    <div id="show-competitions-button"><a href="#competitions">{{- $.t("menu.list-competitions") }}</a></div>
    <div id="admin-users"><a href="#users">{{- $.t("menu.list-users") }}</a></div>
    <sec:authorize access="hasRole('ADMIN')">
        <div id="admin-competition-types"><a href="#competition-types">{{- $.t("menu.list-competition-types") }}</a></div>
    </sec:authorize>
</section>