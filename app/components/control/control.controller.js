(function () {
    angular.module('app.components.control')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', 'WatsonIoT', '$timeout'];
    function ControlController($state, $localStorage, messageShow, $timeout, WIoT, $timeout) {

        var vm = this;
        vm.data2 = {};
        vm.zone_1 = [];
        vm.zone_2 = [];
        vm.fan_1 = false;
        vm.fan_2 = false;
        vm.fan1Change = fan1Change;
        vm.fan2Change = fan2Change;
        vm.connected = false;
        vm.socket = io.connect('https://hoanghuuhung.herokuapp.com/device-node');
        var config = {
            "org": "8usbvc",
            "id": "myapp",
            "auth-key": "a-8usbvc-r9f4xyc9cz",
            "auth-token": "ZP(AcgR@dJ)A63c)u3",
            "type": "shared"
        }
        vm.data = {};
        var appClient = new WIoT(config);
        // appClient.host = "wss://8usbvc.messaging.internetofthings.ibmcloud.com:1883"
        // $timeout(function () {
        //     appClient.connect();
        // }, 300)
        appClient.on("connect", function () {
            $timeout(function () {
                vm.connected = true;
                // var myData = { 'onfan': 1 };
                // myData = JSON.stringify(myData);
                // setInterval(function () {
                //     appClient.publishDeviceCommand("esp8266", "device01", "light", "json", myData);
                //     // console.log(appClient.publishDeviceCommand("NodeMCU_DHT11", "Test1", "light", "json", myData))
                // }, 1000)
                appClient.subscribeToDeviceEvents();
            });

        })
        appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
            var arr = {};
            $timeout(function () {
                if (payload) {
                    var pay = payload.toString('utf8').trim();
                    console.log("pay: ", pay);
                    if (pay.indexOf(";") > -1) {
                        var array = pay.split(";");
                        var newArray = [];
                        console.log(array)
                        vm.zone_1 = array[0].split(",")
                        vm.zone_2 = array[1].split(",")
                        vm.fan_1 = vm.zone_1[3] === "on" ? true: false;
                        vm.fan_2 = vm.zone_2[3] === "on" ?true: false;
                        console.log(vm.zone_1);
                        console.log(vm.zone_2)
                    } else {
                        vm.zone_1 = o.split(",")
                    }
                }

            })
        });

        appClient.on("error", function (err) {
            vm.connected = false;
            console.log("Error : " + err);
        })

        function fan1Change() {
            console.log(vm.fan_1);
        }
         function fan2Change() {
            console.log(vm.fan_2);
        }

        vm.socket.on('deviceNodeData', function (data) {
            $timeout(function () {
                $timeout(function () {
                if (data) {
                    var pay = data
                    console.log("pay: ", pay);
                    if (pay.indexOf(";") > -1) {
                        var array = pay.split(";");
                        var newArray = [];
                        console.log(array)
                        vm.zone_1 = array[0].split(",")
                        vm.zone_2 = array[1].split(",")
                        vm.fan_1 = vm.zone_1[3] === "on" ? true: false;
                        vm.fan_2 = vm.zone_2[3] === "on" ?true: false;
                        console.log(vm.zone_1);
                        console.log(vm.zone_2)
                    } else {
                        vm.zone_1 = o.split(",")
                    }
                }

            })
            })
        })
    }
})();