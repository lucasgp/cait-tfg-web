<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<input id="competition-name" placeholder="New competition?" autofocus value="{{-name}}">
<textarea id="competition-description" cols="50" rows="5" placeholder="What's this competition about?" >{{-description}}</textarea>
<input id="competition-startDate" value="{{-startDate}}">
<input id="competition-finishDate" value="{{-finishDate}}">
<input id="competition-typeId" value="1">
<input id="competition-stateId" value="1">

<a id="show-map"><i class="fa fa-globe"></i></a>

<div id="map-wrapper"><!-- Map --></div>

<input id="submit-competition" type="button" value="Submit">
