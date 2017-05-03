angular.module('app.services')
    .service('customerService', accountService);

accountService.$inject = ['$q', 'Restangular', 'appConfigs'];

function accountService($q, Restangular, appConfigs) {
    var customerRest = Restangular.all(appConfigs.API.USER.BASE);

    return {
        getListCustomer: getListCustomer,
        getOneCustomer: getOneCustomer,
        updateCustomer: updateCustomer
    }

    function getListCustomer(query) {
        var deferred = $q.defer();

        customerRest.one(appConfigs.API.USER.CUSTOMER)
            .get(query)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function getOneCustomer(userId) {
        var deferred = $q.defer();

        customerRest.one(appConfigs.API.USER.CUSTOMER, userId)
            .get()
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function updateCustomer(userId, userInfo) {
        var fd = new FormData();

        fd.append("first_name", userInfo.first_name);
        fd.append("last_name", userInfo.last_name);
        fd.append("mobile_number", userInfo.mobile_number);
        fd.append("email", userInfo.email);
        fd.append("blocked", userInfo.blocked);
        if (userInfo.image && !angular.equals(userInfo.image, {})) {
            fd.append("image", userInfo.image);
        }

        var deferred = $q.defer();

        customerRest.one(appConfigs.API.USER.CUSTOMER, userId)
            .withHttpConfig({ transformRequest: angular.identity })
            .customPATCH(fd, undefined, undefined,
            { 'Content-Type': undefined })
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }
}