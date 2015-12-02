app.controller("CreateLayoutCtrl", function($scope, $compile, AuthService, GridCompFactory, GridFactory, ExportFactory) {

    AuthService.getLoggedInUser().then(function (user) {
        if(user) {
            $scope.user = user;
        }
    });

    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = function(idNum) {
       GridFactory.removeWidget(idNum);
    }

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = function() {
        GridFactory.clearGrid();
    }

    $scope.loadGrid = function(){
        GridFactory.loadGrid($scope);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Exporting ===== //
    // TODO disable button if grid is empty

    var beautify = require('js-beautify').html;

    $scope.exportHTML = function(){
      GridFactory.saveGrid($scope.user);
      var html = ExportFactory.convertToHTML();
      if (html) {
        html = beautify(html, { indent_size: 4 });
        $scope.convertedHTML = html;

        var htmlBlob = new Blob([html], {type : 'text/html'});
        var url = window.URL.createObjectURL(htmlBlob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "layoutlasso.html";
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };

    $scope.gridEmpty = function() {
      return $scope.nestedGrids['main-grid'].grid.nodes.length == 0;
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function (){
      GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
    }


    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = [];

})
