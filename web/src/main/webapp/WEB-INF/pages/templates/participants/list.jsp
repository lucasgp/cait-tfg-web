<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(participants && participants.length > 0) { }}

<ul id="participants-list"><!-- Participants --></ul>

{{ } else { }}

<p>{{- $.t("participant.list-empty") }}</p>

{{ } }}