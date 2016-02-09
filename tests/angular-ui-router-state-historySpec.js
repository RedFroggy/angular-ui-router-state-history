describe('history state', function () {

    beforeEach(module('rf.state.history'));

    it('should contain an stateStore service',
        inject(function(stateStore) {
            expect(stateStore).not.toEqual(null);
        }));
});

describe('stateStoreProvider.setStore("sessionStorage")', function () {

    var provider;

    beforeEach(function() {
        module('rf.state.history', function(stateStoreProvider) {
            expect(stateStoreProvider).not.toEqual(null);
            stateStoreProvider.setStorage('sessionStorage');
        });
    });

    it('should save state correctly in the sessionStorage', inject(function(stateStore, $window) {
        var value = 99;

        expect(stateStore.get('myState')).toBeUndefined;
        expect(stateStore.get('myState')).toBeNull;
        stateStore.set('myState', value);
        stateStore.inMemoryCache = {};


        expect(stateStore.get('myState')).toEqual(value);
        expect($window.sessionStorage.getItem('state.myState')).toBeDefined();
        expect($window.sessionStorage.getItem('state.myState')).not.toBeNull();
        expect($window.sessionStorage.getItem('state.myState')).toEqual(value.toString());

        stateStore.remove('myState');

        expect(stateStore.get('myState')).toEqual(null);

        expect($window.sessionStorage.getItem('state.myState')).toBeNull;
    }));
});


describe('store params of state when $state.go is called', function () {
    beforeEach(module('rf.state.history', function($stateProvider) {
        $stateProvider.state({ name: 'test',
            url: '/test?fromDate&toDate' })
    }));

    it('should remember state params', inject(function($state,stateStore,$rootScope) {
        var test = $state.get('test');
        expect(test.name).toBe('test')
        expect(stateStore.get('test')).toEqual(null);
        $state.go('test',{fromDate:"2015-01-01"});
        $rootScope.$apply();
        expect(stateStore.get('test')).toEqual({fromDate:"2015-01-01"});
        //remember state params
        $state.go('test');
        $rootScope.$apply();
        expect(stateStore.get('test')).toEqual({fromDate:"2015-01-01"});
    }));
    it('should reinit state params', inject(function($state,stateStore,$rootScope) {
        expect(stateStore.get('test')).toEqual({fromDate:"2015-01-01"});
        //remove state in store
        stateStore.remove('test');
        $rootScope.$apply();
        expect(stateStore.get('test')).toEqual(null);
    }));
});

describe('Test stateHistoryService', function () {
    var scope;

    beforeEach(module('rf.state.history', function($stateProvider) {
        $stateProvider.state({ name: 'test',
            url: '/test?fromDate&toDate' })
    }));

    it('should watch scope change', inject(function($state,stateHistoryService,$rootScope) {
        scope = $rootScope.$new();
        var stateParams = {fromDate:"2015-01-01"};
        var stateStore = stateHistoryService.getStateStore();
        $state.go('test',stateParams);
        $rootScope.$apply();
        expect(stateStore.get('test')).toEqual({fromDate:"2015-01-01"});
        stateHistoryService.mappingScope(scope,stateParams);
        expect(scope.fromDate).toBeDefined();
        expect(scope.fromDate).toEqual("2015-01-01");
        scope.fromDate = "2016-01-01";
        $rootScope.$apply();
        expect(stateStore.get('test')).toEqual({fromDate:"2016-01-01"});
    }));

});
