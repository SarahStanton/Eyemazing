"use strict";

var app = angular.module('SightLife', ["ui.router"]); //ngSanitize

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state("Country", {
		url: "/Country",
		templateUrl: "partials/country.html",
	})
	.state("India", {
		url: "/Country/:India",
		templateUrl: "./partials/home.html",
		controller: "HomeCtrl"
	})
	.state("State", {
		url: "/State/:StateName",
		templateUrl: "partials/State.html",
		controller: "StateCtrl",
	})

	$urlRouterProvider.otherwise("Country");

}]);

app.factory('myService', function() {

	var service = {}; //object that is the service

	service.currentCountry = "";

	service.addCurrentCountry = function(newCountry) { 
		service.currentCountry = newCountry;
	};

	service.getCurrentCountry = function() {
		return service.currentCountry;
	};

	service.currentState = "";

	service.addCurrentState = function(newState) { 
		service.currentState = newState;
	};

	service.getCurrentState = function() {
		return service.currentState;
	};

	return service; //return service
});

app.controller('CountryCtrl', ['$scope', '$location', 'myService', function($scope, $location, myService){
	$scope.countries = ['India']

	$scope.updatePath = function() {
		$location.path("/Country/:" + this.singleSelect);
		console.log(this);
		myService.addCurrentCountry(this.singleSelect);
    }
	
}]);

app.controller('HomeCtrl', ['$scope', '$location', 'myService', function($scope, $location, myService){
	$scope.states = ['Delhi', 'Tamil Nadu', 'Rajasthan', 'Andhra Pradesh', 'Telengana', 'Punjab', 'Gujarat', 'Kerala', 'Haryana', 'Chandigarh', 'UP', 'Maharashtra', 'West Bengal', 'Puducherry', 'Karnataka', 'Orissa/Odisha', 'Bihar', 'Madhya Pradesh', 'Jharkhand', 'Chhatisgarh', 'Goa','Himachal Pradesh', 'Jammu and Kashmir', 'Manipur', 'Assam', 'Tripura', 'Nagaland', 'Arunchal Pradesh', 'Mizoram', 'Sikkim']

	$scope.updatePath = function() {
		$location.path("/State/:" + this.singleSelect);

		myService.addCurrentState(this.singleSelect);
    }
	
}]);

app.controller("StateCtrl", ['$scope', '$http', '$location','myService', function($scope, $http, $location, myService){
	$scope.State = myService.getCurrentState();

	$http.get('../data/stateData.json').success(function(stateList) {
		$scope.data = stateList[$scope.State];
	});

	$(function() {

			Plotly.d3.csv('../data/tb_prev_2010.csv', function(err, rows){

				function unpack(rows, key) {
					return rows.map(function(row) { 
						return row[key]; 
					});
				}

				var countryCode = unpack(rows, 'country_code'),
					prevalence = unpack(rows, 'prev_2010'),
					countryPrevalence = [],
					hoverText = [],
					scale = 4000;

				for ( var i = 0 ; i < prevalence.length; i++) {
					var currentSize = prevalence[i] * scale;
					var currentText = countryCode[i] + ": "+ Math.round(prevalence[i] * 100000) + " cases per 100K people";
					countryPrevalence.push(currentSize);
					hoverText.push(currentText);
				}

				var data = [{
					type: 'scattergeo',
					locations: countryCode,
					locationmode: 'ISO-3',
					hoverinfo: 'text',
					text: hoverText,
					marker: {
						size: countryPrevalence,
						color: countryPrevalence,
						line: {
							color: 'black',
							width: 2
						},
					}
				}];

				var layout = {
					title: 'World TB prevalence in 2010',
					showlegend: false,
					geo: {
						scope: 'world',
						projection: {
							type: 'natural earth'
							
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

				Plotly.plot(bubbleMap, data, layout, {showLink: false});

			});

	});

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
