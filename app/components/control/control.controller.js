(function () {
    angular.module('app.components.control')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', 'WatsonIoT', '$timeout'];
    function ControlController($state, $localStorage, messageShow, $timeout, WIoT, $timeout) {

        var vm = this;
        vm.manual = true;
        vm.data2 = {};
        vm.zone_1 = [];
        vm.zone_2 = [];
        vm.pumb_1 = false;
        vm.pumb_2 = false;
        vm.boiler_1 = false;
        vm.boiler_2 = false;
        vm.fan_1 = false;
        vm.fan_2 = false;
        vm.light = false
        vm.fan1Change = fan1Change;
        vm.fan2Change = fan2Change;
        vm.pumb1Change = pumb1Change;
        vm.pumb2Change = pumb2Change;
        vm.boiler1Change = boiler1Change;
        vm.boiler2Change = boiler2Change;
        vm.lightChange = lightChange;
        vm.modeChange = modeChange;
        vm.connected = false;
        vm.wait = false;
        vm.socket = io.connect('http://localhost:3000/device-node');
        var config = {
            "org": "8usbvc",
            "id": "myapp",
            "auth-key": "a-8usbvc-r9f4xyc9cz",
            "auth-token": "ZP(AcgR@dJ)A63c)u3",
            "type": "shared"
        }
        vm.data = {};

        function fan1Change() {
            if (!vm.wait) {
                vm.fan_1 = !vm.fan_1;
                console.log('fan1', vm.fan_1);
                vm.wait = true;
                vm.socket.emit('fan1', vm.fan_1);
            } else {
                console.log('wait...')
            }
        }
        function fan2Change() {
            if (!vm.wait) {
                vm.fan_2 = !vm.fan_2;
                console.log('fan2', vm.fan_2);
                vm.wait = true;
                vm.socket.emit('fan2', vm.fan_2);
            } else {
                console.log('wait...')
            }
        }
        function pumb1Change() {
            if (!vm.wait) {
                vm.pumb_1 = !vm.pumb_1
                console.log('pumb1', vm.pumb_1);
                vm.wait = true;
                vm.socket.emit('pumb1', vm.pumb_1);
            } else {
                console.log('wait...')
            }
        }
        function pumb2Change() {
            if (!vm.wait) {
                vm.pumb_2 = !vm.pumb_2;
                console.log('pumb2', vm.pumb_2);
                vm.wait = true;
                vm.socket.emit('pumb2', vm.pumb_2);
            } else {
                console.log('wait...')
            }
        }
        function boiler1Change() {
            if (!vm.wait) {
                vm.boiler_1 = !vm.boiler_1
                console.log('boiler1', vm.boiler_1);
                vm.wait = true;
                vm.socket.emit('boiler1', vm.boiler_1);
            } else {
                console.log('wait...')
            }
        }
        function boiler2Change() {
            if (!vm.wait) {
                vm.boiler_2 = !vm.boiler_2;
                console.log('boiler2', vm.boiler_2);
                vm.wait = true;
                vm.socket.emit('boiler2', vm.boiler_2);
            } else {
                console.log('wait...')
            }
        }
        function lightChange() {
            if (!vm.wait) {
                vm.light = !vm.light;
                console.log('light', vm.light);
                vm.wait = true;
                vm.socket.emit('light', vm.light);
            } else {
                console.log('wait...')
            }
        }

        function modeChange() {
            if (!vm.wait) {
                vm.manual = !vm.manual;
                console.log('mode', vm.manual);
                vm.wait = true;
                vm.socket.emit('mode', vm.manual);
            } else {
                console.log('wait...')
            }
        }

        vm.socket.on('deviceNodeData', function (data) {
            vm.connected = true;
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
                        if (vm.zone_1[3] === "on" || vm.zone_1[3] === "off") {
                            vm.fan_1 = vm.zone_1[3] === "on" ? true : false;
                        }
                        if (vm.zone_2[3] === "on" || vm.zone_2[3] === "off") {
                            vm.fan_2 = vm.zone_2[3] === "on" ? true : false;
                        }
                        if (vm.zone_1[4] === "on" || vm.zone_1[4] === "off") {
                            vm.pumb_1 = vm.zone_1[4] === "on" ? true : false;
                        }
                        if (vm.zone_2[4] === "on" || vm.zone_2[4] === "off") {
                            vm.pumb_2 = vm.zone_2[4] === "on" ? true : false;
                        }
                        if (vm.zone_1[5] === "on" || vm.zone_1[5] === "off") {
                            vm.light = vm.zone_1[5] === "on" ? true : false;
                        }
                        if (vm.zone_1[6] === "on" || vm.zone_1[6] === "off") {
                            vm.boiler_1 = vm.zone_1[6] === "on" ? true : false;
                        }
                        if (vm.zone_2[6] === "on" || vm.zone_2[6] === "off") {
                            vm.boiler_2 = vm.zone_2[6] === "on" ? true : false;
                        }
                        console.log(vm.zone_1);
                        console.log(vm.zone_2)
                    } else {
                        if(o){
                        vm.zone_1 = o.split(",")
                        }
                    }
                }

            })
        })
    }
})();