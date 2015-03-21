/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License. 
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        this.setupBTLE();
    },
    setupBTLE: function(){
        //alert('yoyo BTLE setuptime');
        app.adverts = false;
        cordova.plugins.locationManager.isAdvertisingAvailable()
            .then(function(isSupported) {
                console.log("isSupported: " + isSupported);
                app.adverts = true;
                alert('BTLE Broadcast is Supported: '+ isSupported);
                
            })
            .fail(console.error)
            .done();
            
            
            var uuid = '58c1a8f5-7e5d-4121-8546-8217b941ebc7';
            var identifier = 'advertisedBeacon';
            var minor = 2000;
            var major = 5;
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
            
            // The Delegate is optional
            var delegate = new cordova.plugins.locationManager.Delegate();
            
            // Event when advertising starts (there may be a short delay after the request)
            // The property 'region' provides details of the broadcasting Beacon
            delegate.peripheralManagerDidStartAdvertising = function(pluginResult) {
                console.log('peripheralManagerDidStartAdvertising: ' + JSON.stringify(pluginResult.region));
            };
            // Event when bluetooth transmission state changes 
            // If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
            delegate.peripheralManagerDidUpdateState = function(pluginResult) {
                console.log('peripheralManagerDidUpdateState: ' + pluginResult.state);
            };
            
            cordova.plugins.locationManager.setDelegate(delegate);
            
            // Verify the platform supports transmitting as a beacon
            cordova.plugins.locationManager.isAdvertisingAvailable()
                .then(function(isSupported) {
            
                    if (isSupported) {
                        cordova.plugins.locationManager.startAdvertising(beaconRegion)
                            .fail(console.error)
                            .done();
                    }
                    else {
                        console.log("Advertising not supported");
                    }
                })
                .fail(console.error)
                .done();
            
            
    }
};
