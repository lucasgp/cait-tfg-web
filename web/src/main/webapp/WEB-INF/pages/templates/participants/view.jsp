<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div>
    <sec:authorize access="isAuthenticated()">
        <input id="participant-new-score-{{- userId }}" class="w25 field" type="text" value="{{- score }}">
    </sec:authorize>
    <sec:authorize access="isAnonymous()">
        <span><i class="fa fa-sort"></i>&nbsp;{{-score}}&nbsp;</span>
    </sec:authorize>

    <a href="#user/{{- userId }}" class="participant-user"><i class="fa fa-user mr05"></i><span id="participant-username-{{- userId }}"><!-- Participant username --></span></a>
    <a id="participant-tracking-{{-trackingId}}"><i class="fa fa-globe"></i></a>
    <div id="map-wrapper-{{-trackingId}}" class="tracking-map-wrapper map"><!-- Map --></div>
</div>

</div>
