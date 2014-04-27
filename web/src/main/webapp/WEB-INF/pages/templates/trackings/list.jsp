<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(trackings && trackings.length > 0) { }}
<ul id="trackings-list"><!-- Trackings --></ul>
{{ } else { }}
<p>{{- $.t("tracking.list-empty") }}</p>
{{ } }}