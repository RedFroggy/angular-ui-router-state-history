/**
 * Created by David JAY on 29/01/2016.
 * Store params of state and reload then when state is called again
 */
(function() {

    /**
     * The state history module
     */
    var stateHistory = angular.module('rf.state.history',
        [
            'ui.router',
            'angular-storage'
        ]);

    /**
     * override the $state's method transitionTo to store params of the state
     * @param $provide
     */
    var stateHistoryConfigure = function ($provide) {
        var $state_transitionTo;
        $provide.decorator("$state", ['$delegate', '$q', 'stateStore', function ($state, $q, stateStore) {
            $state_transitionTo = $state.transitionTo;
            $state.transitionTo = function (to, toParams, options) {
                var toState = $state.get(to);
                if (toParams == null && stateStore.get(toState.name) !== undefined){
                    toParams =  stateStore.get(to);
                    arguments[1] = toParams;
                }

                return $state_transitionTo.apply($state, arguments).then(
                    function (result) {
                        stateStore.set(toState.name, toParams);
                        return result;
                    },
                    function (err) {
                        stateStore.remove(toState.name);
                        return $q.reject(err);
                    }
                );
            };
            return $state;
        }]);
    };

    // angular module configuration
    stateHistory.config(["$provide", stateHistoryConfigure]);


    /**
     * state history service contains mapping scope method ang stateStore getter
     * @param $state
     * @param stateStore
     */
    var stateHistoryService = function($state,stateStore){

        /**
         * Map stateParams of a state to scope variables and synchronized this params
         * @param scope
         * @param stateParams
         */
        this.mappingScope = function(scope,stateParams){
            angular.extend(scope, stateParams);
            function updateUrl(newValue, oldValue){
                stateParams[this.key] = newValue;
                $state.go('.',stateParams,{notify:false});
            }

            for (var watchKey in stateParams) {
                var updateUrlFn = updateUrl.bind({key:watchKey});
                scope.$watch(watchKey, updateUrlFn);
            }
        };

        /**
         * getter for state store
         * @returns stateStore
         */
        this.getStateStore = function (){
            return stateStore;
        }
    };

    // add stateHistory service to the module
    stateHistory.service('stateHistoryService', ["$state","stateStore",stateHistoryService]);


    /**
     * state's store service manage the history states
     */
    var stateStoreProvider = function () {

        // the default storage
        var _storage = 'localStorage';

        /**
         * Sets the storage.
         *
         * @param {String} storage The storage name
         */
        this.setStorage = function(storage) {
            if (storage && angular.isString(storage)) {
                _storage = storage;
            }
        };

        this.$get = ['store',function(store) {
            var stateStore = store.getNamespacedStore('state',_storage);

            return stateStore;
        }];
    };

    // add stateStore service to the module
    stateHistory.provider('stateStore', [stateStoreProvider]);

}());
