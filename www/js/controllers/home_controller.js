angular.module('mapeando').controller('HomeCtrl', function($scope, demandFactory, leafletData, $ionicLoading) {

  $scope.layerGroup = null;

  $scope.map = {
      defaults: {
        tileLayer: 'http://{s}.tiles.mapbox.com/v4/luizfonseca.7532f8a3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVpemZvbnNlY2EiLCJhIjoiMTFNcXRXdyJ9.5PRw57nx5srpwP838-KjVQ',
        zoomControl: false,
      },
      center: {
          zoom: 12,
          autoDiscover: true
      }
  };


  /**
   * Startup the controller
   */ 
  $scope.initialize = function() {
    $scope.setUpMarkerCluster();
    $scope.getDemands();
  }


  /**
   * Load demand pins on the Map
   */
  $scope.loadDemandsOnMap = function(demands, color) {
    var demandSize = demands.length;
    
    for (i = 0; i < demandSize; i++) {


      if (demands[i].pins && demands[i].pins.length > 0) {
        var pin     = demands[i].pins;
        var iconUrl = demands[i].category.icon_url;
        var pinSize = demands[i].pins.length;
        

        // Insert all markers on the map
        for (index = 0; index < pinSize; index++) {
          
          var icon    = L.icon({ iconUrl: iconUrl, iconSize: [22, 22]});
          var marker  = L.marker([pin[index].lat, pin[index].long], { icon: icon, riseOnHover: true }); 

          // Add marker to the Layer Group from Cluster
          $scope.layerGroup.addLayer(marker);

          //$scope.subscribeMarkerEvents(marker, demands[i]);


        }
 
      } // End if

    } // End for


    leafletData.getMap().then(function(map) { 
      $scope.layerGroup.addTo(map);
      $scope.hide();
    });


    // Add the markers to the map

  }


  /**
   * Setup marker cluster 
   * Initialize LayerGroup var
   */ 
  $scope.setUpMarkerCluster = function() {

    $scope.layerGroup = new L.MarkerClusterGroup({ 
      disableClusteringAtZoom: 14,
      iconCreateFunction: function(cluster) {
        
        var c = ' marker-cluster-';
        var count = cluster.getChildCount();
        var size = 40;
        var color = '#ed2654'

        switch(true) {
          case(count <= 25):
            c += 'small';
            size = 40;
            break;
          case(count > 25 || count <= 100):
            c += 'medium';
            size = 50;
            break;
          case(count > 100):
            c += 'large';
            size = 60;
            break;
        }

		    var div = new L.DivIcon({ 
          html: '<div style="background: '+color+'"><span>' + count + '</span></div>', 
          className: 'marker-cluster' + c, 
          iconSize: new L.Point(size, size) 
        });

        return div;
      }
    });

   

  }





  /**
   * Get demands from Factory Method
   */
  $scope.getDemands = function() {
    $scope.show();
    demandFactory.index({}, function(response){
      $scope.loadDemandsOnMap(response.demands);
    });
  }

  // Load indicator
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Atualizando as demandas...'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };


  /** Call initialization method **/
  $scope.initialize();
});



