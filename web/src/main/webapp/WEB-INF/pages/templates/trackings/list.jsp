<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(trackings && trackings.length > 0) { }}

{{ if(query.page > 0) { }}
<div id="submit-prev" class="search-nav mt05"><i class="fa fa-chevron-left fa-3x fa-rotate-90"></i></div>
{{ } }}

<ul id="trackings-list"><!-- Trackings --></ul>

{{ if(((query.page + 1) * query.size) < trackings.totalElements ) { }}
<div id="submit-next" class="search-nav mt05"><i class="fa fa-chevron-right fa-3x fa-rotate-90"></i></div>
{{ } }}

{{ } else { }}
<p>{{- $.t("tracking.list-empty") }}</p>
{{ } }}