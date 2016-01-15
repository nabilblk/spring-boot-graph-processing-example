'use strict';

var topTwitterInfluenceurView = angular.module('twitter', ['ngMaterial'])

topTwitterInfluenceurView.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}
]);

topTwitterInfluenceurView.factory('InfluenceurTwitterService', ['$http',
        function ($http) {
            return {
                loadTop100TwitterProfile: function () {
                    var twitterProfile = 'screensName=1min30&screensName=alsacreations&screensName=Atos&screensName=LaNetscouade&screensName=sensiolabs&screensName=capgeminifrance&screensName=ultranoir&screensName=upian&screensName=OCTOTechnology&screensName=AKKA_Tech&screensName=jplusplus_&screensName=altima&screensName=XebiaFr&screensName=AltranFrance&screensName=SopraSteria&screensName=gfiinformatique&screensName=sogeti_fr&screensName=GroupeSmile&screensName=CGI_FR&screensName=ZenikaIT&screensName=SopraSteria_RH&screensName=Niji_Digital&screensName=Wecare_digital&screensName=Alten_france&screensName=GenerixGroupFR&screensName=Kaliop&screensName=GroupeSII&screensName=NewQuest_WAA&screensName=ippontech&screensName=wax_int&screensName=HobbynoteFrance&screensName=OctaveOctave&screensName=SopraSteria_fr&screensName=devoteam&screensName=SII_IDF&screensName=Open_ESN&screensName=octopepper&screensName=CleverAge&screensName=af83&screensName=groupemicropole&screensName=Valtech_FR&screensName=JoliCode&screensName=theodo&screensName=NinjaSquad&screensName=oxalide&screensName=Steaw&screensName=linagora&screensName=SCC_info&screensName=Claranet_FR'
                    return $http.get('/twitter-rank/users/search/findRankedUserByProfiles?limit=100&'+twitterProfile).then(function (response) {
                            return response.data._embedded.users;
                        }
                    );
                }
            };
        }
    ]
);

topTwitterInfluenceurView.controller('InfluenceurTwitterController',function ($scope, InfluenceurTwitterService) {
        $scope.profilesTwitter = [];
        var that = this;

        InfluenceurTwitterService.loadTop100TwitterProfile().then(function (data) {
            $scope.profilesTwitter = data;
            that.tiles = buildGridModel({
                icon : "avatar:svg-",
                title: "Top ",
                background: "",
                screenName:"",
                pagerank:0,
                profileImageUrl:"",
                name:"",
                description:"",
                followerCount:0,
                followsCount:0

            });
        });

        function buildGridModel(tileTmpl){
            var it, results = [ ];
            for (var j=0, len=$scope.profilesTwitter.length; j<len && j<50; ++j){
                it = angular.extend({},tileTmpl);
                it.icon  = it.icon + (j+1);
                it.title = it.title + (j+1);
                it.screenName = $scope.profilesTwitter[j].screenName;
                it.pagerank = $scope.profilesTwitter[j].pagerank;
                it.profileImageUrl = $scope.profilesTwitter[j].profileImageUrl;
                it.name = $scope.profilesTwitter[j].name;
                it.description = $scope.profilesTwitter[j].description;
                it.followerCount = $scope.profilesTwitter[j].followerCount;
                it.followsCount = $scope.profilesTwitter[j].followsCount;

                it.span  = { row : 1, col : 1 };
                switch(j+1) {
                    case 1:
                        it.background = "red";
                        //it.span.row = it.span.col = 2;
                        break;
                    case 2: it.background = "green";         break;
                    case 3: it.background = "darkBlue";      break;
                    case 4:
                        it.background = "blue";
                        //it.span.col = 2;
                        break;
                    case 5:
                        it.background = "yellow";
                        //it.span.row = it.span.col = 2;
                        break;
                    case 6: it.background = "pink";          break;
                    case 7: it.background = "darkBlue";      break;
                    case 8: it.background = "purple";        break;
                    case 9: it.background = "deepBlue";      break;
                    case 10: it.background = "lightPurple";  break;
                    case 11: it.background = "yellow";       break;
                    case 12: it.background = "pink";          break;
                    case 13: it.background = "darkBlue";      break;
                    case 14: it.background = "purple";        break;
                    case 15: it.background = "deepBlue";      break;
                    case 16: it.background = "lightPurple";  break;
                    case 17: it.background = "purple";        break;
                    case 18: it.background = "deepBlue";      break;
                    case 19: it.background = "lightPurple";  break;
                }
                results.push(it);
            }
            return results;
        }
    }
);






