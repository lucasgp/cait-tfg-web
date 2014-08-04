<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<sec:authorize access="isFullyAuthenticated()">

    {{ if( user.id === ownerId ) { }}

    <input id="participant-new-score-{{- userId }}" class="w25 field" type="text" value="{{- score }}">

    {{ } else { }}

    <span><i class="fa fa-sort"></i>&nbsp;{{-score}}&nbsp;</span>

    {{ } }}

</sec:authorize>

<sec:authorize access="isAnonymous()">
    <span><i class="fa fa-sort"></i>&nbsp;{{-score}}&nbsp;</span>
</sec:authorize>

<a href="#user/{{- userId }}" class="participant-user"><i class="fa fa-user mr05"></i><span id="participant-username-{{- userId }}"><!-- Participant username --></span></a>

<a id="participant-tracking-{{-trackingId}}"><i class="fa fa-globe"></i></a>

<sec:authorize access="isFullyAuthenticated() and (hasRole('ADMIN') or hasRole('MODERATOR'))">
    <a class="delete" title="{{-$.t('form.delete')}}"><i class="fa fa-trash-o"></i></a>
    </sec:authorize>

<div id="map-wrapper-{{-trackingId}}" class="tracking-map-wrapper map"><!-- Map --></div>
