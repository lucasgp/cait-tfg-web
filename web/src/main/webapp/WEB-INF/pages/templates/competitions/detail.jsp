<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div >
    <h2>
        {{- name }}
        <sec:authorize access="isFullyAuthenticated()">
            {{ if(currentState.get('name') === 'Open') { }}
            &nbsp;<a class="join"><i class="fa fa-sign-in" title="{{-$.t('competition.join')}}"></i></a>
            {{ } }}
            {{ if(currentState.get('name') === 'Ongoing') { }}
            &nbsp;<span class="tracking"><i id="tracking-icon" class="fa {{- isTracking ? 'fa-stop' : 'fa-play'}}"></i></span>
            {{ } }}
        </sec:authorize>
    </h2>
    <div class="info">
        <span><i class="fa fa-calendar mr05"></i>{{- $.t("competition.start-date") }}&nbsp;{{- startDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(startDate)) : '' }}</span>
        {{ if(startDate !== finishDate) { }}
        &nbsp;-&nbsp;<span>{{- $.t("competition.finish-date") }}&nbsp;{{- finishDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(finishDate)) : '' }}</span>
        {{ } }}
        <span>{{- competitionStates.get(stateId).get('name') }}</span>
        <span>{{- competitionTypes.get(typeId).get('name') }}</span>
        <sec:authorize access="isFullyAuthenticated()">
            <span>
                {{ if( user.id === ownerId ) { }}
                <a href="#edit-competition/{{-id}}" class="edit" title="{{-$.t('competition.edit')}}"><i class="fa fa-edit"></i></a>
                <a class="destroy" title="{{-$.t('competition.delete')}}"><i class="fa fa-trash-o"></i></a>
                {{ } }}
            </span>
        </sec:authorize>
    </div>
</div>
<div class="description">
    <p>{{- description }}</p>
</div>

{{ if(route && route.geoJson.features && route.geoJson.features.length > 0) { }}
<div id="map-wrapper" class="map"><!-- Map --></div>
{{ } }}

<div class="separator"></div>

<h3>{{-$.t("competition.participants")}}</h3>
<div id="competition-participants"><!-- Competition participants --></div>

<div class="separator"></div>

<h3>{{-$.t("competition.comments")}}</h3>
<div id="competition-comments"><!-- Competition comments --></div>
