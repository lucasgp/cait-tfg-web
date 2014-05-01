<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(collection && collection.length > 0) { }}

<ul id="{{-prefix}}list"><!-- Users --></ul>

{{ } else { }}

<p><i class="fa fa-frown-o"></i>{{- $.t("common.list-empty")}}</p>

{{ } }}

<sec:authorize access="isFullyAuthenticated() and hasRole('ADMIN')">
    <div class="w100 mtLabel">
        <input class="w100" id="{{-prefix}}new-name" placeholder="{{- $.t('common.name-placeholder') }}">
    </div>
    <div class="w100 mtLabel">
        <textarea id="{{-prefix}}new-description" placeholder="{{- $.t('common.description-placeholder') }}"></textarea>
    </div>
    <div class="options">
        <input class="create" type="button" value="{{- $.t('form.save') }}">
    </div>
</sec:authorize>