<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<select id="{{-formPrefix}}typeId">
    {{ competitionTypes.each(function(competitionType) { }}
    <option value="{{-competitionType.id}}" {{- competitionType.id === selectedId? "selected" : ""}}>{{-competitionType.get('name') }}</option>
    {{ }); }}
</select>
