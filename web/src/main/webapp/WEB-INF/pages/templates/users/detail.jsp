<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <h2>{{- name }}&nbsp;{{- surname }}&nbsp;-&nbsp;{{- username }}</h2>
</div>

<h3>{{- $.t("user.user-competitions") }}</h3>
<div id="user-competitions">

</div>

<h3>{{- $.t("user.user-participations") }}</h3>
<div id="user-participations">

</div>

<h3>{{- $.t("user.user-trackings") }}</h3>
<div id="user-trackings">

</div>