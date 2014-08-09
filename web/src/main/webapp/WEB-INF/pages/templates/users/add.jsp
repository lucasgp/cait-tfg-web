<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<div class="column1 w45 field">

    <div class="w45 mt05">
        <input class="w100" id="user-username" placeholder="{{- $.t('user.form.username-placeholder') }}">
    </div>

    <div class="w45 mt05">
        <input class="w100" id="user-name" placeholder="{{- $.t('user.form.name-placeholder') }}" autofocus>
    </div>
    <div class="w45 mt05">
        <input class="w100" id="user-surname" placeholder="{{- $.t('user.form.surname-placeholder') }}">
    </div>

    <div class="w45 mt05">
        <input class="w25" id="user-phonePrefix" placeholder="+34">
    </div>
    <div class="w45 mt05">
        <input class="w100" id="user-phoneNumber" placeholder="{{- $.t('user.form.phone-placeholder') }}">
    </div>
    <div class="w45 mt05">
        <input class="w100" id="user-email" type="email" placeholder="{{- $.t('user.form.email-placeholder') }}">
    </div>

    <div class="w45 mt05">
        <input class="w100" id="user-password" type="password" placeholder="{{- $.t('user.form.password-placeholder') }}">
    </div>

    <div class="w100 mtLabel">
        <input id="submit-user" type="button" value="{{- $.t('user.form.submit') }}">
    </div>
</div>
