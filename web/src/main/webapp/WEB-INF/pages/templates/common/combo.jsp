<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<select id="{{-elementId}}">
    {{ if(includeOptionAll) { }}
    <option value="">{{- $.t('form.all') }}</option>
    {{ } }}
    {{ collection.each(function(element) { }}
    <option value="{{-element.id}}" {{- element.id === selectedId? "selected" : ""}}>{{-element.get('name') }}</option>
    {{ }); }}
</select>
