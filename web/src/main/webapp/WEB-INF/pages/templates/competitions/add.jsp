<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<input id="competition-name" placeholder="{{- $.t('competition.form.name-placeholder') }}" autofocus value="{{-name}}">
<textarea id="competition-description" cols="50" rows="5" placeholder="{{- $.t('competition.form.description-placeholder') }}" >{{-description}}</textarea>
<label>{{- $.t('form.from') }}</label><input id="competition-startDate">
<label>{{- $.t('form.to') }}</label><input id="competition-finishDate">
<label>{{- $.t('competition.form.type') }}</label><input id="competition-typeId" value="1">
<label>{{- $.t('competition.form.state') }}</label><input id="competition-stateId" value="1">

<a id="show-map"><i class="fa fa-globe"></i></a>

<div id="map-wrapper"><!-- Map --></div>

<input id="submit-competition" type="button" value="{{- $.t('form.save') }}">
