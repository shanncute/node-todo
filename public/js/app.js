angular.module("nsfaudit", [
    "ui.router",
    "ui.bootstrap",
    "samcommon",
    "nsflog-app",
    "nsfhelpers",
    "kendo.directives",
    "ngCookies",
    "ui.sortable",
    "ngMap",
    "isoCurrency"
]).constant("appConfig", {
    appName: "NSF",
    appVersion: "1.0",
    productionEnvironment: false,
    corporateRoleLookup: 'CO',
    clientRoleLookup: 'CL',
    errorMsgTimeout: 5000,
    smartDeviceWidth: 769,
    mobileDeviceWidthStart: 320,
    mobileDeviceWidthEnd: 640,
    tabDeviceWidthStart: 640,
    tabDeviceWidthEnd: 1024,
    desktopDeviceWidthStart: 1025, // Above for desktopm
    ellipsis: {
        tabCaptionLimit: 17
    },
    grid: {
        disableRowFilters: false
    },


    appUrl : (location.hostname=='localhost')? location.protocol + "//" + location.host+"/":location.protocol + "//" + location.host+location.pathname,
    // //DEV API Server
    baseUrl: "http://216.117.129.199:8081/samservice/",
    //imageUrl: 'http://216.117.129.199:8081/samservice/',
    //reportImageUrl: "http://216.117.129.199:8081",

    //baseUrl: "http://localhost:8081/samservice/",
    //baseUrl: "http://192.168.1.142:9000/",

    //QA API Server
    //-------------------------------
    // baseUrl:"http://216.117.132.37:8081/samservice/",
    // imageUrl: 'http://216.117.132.37:8081/samservice/',
    // reportImageUrl: "http://216.117.132.37:8081",

    login: "auth/login",
    getAuthToken: "common/authToken",
    getAccessToken: "auth/getaccesstoken",
    getNewAccessToken: "auth/getnewaccesstoken",
    GetSupplierCorporateInfo: 'standard/getcorporateinfo',
    getCountry: 'common/countries',
    getState: 'common/states',
    getAuditsType: 'common/audittypes',
    getAllocators: 'common/allocator',
    visitsSearch: "visit/list",
    visitlistCount: "visitlist/count",
    getSelectedVisitList : "visit/getselectedlist",
    getAuditors: "visit/auditors",
    assignVisit: "visit/assign",
    unassignVisit: "visit/unassign",
    assignPreviousAuditor: "prevauditor/single ",
    getVisitDetails: "visit/getInfo",
    getEmployeeTypes: "visit/employeetypes",
    getAssignAsTypes: "common/assignList",
    getAuditTypesDays: "visit/audittypes",
    getIndustryCodes: "common/industrycode",
    getLanguages: "visit/languages",
    visitDetailsSearch: "visit/search",
    assignMultipleAuditorVisit: 'visit/save',
    getMonthlyCalendar: "auditor/monthlycalendar",
    assignUnscheduleVisits: 'visit/unscheduled',
    auditorCalendar: "auditor/calendar",
    unassignTeam:"visit/unassignTeam",

    //CR's 16-Jan-17
    getMonthlySchedules : "visit/getmonthlyschedule",
    getDailySchedules : "visit/getdailyschedule",
    getQualifiedAuditorsMap : "visit/map",    
    unassignAuditor:"auditor/unassign",
    //dummy
    dummyJson: "app/components/visitdetails/data/db.json",

}).config([
    "$stateProvider", "$urlRouterProvider", "$httpProvider", "$locationProvider", "$loggerProvider", "appConfig", "$controllerProvider",
    function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $loggerProvider, appConfig, $controllerProvider) {
        "use strict";

        $urlRouterProvider.otherwise("/layout/visits");
        angular.module("nsfaudit").registerCtrl = $controllerProvider.register;

        $httpProvider.interceptors.push("TokenInterceptor");
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
        // $httpProvider.defaults.cache = !0;
        // $httpProvider.defaults.withCredentials = true;

        function loadScript(path) {
            var result = $.Deferred(),
                script = document.createElement("script");
            script.async = "async";
            script.type = "text/javascript";
            script.src = path;
            script.onload = script.onreadystatechange = function(_, isAbort) {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    if (isAbort)
                        result.reject();
                    else
                        result.resolve();
                }
            };
            script.onerror = function() { result.reject(); };
            document.querySelector("head").appendChild(script);
            return result.promise();
        }

        function loader(arrayName) {
            return {
                load: function($q) {
                    var deferred = $q.defer(),
                        map = arrayName.map(function(name) {
                            return loadScript(name);
                        });

                    $q.all(map).then(function(r) {
                        deferred.resolve();
                    });

                    return deferred.promise;
                }
            };
        }

        /*
         * State provider for this application.
         */
        $stateProvider
            .state("layout", {
                url: "/layout",
                templateUrl: "templates/page1/first.html",
                controller: "LayoutController"
            })
            
    }
]).run(config).filter('slice', function() {
    return function(arr, start, end) {
        return (arr || []).slice(start, end);
    };
}).filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<=total; i++) {
      input.push(i);
    }

    return input;
  };
});

function config($rootScope, $state, appConfig, $window, configFactory, NgMap) {
    "use strict";

   
    //scroll page to top if route change
    $rootScope.$on('$viewContentLoaded', function() {
        angular.element('html, body').animate({ scrollTop: 0 }, 200);
    });

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        
    });

    $rootScope.appConfig = appConfig;

}
