<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<sec:authorize access="isAnonymous()">
    <div class="title">
        <span class="name">{{- username }}</span>
    </div>
    <div class="description">
        <p>{{- description }}</p>
    </div>
</sec:authorize>
<sec:authorize access="isFullyAuthenticated() and hasRole('ADMIN')">
    <div class="w100 mtLabel">
        <input class="w100" id="{{-prefix}}name" value="{{-name}}">
    </div>
    <div class="w100 mtLabel">
        <textarea id="{{-prefix}}description">{{-description}}</textarea>
    </div>
    <div class="options">
        <a class="save" title="{{-$.t('form.save')}}"><i class="fa fa-save"></i></a>
        <a class="delete" title="{{-$.t('form.delete')}}"><i class="fa fa-trash-o"></i></a>
    </div>
</sec:authorize>
