(function () {
    angular.module('app.components.setting')
        .controller('SettingController', SettingController);

    SettingController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', '$timeout'];
    function SettingController($state, $localStorage, messageShow, $timeout) {

        var vm = this;
        vm.connected1 = false;
        vm.wait1 = false;
        vm.connected2 = false;
        vm.wait2 = false;
        vm.listType = [];
        var topicPublish1 = "control1";
        var topicPublish2 = "control2";
        // var client = new Paho.MQTT.Client("host", port, "client_id");
        var client = new Paho.MQTT.Client("m20.cloudmqtt.com", 32733, "web_" + parseInt(Math.random() * 100, 10));
        var client2 = new Paho.MQTT.Client("m12.cloudmqtt.com", 38070, "web_" + parseInt(Math.random() * 100, 10));
        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client2.onConnectionLost = onConnectionLost2;
        client2.onMessageArrived = onMessageArrived2;
        vm.zone1Default = [
            {
                type: "xalach",
                highTemp: 25,
                lowTemp: 15,
                highHud: 80,
                lowHud: 70
            },
            {
                type: "boxoi",
                highTemp: 20,
                lowTemp: 15,
                highHud: 80,
                lowHud: 70
            },
            {
                type: "caibap",
                highTemp: 20,
                lowTemp: 18,
                highHud: 85,
                lowHud: 75
            }
        ]
        vm.zone2Default = [
            {
                type: "xalach",
                highTemp: 25,
                lowTemp: 15,
                highHud: 80,
                lowHud: 70
            },
            {
                type: "boxoi",
                highTemp: 20,
                lowTemp: 15,
                highHud: 80,
                lowHud: 70
            },
            {
                type: "caibap",
                highTemp: 20,
                lowTemp: 18,
                highHud: 85,
                lowHud: 75
            }
        ]
        if (!$localStorage.zone1) {
            $localStorage.zone1 = vm.zone1Default;
        }
        if (!$localStorage.zone2) {
            $localStorage.zone2 = vm.zone2Default;
        }
        vm.zone1 = $localStorage.zone1;
        vm.zone2 = $localStorage.zone2
        vm.send = send;
        var options = {
            useSSL: true,
            userName: "ctcjmuyy",
            password: "NFFKErc6QcQt",
            onSuccess: onConnect,
            onFailure: doFail
        }
        var options2 = {
            useSSL: true,
            userName: "fjrogfas",
            password: "7gyv_yt4tEel",
            onSuccess: onConnect2,
            onFailure: doFail2
        }

        // connect the client
        client.connect(options);
        client2.connect(options2);

        // called when the client connects
        function onConnect() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect");
            client.subscribe("event1");
            $timeout(function () {
                vm.connected1 = true;
                vm.wait1 = false;
            });
        }

        function onConnect2() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect2");
            client2.subscribe("event2");
            $timeout(function () {
                vm.connected2 = true;
                vm.wait2 = false;
            });
        }

        function doFail(e) {
            console.log(e);
        }
        function doFail2(e) {
            console.log(e);
        }



        function sendMessage(destination, message) {
            var message = new Paho.MQTT.Message(message);
            message.destinationName = destination;
            client.send(message);
        }

        function sendMessage2(destination, message) {
            var message = new Paho.MQTT.Message(message);
            message.destinationName = destination;
            client2.send(message);
        }

        // called when the client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }
        function onConnectionLost2(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost2:" + responseObject.errorMessage);
            }
        }

        // called when a message arrives
        function onMessageArrived(message) {
            console.log("onMessageArrived:" + message.payloadString);
            if (message.destinationName == "event1") {
                var data = message.payloadString;
                vm.connected1 = true;
                vm.wait1 = false;
                console.log(message.destinationName);
            }
        }

        function onMessageArrived2(message) {
            console.log("onMessageArrived2:" + message.payloadString);
            if (message.destinationName == "event2") {
                var data = message.payloadString;
                vm.connected2 = true;
                vm.wait2 = false;
            }
        }



        function send(id) {
            if (id == 1) {
                $localStorage.zone1 = vm.zone1;
                var msg = JSON.stringify(vm.zone1);
                sendMessage(topicPublish1, msg)
            } else {
                $localStorage.zone2 = vm.zone2;
                var msg = JSON.stringify(vm.zone2);
                sendMessage2(topicPublish2, msg)
            }
        }
    }
})();