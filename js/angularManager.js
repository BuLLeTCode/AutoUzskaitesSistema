/**
 * Created by Raivis on 2016.03.15..
 */
var app1 = angular.module("app1", []);

app1.controller("ctrl1", function($scope){
    $scope.first = 1;
    $scope.second = 1;

    $scope.updateValue = function(){
        $scope.calculation = $scope.first + " + " + $scope.second + " = " + (+$scope.first + +$scope.second);
    };
});

app1.controller('carsCtrl', function($scope, $http, $log) {

    $scope.getData = function() {
        $http.get("http://localhost:89/angular/cars_mysql.php")
            .then(function (response) {
                $scope.cars = response.data.records;
                $log.info(response.data.records);
            });
    };

    $scope.frmToggle = function () {
        $("#car-form").slideToggle();
    };

    $scope.pushData = function($data){
        //To log information...
        $log.info($data);

        //Time to try some post...
        $http.post("http://localhost:89/angular/post_cars_mysql.php", {"manufacture" : $data.manufacture, "model" :
            $data.model, "year" : $data.year})
            .success(function($successfull){
                $log.info($successfull);
            })
            .error(function($err){
                $log.info($err);
            });
    };

    $scope.getCarInfo = function($car){
       //$log.info($car);
        var str = $car.toString();
        var split = str.split(" ");

        $http.get("http://localhost:89/angular/cars_mysql.php", {"selectedManufacture" : split[0], "selectedModel" :
            split[1], "selectedYear" : split[2]})
            .then(function (response) {
                $scope.car_info = response.data.records;
            });
    };
});

app1.controller('maintenanceCtrl', function($scope, $http, $log) {
    $scope.frmToggleCarService = function () {
        $log.info("Show car maintence info");
        $("#car_input_form").slideToggle();
    };

    $scope.setCarInfo = function($new_car_info){
        $log.info($new_car_info);
    };
});