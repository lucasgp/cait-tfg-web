<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(comments && comments.length > 0) {}}
<ul id="comments-list"><!-- Comments --></ul>
{{ } else {}}
<p>{{- $.t("comment.list-empty") }}</p>
{{}}}

<sec:authorize access="isAuthenticated()">
    <div id="comment-form">
        <div>
            <input id="comment-title" size="50" placeholder="{{- $.t('comment.form.title-placeholder') }}" autofocus>
            <input id="submit-comment" type="button" value="{{- $.t('comment.form.submit') }}">
        </div>
        <div><textarea id="comment-content" cols="50" rows="5" placeholder="{{- $.t('comment.form.content-placeholder') }}"></textarea></div>

    </div>
</sec:authorize>