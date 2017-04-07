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
	});

	$urlRouterProvider.otherwise("home");

}]);

app.controller('HomeCtrl', ['$scope', function(){}
	
]);


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
