var app = angular.module("myApp", []);

app.controller("mainCtrl", ["$scope", "$http", function($scope, $http){
	$scope.userinput = $("input").val();
var wapi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var callbackpart = '&callback=JSON_CALLBACK';
var page = 'http://en.wikipedia.org/?curid=';

	$scope.getData = function(){
		if( !!$scope.userinput == false) { return false; } 
		else {
			$http.jsonp( wapi + $scope.userinput + callbackpart).success(function(data){
			$scope.userinput = "";
			$scope.results = [];
			var resultz = data.query.pages;

			angular.forEach(resultz, function(v,k)  {

	       $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
	        console.log("succes funct");
	    })
		}).error(function(){ console.log("something went wrong")});
		}
	}
}]);