var attendanceApp = angular.module("userJoinListApp",[]);
attendanceApp.controller("userJoinListController",function($scope) {
    $scope.updateAttendanceLayout = function(data){
        $scope.attendanceTemplate = {url: template};
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


var template  = "<div class=\"rh-search-sort\">\n" +
    "    <div class=\"pcr__search\" >\n" +
    "        <input type=\"search\" ng-model=\"q\" id=\"\" class=\"pcr__searchfield\" placeholder=\"Search\">\n" +
    "    </div>\n" +
    "    <div ng-click=\"orderByMe()\" class=\"sort-participants\" title=\"Sort\">\n" +
    "        <i class=\"fa\" ng-class=\"class\"></i>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"pcr__participants_list\">\n" +
    "    <div ng-if=\"attendee.length > 0\">\n" +
    "        <div class=\"pcr__participant\"\n" +
    "             ng-repeat=\"attn in attendee |  orderBy:'username':reverse | filter:q as results track by $index\">\n" +
    "            <p title=\"{{attn.fullName}}\">\n" +
    "                <strong>{{attn.username}}</strong>\n" +
    "            </p>\n" +
    "                <div class=\"status\">\n" +
    "                    <a href=\"javascript:void(0);\" class=\"pm-this-user\" id=\"chat_{{attn.clientId}}\"\n" +
    "                       data-pmcid=\"{{attn.clientId}}\" title=\"Start chat with {{attn.fullName}}\">\n" +
    "                        <span class=\"chat-icon\" data-pmcid=\"{{attn.clientId}}\">\n" +
    "                            <i class=\"fa fa-comment\" data-pmcid=\"{{attn.clientId}}\"></i></span>\n" +
    "                        <span class=\"tag tag-danger pm-notification hide-this\" data-pmcid=\"{{attn.clientId}}\"\n" +
    "                              id=\"chat-tag-{{attn.clientId}}\">0</span>\n" +
    "                    </a>\n" +
    "                    <span  class=\"line-icon {{attn.lineIconClass}}\" >\n" +
    "                        <span class=\"chat-icon\" onclick=\"audioMuteUser(this)\" title=\"Unmuted\"  id=\"audioMute{{attn.clientId}}\"><i class=\"fa fa-microphone fa-fw\"></i> </span>\n" +
    "                    </span>\n" +
    "                    <span class=\"line-icon {{attn.lineIconClass}}\">\n" +
    "                        <span class=\"chat-icon \" onclick=\"videoMuteUser(this)\" title=\"Unmuted\"  id=\"videoMute{{attn.clientId}}\"><i class=\"fa fa-video fa-fw\"></i></span>\n" +
    "                    </span>\n" +
    "                    <span class=\"line-icon cursor-normal\">\n" +
    "                        <span class=\"chat-icon\" title=\"Share\"  id=\"shareIcon{{attn.clientId}}\"><i class=\"fa fa-desktop fa-fw\"></i></span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"attendee.length === 0\">\n" +
    "        <div class=\"no-particpants\">No participants to show.</div>\n" +
    "    </div>\n" +
    "</div>\n";
