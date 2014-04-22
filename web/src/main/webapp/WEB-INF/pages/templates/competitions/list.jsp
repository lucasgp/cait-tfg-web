<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<div id="competition-search">
    <input id="competition-search-name" type="text" placeholder="Competition name..." value="{{-query.params.name}}">
    <input id="competition-search-from" type="text" >
    <input id="competition-search-to" type="text" >
    <%-- <input id="competition-search-owned" type="checkbox" name="owned" value="true">Only own competitions --%>
    <input id="submit-search" type="button" value="Submit">
    <input id="clear-search" type="button" value="Clear">
    {{ if(query.page > 0) { }}
    <input id="submit-prev" type="button" value="Prev">
    {{ } }}
    {{ if(((query.page + 1) * query.size) < competitions.totalElements ) { }}
    <input id="submit-next" type="button" value="Next">
    {{ } }}

</div>

{{ if(competitions && competitions.length > 0) {}}
<ul id="competition-list"><!-- Competitions --></ul>
{{ } else {}}
<p><i class="fa fa-frown-o"></i> No competitions found...</p>
{{}}}