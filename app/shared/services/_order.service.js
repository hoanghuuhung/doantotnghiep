angular.module('app.services')
    .service('orderService', orderService);

orderService.$inject = ['$q', 'Restangular', 'appConfigs'];

function orderService($q, Restangular, appConfigs) {
    var orderRest = Restangular.all(appConfigs.API.ADMIN.BASE);
    // var extraServicesRest = Restangular.all(appConfigs.API.EXTRA_SERVICE);

    return {
        getOneOrder: getOneOrder,
        cancelOrder: cancelOrder,
        updateOrder: updateOrder,
        getEstimation: getEstimation,
        getListOrder: getListOrder,
        getListOrderExtras: getListOrderExtras,
        getOneExtraService: getOneExtraService,
        updateExtraService: updateExtraService,
        createExtraService: createExtraService
    }

    function getOneOrder(orderId) {
        var deferred = $q.defer();
        orderRest.one(appConfigs.API.ADMIN.ORDER, orderId)
            .get()
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function updateOrder(orderId, orderInformation) {
        var deferred = $q.defer();

        orderRest.one(appConfigs.API.ADMIN.ORDER, orderId)
            .patch(orderInformation)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function cancelOrder(orderId) {
        var deferred = $q.defer();

          orderRest.one(appConfigs.API.ADMIN.ORDER, orderId).one(appConfigs.API.ORDER.CANCEL)
            .patch()
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getEstimation(data) {
        var deferred = $q.defer();
        Restangular.one(appConfigs.API.ORDER.BASE).all(appConfigs.API.ORDER.GET_ESTIMATION)
            .post(data)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getListOrder(query) {
        var deferred = $q.defer();

        orderRest.one(appConfigs.API.ADMIN.ORDER)
            .get(query)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function getListOrderExtras(query) {
        var deferred = $q.defer();
        Restangular.one(appConfigs.API.EXTRA_SERVICE.BASE)
            .get(query)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getOneExtraService(extraServiceId) {
        var deferred = $q.defer();
        Restangular.one(appConfigs.API.EXTRA_SERVICE.BASE, extraServiceId)
            .get()
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function updateExtraService(extraServiceId, extraService) {
        var deferred = $q.defer();
        Restangular.one(appConfigs.API.EXTRA_SERVICE.BASE, extraServiceId)
            .patch(extraService)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function createExtraService(extraService) {
        var deferred = $q.defer();
        Restangular.all(appConfigs.API.EXTRA_SERVICE.BASE)
            .post(extraService)
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }
}