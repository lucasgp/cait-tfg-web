<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div>
    <span><i class="fa fa-calendar"></i>&nbsp;{{-startDate}}&nbsp;</span>
    {{ if(geoJson && geoJson.features && geoJson.features.length > 0) { }}
    <a id="participant-tracking-{{-id}}"><i class="fa fa-globe"></i></a>
    <div id="map-wrapper-{{-id}}" class="tracking-map-wrapper map"><!-- Map --></div>
    {{ } }}
</div>
