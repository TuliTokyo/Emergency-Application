var app = angular.module("app", []);
app.controller("Send", function ($scope, $http) {
    $scope.SendData = function () {
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// send login data
        $http({
            method: 'POST',
            url: 'http://e-merge.herokuapp.com/addService',
            data: $.param({
                sname: $scope.sname,
                town: $scope.town,
                emphone: $scope.emphone,
                emtype: $scope.emtype,
                residence: $scope.residence,
                lat: $scope.lat,
                long: $scope.long
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            // handle success things
        }).error(function (data, status, headers, config) {
            // handle error things


        })}
});