(function () {
    'use strict';

    angular.module('app.services')
        .service('globalSettingService', globalSettingService);

    globalSettingService.$inject = ['$q', 'Restangular', 'appConfigs', '$localStorage'];

    function globalSettingService($q, Restangular, appConfigs, $localStorage) {
        var globalSettingRest = Restangular.one(appConfigs.API.GLOBAL_SETTINGS.BASE);

        return {
            getLoginKey: getLoginKey
        }

        function getLoginKey() {
            var deferred = $q.defer();

            globalSettingRest.one(appConfigs.API.GLOBAL_SETTINGS.LOGIN_KEY)
                .get()
                .then(function (res) {
                    $localStorage.loginKey = res.value;
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }

})();