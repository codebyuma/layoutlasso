app.controller("CreateLayoutCtrl", function($scope, $compile, theUser, GridCompFactory, GridFactory, ExportFactory) {


    $scope.user = theUser;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget;

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = GridFactory.clearGrid;

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


    /* ===== GRID STYLING SCOPE OBJECTS  =====*/
    // CSS Setting and Getting on elements

    // This object has elements to be styled assigned to it, with id's as keys.
    $scope.styleGroup = {};

    /* Object to allow two-way binding of css form. Is populated by the directive css-applicator. */
    $scope.newClass = {};

    /* Requried for two-way binding of currently applied classes, retrieved from the StylingFactory stylsheet object, re-populated based on other actions applystyling and class-display directives. */
    $scope.pageStyleSheet = [];

    // boolean to define whether a style is being updated;
    $scope.classEditMode = false;
    // Boolean to indicate whether the css styling menu is open or not. 
    $scope.styleMenuOpen = false;

})
