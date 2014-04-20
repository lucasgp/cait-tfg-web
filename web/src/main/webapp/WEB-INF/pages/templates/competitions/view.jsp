<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="title">
    <span class="name"><a href="#competition/{{- id}}" ><i class="fa fa-chevron-right"></i></a>{{- name }}</span>
</div>
<div class="dates"><p><i class="fa fa-calendar"></i><span>From&nbsp;{{- startDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) : '' }}</span>&nbsp;To&nbsp;{{- finishDate != null ? $.datepicker.formatDate('yy-mm-dd', new Date(finishDate)) : '' }}</p></div>
<div class="description">
    <p>{{- description }}</p>
</div>
