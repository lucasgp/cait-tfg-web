<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(!simple) { }}
<div id="competition-search">
    <input id="competition-search-name-like" type="text" placeholder="{{- $.t('competition.form.name-placeholder') }}" value="{{-query.params['name-like']}}">
    <label>{{-$.t('form.from')}}</label><input id="competition-search-startDate-gte" type="text" value="{{- query.params['startDate-gte'] != null ? $.datepicker.formatDate($.t('i18n.' + $.i18n.options.lng + '.dateformat'), new Date(query.params['startDate-gte'])) : '' }}">
    <label>{{-$.t('form.to')}}</label><input id="competition-search-startDate-lte" type="text" value="{{- query.params['startDate-lte'] != null ? $.datepicker.formatDate($.t('i18n.' + $.i18n.options.lng + '.dateformat'), new Date(query.params['startDate-lte'])) : '' }}">
    <%-- <input id="competition-search-owned" type="checkbox" name="owned" value="true">Only own competitions --%>
    <input id="submit-search" type="button" value="{{- $.t('form.search') }}">
    <input id="clear-search" type="button" value="{{- $.t('form.clear') }}">
</div>
{{ } }}

{{ if(competitions && competitions.length > 0) {}}

{{ if(query.page > 0) { }}
<div id="submit-prev" class="search-nav"><i class="fa fa-chevron-left fa-3x fa-rotate-90"></i></div>
{{ } }}

<ul id="competition-list"><!-- Competitions --></ul>

{{ if(((query.page + 1) * query.size) < competitions.totalElements ) { }}
<div id="submit-next" class="search-nav"><i class="fa fa-chevron-right fa-3x fa-rotate-90"></i></div>
{{ } }}

{{ } else {}}

<p><i class="fa fa-frown-o"></i>{{- $.t("competition.list-empty")}}</p>

{{}}}