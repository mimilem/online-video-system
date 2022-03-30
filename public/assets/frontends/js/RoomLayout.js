var attendanceApp = angular.module("userJoinListApp",[]);
attendanceApp.controller("userJoinListController",function($scope) {
    $scope.updateAttendanceLayout = function(data){

        $scope.attendanceTemplate = {url: '../assets/room_template/template_attendance.html'};
        $scope.attendee = data.user_list;
        $scope.isModerator = data.is_mod;

    }
    $scope.class='fa-sort-alpha-down'
    $scope.reverse = true;
    $scope.orderByMe = function(x) {
        if ($scope.class === "fa-sort-alpha-down")
            $scope.class = "fa-sort-alpha-up";
        else
            $scope.class = "fa-sort-alpha-down";
        $scope.reverse = !$scope.reverse ;
    }
    $scope.hide  = true;
    $scope.show = function(x) {
        $scope.hide = !$scope.hide ;
    }
    $scope.updateAttendanceLayout([]);
});
