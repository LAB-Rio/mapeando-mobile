angular.module('mapeando').controller('DemandsCtrl', function(
  $scope, $ionicLoading, demandFactory, $ionicLoading) {


  $scope.currentOffset = 0;
  $scope.currentLimit  = 15;

  $scope.initialize = function() {
    $scope.getDemands();
  }

  $scope.setDemandList = function(demandList) {
  
    if ($scope.demands == undefined) {
      $scope.demands = demandList;

    } else {
      $scope.demands = $scope.demands.concat(demandList);  
      $scope.$broadcast('scroll.infiniteScrollComplete');

    }
   
    $scope.hide();
  }

  /**
   * Get demands from Factory Method
   */

  $scope.getNewDemands = function() {
    $scope.currentOffset += $scope.currentLimit;
    $scope.getDemands();
  }

  $scope.getDemands = function() {
    $scope.show();
    demandFactory.index({ limit: $scope.currentLimit, offset: $scope.currentOffset, skip_fullname: '' }, function(response){
      $scope.setDemandList(response.demands);
    });

  }

  
  // Load indicator
  $scope.show = function() {
    $ionicLoading.show({
      templateUrl: 'templates/loading.html',
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };



  /** Call initialization method **/
  $scope.initialize();
});




