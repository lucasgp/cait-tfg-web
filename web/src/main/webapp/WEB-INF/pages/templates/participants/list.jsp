<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(participants && participants.length > 0) { }}
<ul id="participants-list"></ul>
{{ } else { }}
<p>No participants in this competition yet! Wan't to join?</p>
{{ } }}