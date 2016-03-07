/**
 * Created by erassy on 3/6/2016.
 */

var app = angular.module('Emergency-App', ["ngMaterial", "ngAnimate"]);
app.controller('listController', function($scope) {
    $scope.names = ["Erassy", "Frieda", "Lukas", "Leonard", "Tuli", "Bertie"];
});
app.controller('cardCtrl', function($scope) {
    $scope.Location = 'Windhoek';
});