<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <span class="name">{{- name }}&nbsp;</span>
    <sec:authorize access="isAuthenticated()">
        <span><a class="join"><i class="fa fa-calendar"></i></a>{{if(user.id === ownerId) {}}<a class="destroy"><i class="fa fa-trash-o"></i></a>{{}}}</span>
            </sec:authorize>
</div>
<div><span>From&nbsp;{{- startDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) : '' }}</span>&nbsp;To&nbsp;{{- finishDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(finishDate)) : '' }}</div>
<div class="description">
    <p>{{- description }}</p>
</div>

<div id="map-wrapper"><!-- Map --></div>

<sec:authorize access="isAuthenticated()">
    <div class="form">
        <input id="comment-title" placeholder="Title?" autofocus>
        <input id="comment-content" placeholder="Content?">

        <input id="submit-comment" type="button" value="Submit">

    </div>
</sec:authorize>