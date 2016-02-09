angular.module('sortApp', ['rf.state.history'])
    .config(function($stateProvider, $urlRouterProvider){

        // For any unmatched url, send to /
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('route', {
                url: "/?searchFish&sortType&sortReverse&filters",
                templateUrl: "route.html",
                controller: 'mainController'
            })
            .state('route1', {
            url: "/route1?searchFish&sortType&sortReverse",
            templateUrl: "route.html",
            controller: 'mainController'
        });

    })

    .controller('mainController', function($scope,$stateParams,$state,stateHistoryService) {
        //copy url params to scope

        stateHistoryService.mappingScope($scope,$stateParams);
        // set the default sort type
        // set the default sort order
        // set the default search/filter term
        _.defaults($scope,{'sortType':'name',sortReverse:false,searchFish:''});

        // create the list of sushi rolls
        $scope.sushi = [
            { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
            { name: 'Philly', fish: 'Tuna', tastiness: 4 },
            { name: 'Tiger', fish: 'Eel', tastiness: 7 },
            { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
        ];




    });
