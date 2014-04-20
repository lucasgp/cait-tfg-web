<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(comments && comments.length > 0) {}}
<ul id="comments-list"><!-- Comments --></ul>
{{ } else {}}
<p>No comments in this competition yet! Do you have something to share?</p>
{{}}}

<sec:authorize access="isAuthenticated()">
    <div id="comment-form">
        <div>
            <input id="comment-title" size="50" placeholder="What are you going to write about?" autofocus>
            <input id="submit-comment" type="button" value="Comment">
        </div>
        <%-- <input id="comment-content" type="text" placeholder="Content?"> --%>
        <div><textarea id="comment-content" cols="50" rows="5" placeholder="Write about it!"></textarea></div>

    </div>
</sec:authorize>