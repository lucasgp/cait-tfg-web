<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div>
    <a href="#user/{{- user.id }}" class="comment-user"><i class="fa fa-user"></i><span class="name">{{- user.get('username') }}</span></a>
    <span>&nbsp;{{-title}}</span>
    <span>&nbsp;{{- commentDate != null ? $.datepicker.formatDate(DateUtils.getFormat() , new Date(commentDate)) : '' }}</span>
    <p>{{-content}}</p>
</div>
