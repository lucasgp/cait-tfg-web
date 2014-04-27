<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<select id="{{-formPrefix}}stateId">
    {{ competitionStates.each(function(competitionState) { }}
    <option value="{{-competitionState.id}}" {{- competitionState.id === selectedId? "selected" : ""}}>{{-competitionState.get('name') }}</option>
    {{ }); }}
</select>
