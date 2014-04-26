<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<input id="user-name" placeholder="{{- $.t('user.form.name-placeholder') }}" autofocus>
<input id="user-surname" placeholder="{{- $.t('user.form.surname-placeholder') }}">
<input id="user-username" placeholder="{{- $.t('user.form.username-placeholder') }}">
<input id="user-password" type="password" placeholder="{{- $.t('user.form.password-placeholder') }}">
<input id="user-phonePrefix" placeholder="+34">
<input id="user-phoneNumber" placeholder="{{- $.t('user.form.phone-placeholder') }}">
<input id="user-email" type="email" placeholder="{{- $.t('user.form.email-placeholder') }}">
<input id="submit-user" type="button" value="{{- $.t('user.form.submit') }}">
