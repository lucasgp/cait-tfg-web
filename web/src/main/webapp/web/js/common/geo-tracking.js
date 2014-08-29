define([
    'jquery',
    'underscore',
    'notif-handler',
    'geo',
    'i18n',
    'collections/geo-features'
], function($, _, NotificationHandler, geoPosition, i18n, GeoFeatureCollection) {

    var GeolocationTracking = {
        _isTracking: false,
        isTracking: function() {
            return this._isTracking;
        },
        startTracking: function(params) {

            if (this.isTracking()) {
                this.stopTracking();
            }

            if ("AndroidGeolocationTracking" in window || geoPosition.init()) {

                this.trackingId = params.trackingId;
                this.interval = params.interval || 15000;
                this.minDisplacement = params.minDisplacement || 50;
                this.locationCallback = params.locationCallback || $.noop();
                this.geolocationIntervalId = null;
                this.trackingGeoFeatures = new GeoFeatureCollection([], {trackingId: this.trackingId});

                if ("AndroidGeolocationTracking" in window) {
                    //Using Android native client for tracking
                    AndroidGeolocationTracking.startTracking(this.trackingId, this.interval, this.minDisplacement);
                } else {
                    /*
                     * Using browser location capabilities for tracking.
                     * This method stops working when the browser loses focus.
                     */
                    var self = this;
                    this.geolocationIntervalId = setInterval(function() {
                        geoPosition.getCurrentPosition(function(p) {
                            self.trackingGeoFeatures.create({
                                trackingId: self.trackingId,
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [p.coords.longitude, p.coords.latitude]
                                }
                            }, {
                                wait: true,
                                success: function(model) {
                                    self.locationCallback(model);
                                },
                                error: NotificationHandler.onServerError
                            });
                        }, function(p) {
                            NotificationHandler.notify('error', p.message);
                        }, {enableHighAccuracy: true});
                    }, this.interval);
                }
                NotificationHandler.notify('information', $.t('tracking.start'));
                this._isTracking = true;
            } else {
                NotificationHandler.onGeolocationNotSupported();
            }
        },
        stopTracking: function() {
            if (this.isTracking()) {
                if ("AndroidGeolocationTracking" in window) {
                    AndroidGeolocationTracking.stopTracking();
                } else if (this.geolocationIntervalId) {
                    clearInterval(this.geolocationIntervalId);
                    this.geolocationIntervalId = null;
                }
                this._isTracking = false;
                NotificationHandler.notify('information', $.t('tracking.finish'));
            }
        }
    };
    return GeolocationTracking;
});