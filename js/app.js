"use strict";

var app = angular.module('SightLife', ["ui.router"]); //ngSanitize

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state("home", {
		url: "/home",
		templateUrl: "./partials/home.html",
		//controller: "HomeCtrl"
	})
	.state("AndhraPradesh", {
		url: "/AndhraPradesh",
		templateUrl: "partials/AndhraPradesh.html",
	})
	.state("State", {
		url: "/State",
		templateUrl: "partials/State.html",
		controller: "StateCtrl",
	});

	$urlRouterProvider.otherwise("home");

}]);

app.factory('myService', function() {

	var service = {}; //object that is the service

	//can store data in the service
	service.currentState = "";

	//can store fuctions as well!
	service.addCurrentState = function(newState) { 
		service.currentState = newState;
	};

	service.getCurrentState = function() {
		return service.currentState;
	};

	return service; //return ("build") that service
});

app.controller('HomeCtrl', ['$scope', '$location', 'myService', function($scope, $location, myService){
	$scope.states = ['Delhi', 'Tamil Nadu', 'Rajasthan', 'Andhra Pradesh', 'Telengana', 'Punjab', 'Gujarat', 'Kerala', 'Haryana', 'Chandigarh', 'UP', 'Maharashtra', 'West Bengal', 'Puducherry', 'Karnataka', 'Orissa/Odisha', 'Bihar', 'Madhya Pradesh', 'Jharkhand', 'Chhatisgarh', 'Goa','Himachal Pradesh', 'Jammu and Kashmir', 'Manipur', 'Assam', 'Tripura', 'Nagaland', 'Arunchal Pradesh', 'Mizoram, Sikkim']

	$scope.updatePath = function() {
		$location.path("/State");
		myService.addCurrentState(this.singleSelect);
    }
	
}]);

app.controller("StateCtrl", ['$scope', 'myService', function($scope, myService){
	$scope.State = myService.getCurrentState();
}]);


/*$(function() {

        Plotly.d3.csv('../india.csv', function(err, rows){

			//var myPlot = document.getElementById('mydiv'),

            function unpack(rows, key) {
                return rows.map(function(row) { 
                    return row[key]; 
                });
            }

            var countryCode = unpack(rows, 'country_code');

            var data = [{
                type: 'scattergeo',
                locations: countryCode,
                locationmode: 'ISO-3',
            }];

            var layout = {
                title: 'India',
                showlegend: false,
                geo: {
                    scope: 'asia',
                    projection: {
                        type: 'equirectangular'
                        
                    },
                    showcountries: true,
                    showland: true,
                    landcolor: 'rgb(217, 217, 217)',
                    subunitwidth: 1,
                    countrywidth: 1,
                    subunitcolor: 'rgb(255,255,255)',
                    countrycolor: 'rgb(255,255,255)'
                },
            };

            Plotly.plot(mapdiv, data, layout, {showLink: false});

			myPlot.on('plotly_click', function(data){
				//location.href='www.google.com';
			});

        });

});*/
