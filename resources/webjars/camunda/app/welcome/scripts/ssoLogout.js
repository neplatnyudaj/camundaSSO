define(['angular'], function (angular) {
    var ngModule = angular.module('ssoLogout', []);
    ngModule.controller('WelcomePage', ['$window', '$scope', function ($window, $scope) {
        var isLoggedIn = true;
        if ($scope.$root.authentication){
            $window.logoutLink = $scope.$root.authentication.authorizedApps.find(o => o.startsWith('ssoLogout')).split('=')[1];
        }
        $scope.$root.$on('authentication.changed', function (ev, auth) {
            if (!auth && isLoggedIn) {
                window.location.href = ($window.logoutLink);
            } else if ($scope.$root.authentication) {
                $window.logoutLink = $scope.$root.authentication.authorizedApps.find(o => o.startsWith('ssoLogout')).split('=')[1];
            }
        });
    }]);
    return ngModule;
});