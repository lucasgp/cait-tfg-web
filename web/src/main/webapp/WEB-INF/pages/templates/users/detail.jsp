<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>
<div >
    <h2>{{- name }}&nbsp;{{- surname }}&nbsp;-&nbsp;{{- username }}</h2>
    <sec:authorize access="isFullyAuthenticated() and hasRole('ADMIN')">
        <div class="w25 field mr05">
            <label>{{- $.t('user.user-role') }}</label>
            <span id="role-types" ><!-- Role types --></span>
        </div>
        <div class="field">
            <input id="submit-role" type="button" value="{{- $.t('form.save') }}">
        </div>
    </sec:authorize>
</div>

<h3>{{- $.t("user.user-competitions") }}</h3>
<div id="user-competitions">

</div>

<h3>{{- $.t("user.user-participations") }}</h3>
<div id="user-participations">

</div>

<h3>{{- $.t("user.user-trackings") }}</h3>
<div id="user-trackings">

</div>