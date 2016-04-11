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

app1.controller('carsCtrl', function($scope, $http, $log, $rootScope) {

  $scope.getData = function() {
    $http.get("http://localhost:89/ForAngularJS/cars_mysql.php")
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
        $http.post("http://localhost:89/ForAngularJS/post_cars_mysql.php", {"manufacture" : $data.manufacture, "model" :
            $data.model, "year" : $data.year})
            .success(function($successfull){
                $log.info($successfull);

                //$("#carAddDialog").slideToggle();
                $( "#carAddDialog" ).dialog();
            })
            .error(function($err){
                $log.info($err);
            });
    };

  $scope.getCarInfo = function($car){
    $log.info($car);
      if(strUser == ""){
          //alert("Izvēlies automašīnu!");
          //$("#dialog").slideToggle();
          document.getElementById("dialogValue").innerHTML = "Izvēlies automašīnu!";
          $( "#dialog" ).dialog();
      }else {
          var e = document.getElementById("car_options");
          var strUser = e.options[e.selectedIndex].value;
          var splitVersion = strUser.split(" ");
          $http.post("http://localhost:89/ForAngularJS/get_car_services.php",
              {"selectedManufacture" : splitVersion[0], "selectedModel" : splitVersion[1],
                  "selectedYear" : splitVersion[2]})
              .then(function (response) {
                  //$scope.cars = response.data.records;
                  $log.info(response.data.records);
                  $rootScope.carDetails = response.data.records;
              });
      }
  };
});

app1.controller('maintenanceCtrl', function($scope, $http, $log, $rootScope) {
  $scope.frmToggleCarService = function () {
    $log.info("Show car maintence info");
    $("#car_input_form").slideToggle();
  };

    $scope.updateMaintenanceTable = function () {

        var e = document.getElementById("car_options");
        var strUser = e.options[e.selectedIndex].value;

        if(strUser == ""){
            //alert("Izvēlies automašīnu!");
            //$("#dialog").slideToggle();
            document.getElementById("dialogValue").innerHTML = "Izvēlies automašīnu!";
            $( "#dialog" ).dialog();
        }else {
            $scope.carMaintenance = $rootScope.carDetails;
            if(Object.keys($rootScope.carDetails).length == 0){
                //$("#dialog").slideToggle();
                document.getElementById("dialogValue").innerHTML = "Izvēlētajam transportlīdzeklim nav veiktas apkopes.";
                $( "#dialog" ).dialog();
            }
            $log.info($rootScope.carDetails);

            $scope.calculateCarCost();
        }
    };

    $scope.calculateCarCost = function () {
        $log.info("Loop through");
        var totalCost = 0;
        angular.forEach($scope.carMaintenance, function(item){
            totalCost += parseInt(item.Cost_service);
        });

        $scope.carTotalCosts = totalCost.toString();

        var totalOilChange = 0;
        var totalTimingBeltChange = 0;
        var totalCarFixes = 0;

        angular.forEach($scope.carMaintenance, function (oil) {
            if(oil.Service == "Ellas maina")
            {
                totalOilChange += 1;
            }
            else if(oil.Service == "Zobsiksanas maina")
            {
                totalTimingBeltChange += 1;
            }
            else if(oil.Service == "Remonts")
            {
                totalCarFixes += 1;
            }
        });

        $scope.totalOilChanges = totalOilChange.toString();
        $scope.totalTimingBelts = totalTimingBeltChange.toString();
        $scope.totalCarFix = totalCarFixes.toString();
    };

    $scope.clearMaintenanceTable = function () {
        $scope.carMaintenance = null;
        $scope.carTotalCosts = null;
        $scope.totalOilChanges = null;
        $scope.totalTimingBelts = null;
        $scope.totalCarFix = null;
        document.getElementById("car_options").selectedIndex = 0;
        
        
    };

    $scope.deleteCarMaintenance = function () {
      $log.info("DZESU");
    };
    
  $scope.setCarMaintenance = function($new_car_info){

    var e = document.getElementById("car_options");
    var strUser = e.options[e.selectedIndex].value;

    if(strUser == ""){
      //alert("Izvēlies automašīnu!");
        //$("#dialog").slideToggle();
        document.getElementById("dialogValue").innerHTML = "Izvēlies automašīnu!";
        $( "#dialog" ).dialog();
    }else {

      var splitVersion = strUser.split(" ");

      //$log.info(strUser);
      $log.info($new_car_info);

      $http.post("http://localhost:89/ForAngularJS/set_car_services.php", {"selectedModel" : splitVersion[1],
            "selectedManufacture" : splitVersion[0], "selectedYear" : splitVersion[2], "option" : $new_car_info.option,
            "date" : $new_car_info.date, "cost" : $new_car_info.cost, "comment" : $new_car_info.comment})
          .success(function (response) {
              $(function() {
                  //No need for slide - just show dialog
                  document.getElementById("dialogValue").innerHTML = "Apkope ir veiksmīgi pievienota!";
                  $( "#dialog" ).dialog();
                  document.getElementById("car_maintenance_options").value = '';
                  document.getElementById("car_maintenance_date").value = '';
                  document.getElementById("car_maintenance_cost").value = '';
                  document.getElementById("maintenance_comments").value = '';

              });
          });
    }
  };

    $scope.getCarMaintenance = function($new_car_info) {
        $log.info("getting car maintenance");
        var e = document.getElementById("car_options");
        var strUser = e.options[e.selectedIndex].value;

        if(strUser == ""){
            //alert("Izvēlies automašīnu!");
            //$("#dialog").slideToggle();
            document.getElementById("dialogValue").innerHTML = "Izvēlies automāšinu!";
            $( "#dialog" ).dialog();
        }else {
            var splitVersion = strUser.split(" ");

            $http.get("http://localhost:89/ForAngularJS/get_car_services.php",
                {"selectedManufacture" : splitVersion[0], "selectedModel" : splitVersion[1],
                    "selectedYear" : splitVersion[2]})
                .then(function (response) {
                    //$scope.cars = response.data.records;
                    $log.info(response.data.records);
                });
        }
    };



});