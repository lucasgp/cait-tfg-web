<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div class="participant">
    <span><i class="fa fa-sort"></i>&nbsp;{{-score}}&nbsp;</span>
    <a href="#user/{{- user.id }}" class="participant-user"><i class="fa fa-user"></i><span class="name">{{- user.get('username') }}</span></a>
    {{ if(tracking && tracking.get('geoJson') && tracking.get('geoJson').features && tracking.get('geoJson').features.length > 0) {}}
    <a id="participant-tracking-{{-tracking.id}}"><i class="fa fa-globe"></i></a>
    <div id="map-wrapper-{{-tracking.id}}"><!-- Map --></div>
    {{}}}
</div>
