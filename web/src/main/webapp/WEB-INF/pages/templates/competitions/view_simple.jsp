<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div>
    <a href="#competition/{{- id}}" ><span class="name">{{- name }}</span></a>

    {{ if(tracking && tracking.geoJson && tracking.geoJson.features && tracking.geoJson.features.length > 0) { }}
    <a id="participant-tracking-{{-tracking.id}}"><i class="fa fa-globe"></i></a>
    <a href="/resources/trackings/{{-tracking.id}}/geojson">GeoJSON</a>
    <a href="/resources/trackings/{{-tracking.id}}/kml">KML</a>
    <div id="map-wrapper-{{-tracking.id}}" class="tracking-map-wrapper map"><!-- Map --></div>
    {{ } }}
</div>
