<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/pages/taglibs.jsp" %>

<input id="competition-name" placeholder="New competition?" autofocus>
<input id="competition-description" placeholder="What's this competition about?">
<input id="competition-startDate">
<input id="competition-finishDate">

<a href="javascript:void(0);" id="show-map">Show map</a>

<div id="map-wrapper"><!-- Map --></div>

<input id="submit-competition" type="button" value="Submit">
