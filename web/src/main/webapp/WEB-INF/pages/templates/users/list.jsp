<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(users && users.length > 0) { }}
<ul id="users-list"><!-- Users --></ul>
{{ } else { }}
<p>No users found.</p>
{{ } }}