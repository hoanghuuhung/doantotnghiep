angular.module('app.services')
    .service('accountService', accountService);

accountService.$inject = ['$q', 'Restangular', 'appConfigs'];

function accountService($q, Restangular, appConfigs) {
    var accountRest = Restangular.all(appConfigs.API.USER.BASE);

    return {
        getListCustomer: getListCustomer,
        getListDrivers: getListDrivers
    }

    function getListCustomer(query) {
        var deferred = $q.defer();

        accountRest.one(appConfigs.API.USER.CUSTOMER)
            .get(query)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function getListDrivers(query) {
        var deferred = $q.defer();

        accountRest.one(appConfigs.API.USER.DRIVER)
            .get(query)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

     function login(account) {
            var deferred = $q.defer();

            authRest.all(CONSTANT.API.AUTH.LOGIN).withHttpConfig({
                transformRequest: function (data) {
                    var str = [];
                    for (var p in data)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                    return str.join("&");
                }
            }).post(account, null, {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': $localStorage.loginKey
            })
                .then(function (res) {
                    $localStorage.passwordLength = account.password.length;
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
}