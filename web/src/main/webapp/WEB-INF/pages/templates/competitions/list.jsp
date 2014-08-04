<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(!simple) { }}
<div class="w100">
    <div class="w25 field mr05">
        <input class="w100" id="competition-search-name-like" type="text" placeholder="{{- $.t('competition.form.name-placeholder') }}" value="{{-query.params['name-like']}}">
    </div>
    <div class="field mt05">
        <label>{{-$.t('form.from')}}</label>
        <input id="competition-search-startDate-gte" type="text" value="{{- query.params['startDate-gte'] != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(query.params['startDate-gte'])) : '' }}">
    </div>
    <div class="field mt05">
        <label>{{-$.t('form.to')}}</label><input id="competition-search-startDate-lte" type="text" value="{{- query.params['startDate-lte'] != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(query.params['startDate-lte'])) : '' }}">
    </div>
    <div class="field mt05">
        <label>{{- $.t('competition.form.type') }}</label>
        <span id="competition-search-types" ></span>
    </div>
    <div class="field mt05">
        <label>{{- $.t('competition.form.state') }}</label>
        <span id="competition-search-states" ></span>
    </div>
    <div class="field">
        <input id="submit-search" type="button" value="{{- $.t('form.search') }}">
    </div>
    <div class="field">
        <input id="clear-search" type="button" value="{{- $.t('form.clear') }}">
    </div>
</div>
{{ } }}

{{ if(competitions && competitions.length > 0) {}}

{{ if(query.page > 0) { }}
<div id="submit-prev" class="search-nav mt05"><i class="fa fa-chevron-left fa-3x fa-rotate-90"></i></div>
{{ } }}

<ul id="competition-list" class="card-list"><!-- Competitions --></ul>

{{ if(((query.page + 1) * query.size) < competitions.totalElements ) { }}
<div id="submit-next" class="search-nav mt05"><i class="fa fa-chevron-right fa-3x fa-rotate-90"></i></div>
{{ } }}

{{ } else {}}

<p><i class="fa fa-frown-o"></i>{{- $.t("competition.list-empty")}}</p>

{{}}}