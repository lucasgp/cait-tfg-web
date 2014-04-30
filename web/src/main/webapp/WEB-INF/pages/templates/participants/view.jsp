<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div>
    <a id="participant-score-{{-user.id}}"><span><i class="fa fa-sort"></i>&nbsp;{{-score}}&nbsp;</span></a>
    <a href="#user/{{- user.id }}" class="participant-user"><i class="fa fa-user"></i><span class="name">{{- user.get('username') }}</span></a>
    {{ if(tracking && tracking.get('geoJson') && tracking.get('geoJson').features && tracking.get('geoJson').features.length > 0) { }}
    <a id="participant-tracking-{{-tracking.id}}"><i class="fa fa-globe"></i></a>
    <div id="map-wrapper-{{-tracking.id}}" class="tracking-map-wrapper map"><!-- Map --></div>
    {{ } }}
    <sec:authorize access="isAuthenticated()">
        <div id="participant-update-score-{{-user.id}}" class="w100">
            <input type="hidden" id="userId" value="{{-user.id}}">
            <input type="hidden" id="trackingId" value="{{-tracking.id}}">
            <div class="field">
                <input class="w100 center" type="text" id="score" value="{{-score}}">
            </div>
            <div class="field">
                <input class="w100 center" type="button" value="{{-$.t("form.save")}}">
            </div>
        </div>
    </sec:authorize>
</div>
