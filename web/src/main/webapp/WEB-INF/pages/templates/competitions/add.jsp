<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<div class="column1 w45 center">
    <div class="w100 mtLabel">
        <input class="w100" id="competition-name" placeholder="{{- $.t('competition.form.name-placeholder') }}" autofocus value="{{-name}}">
    </div>
    <div class="w100 mtLabel">
        <textarea id="competition-description" placeholder="{{- $.t('competition.form.description-placeholder') }}" >{{-description}}</textarea>
    </div>
    <div class="w100 mt05">
        <input id="submit-competition" type="button" value="{{- $.t('form.save') }}">
    </div>
</div>

<div class="column2 w45 center">
    <div class="column mt05">
        <div class="w45 field">
            <label>{{- $.t('form.from') }}</label>
            <input id="competition-startDate">
        </div>
        <div class="w45 field">
            <label>{{- $.t('form.to') }}</label>
            <input id="competition-finishDate">
        </div>
    </div>
    <div class="column mt05">
        <div class="w45 field">
            <label>{{- $.t('competition.form.type') }}</label>
            <span id="competition-types" ></span>
        </div>
        <div class="w45 field">
            <label>{{- $.t('competition.form.state') }}</label>
            <span id="competition-states" ></span>
        </div>
    </div>
    <div class="column mtLabel">
        <a id="show-map" title="{{- $.t('competition.form.route-map') }}"><i class="fa fa-globe fa-2x"></i></a>
    </div>
</div>

<div id="map-wrapper" class="clear"><!-- Map --></div>


