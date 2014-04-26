<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <h2 class="name">{{- name }}&nbsp;</h2><i class="fa fa-calendar"></i>
    <span>{{- $.t("competition.start-date") }}&nbsp;{{- startDate != null ? $.datepicker.formatDate($.t("i18n." + $.i18n.options.lng + ".dateformat"), new Date(startDate)) : '' }}</span>
    {{ if(startDate !== finishDate) { }}
    &nbsp;-&nbsp;<span>{{- $.t("competition.finish-date") }}&nbsp;{{- finishDate != null ? $.datepicker.formatDate($.t("i18n." + $.i18n.options.lng + ".dateformat"), new Date(finishDate)) : '' }}</span>
    {{ } }}
    <sec:authorize access="isAuthenticated()">
        <span>
            <a class="join"><i class="fa fa-calendar"></i></a>
            {{ if( user.id === ownerId ) { }}
            <a href="#edit-competition/{{-id}}" class="edit"><i class="fa fa-edit"></i></a>
            <a class="destroy"><i class="fa fa-trash-o"></i></a>
            {{ } }}
        </span>
    </sec:authorize>
</div>
<div class="description">
    <p>{{- description }}</p>
</div>
{{ if(route) { }}
<div id="map-wrapper" class="map"><!-- Map --></div>
{{ } }}
