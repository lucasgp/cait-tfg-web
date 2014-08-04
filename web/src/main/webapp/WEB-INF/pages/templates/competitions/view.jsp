<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<div class="title">
    <span class="name"><a href="#competition/{{- id}}" ><i class="fa fa-trophy"></i></a>&nbsp;{{- name }}</span>
</div>

<div class="dates">
    <i class="fa fa-calendar"></i>
    <span>{{- startDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(startDate)) : '' }}</span>
    {{ if(startDate !== finishDate) { }}
    &nbsp;-&nbsp;<span>{{- finishDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(finishDate)) : '' }}</span>
    {{ } }}
</div>

<div class="card-body description">
    <p>{{- description }}</p>
</div>
