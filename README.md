#AngularJS ui-router State History [![Build Status](https://travis-ci.org/RedFroggy/angular-ui-router-state-history.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-ui-router-state-history)

It is an AngularJS module to implement router state history.


#Features
* Store params of state.
* Configure the storage (local, session, cookie).

#Installation
You can download this by:
* Using bower and running `bower install angular-ui-router-state-history --save` (recommended)
* Downloading manually the [unminified version](https://raw.github.com/RedFroggy/angular-ui-router-state-history/master/src/angular-ui-router-state-history.js) 

After installation, import the module in your app.
````javascript
var app = angular.module('myApp', ['angular-ui-router-state-history']);
````

#Dependecies
This module has dependencies: ui.router, angular-storage
#Configuration
As a general consideration you need to inject the state store provider in your app configuration.
````javascript
app.config(['stateStoreProvider', function(stateStoreProvider) {
    // Your code...
    stateStoreProvider.setStorage('sessionStorage');
}]);
````


#License
The MIT License (MIT)

Copyright (c) 2016  Red Froggy

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
