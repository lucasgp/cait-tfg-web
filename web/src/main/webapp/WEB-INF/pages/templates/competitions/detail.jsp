<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <span class="name">{{- name }}&nbsp;</span><i class="fa fa-calendar"></i><span>From&nbsp;{{- startDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) : '' }}</span><span>To&nbsp;{{- finishDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(finishDate)) : '' }}</span>
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
