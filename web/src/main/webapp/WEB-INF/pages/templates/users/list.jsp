<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<div class="w100 mtLabel">
    <div class="w25 field mr05">
        <input class="w100" id="user-search-username-like" type="text" size="35"  placeholder="{{- $.t('user.search.username-placeholder') }}" value="{{-query.params['username-like']}}">
    </div>
    <div class="field mr05">
        <input id="submit-search" type="button" value="{{- $.t('form.search') }}">
    </div>
    <div class="field mr05">
        <input id="clear-search" type="button" value="{{- $.t('form.clear') }}">
    </div>
</div>

{{ if(users && users.length > 0) { }}

{{ if(query.page > 0) { }}
<div id="submit-prev" class="search-nav mt05"><i class="fa fa-chevron-left fa-3x fa-rotate-90"></i></div>
{{ } }}

<ul id="users-list" class="card-list"><!-- Users --></ul>


{{ if(((query.page + 1) * query.size) < users.totalElements ) { }}
<div id="submit-next" class="search-nav mt05"><i class="fa fa-chevron-right fa-3x fa-rotate-90"></i></div>
{{ } }}


{{ } else { }}

<p><i class="fa fa-frown-o"></i>{{- $.t("user.list-empty")}}</p>

{{ } }}