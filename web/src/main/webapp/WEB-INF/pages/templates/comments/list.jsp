<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

{{ if(comments && comments.length > 0) {}}
<ul id="comments-list"><!-- Comments --></ul>
{{ } else {}}
<p>{{- $.t("comment.list-empty") }}</p>
{{}}}

<sec:authorize access="isAuthenticated()">
    <div class="mtLabel">
        <div class="w25 center">
            <div class="w100">
                <input class="w100" id="comment-title" placeholder="{{- $.t('comment.form.title-placeholder') }}" autofocus>
            </div>
            <div class="w100 mt05">
                <textarea class="w100" id="comment-content" cols="50" rows="5" placeholder="{{- $.t('comment.form.content-placeholder') }}"></textarea>
            </div>
            <div class="field">
                <input id="submit-comment" type="button" value="{{- $.t('comment.form.submit') }}">
            </div>
        </div>
    </div>
</sec:authorize>