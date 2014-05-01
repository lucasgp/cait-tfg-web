<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div >
    <h2 >
        {{- name }}
        <sec:authorize access="isAuthenticated()">
            &nbsp;<a class="join"><i class="fa fa-sign-in" title="{{-$.t('competition.join')}}"></i></a>
            </sec:authorize>
    </h2>
    <div class="info">
        <span><i class="fa fa-calendar"></i>{{- $.t("competition.start-date") }}&nbsp;{{- startDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(startDate)) : '' }}</span>
        {{ if(startDate !== finishDate) { }}
        &nbsp;-&nbsp;<span>{{- $.t("competition.finish-date") }}&nbsp;{{- finishDate != null ? $.datepicker.formatDate(DateUtils.getFormat(), new Date(finishDate)) : '' }}</span>
        {{ } }}
        <span>{{- competitionStates.get(stateId).get('name') }}</span>
        <span>{{- competitionTypes.get(typeId).get('name') }}</span>
        <sec:authorize access="isAuthenticated()">
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
