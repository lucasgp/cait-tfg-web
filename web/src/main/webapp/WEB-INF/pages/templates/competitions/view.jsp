<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <span class="name">{{- name }}&nbsp;</span>
</div>
<div><span>From&nbsp;{{- startDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) : '' }}</span>&nbsp;To&nbsp;{{- finishDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(finishDate)) : '' }}</div>
<div class="description">
    <p>{{- description }}&nbsp;</p>
</div>
<sec:authorize access="isAuthenticated()">
    <div class="menu">
        <a href="#competition/{{- id}}" class="edit">&nbsp;</a>
    </div>
</sec:authorize>