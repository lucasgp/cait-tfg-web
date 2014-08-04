<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<a href="#user/{{- user.id }}" class="comment-user"><i class="fa fa-user mr05"></i><span class="name">{{- user.get('username') }}</span></a>

<sec:authorize access="isFullyAuthenticated() and (hasRole('ADMIN') or hasRole('MODERATOR'))">

    <a class="delete" title="{{-$.t('form.delete')}}"><i class="fa fa-trash-o"></i></a>

</sec:authorize>

<span>&nbsp;{{-title}}</span>

<span>&nbsp;{{- commentDate != null ? $.datepicker.formatDate(DateUtils.getFormat() , new Date(commentDate)) : '' }}</span>

<p>{{-content}}</p>

