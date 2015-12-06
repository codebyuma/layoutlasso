app.factory('GridCompFactory', function($http, LayoutComponentFactory, GridFactory){
    var GridCompFactory = {};

    GridCompFactory.addNavBar = function (scope, main_grid, counter){
    	// Nav bar can only be added to the main grid...for now.
    	var grid = GridFactory.main_grid;
      /* LayoutComponentFactory just holds code to generate basic HTML and bootstrap components. */
      var el = GridFactory.createElement(scope, counter, LayoutComponentFactory.addNavBar())
      // Navbar takes up whole width of grid.
      var newWidget = grid.add_widget(el, 0, 0, 12, 1, true);
    }

    // type is a string representing the bootstrap type of button "primary", "danger", "warning"
    GridCompFactory.addButtonToMain = function(scope, id, type){
      var grid = GridFactory.getMainGrid();
      var el = GridFactory.createElement(scope, id, LayoutComponentFactory.addButton(type))
      grid.add_widget(el, 0, 0, 2, 1, true);
    }

    // type is a string representing the bootstrap type of button "primary", "danger", "warning"
    GridCompFactory.addNestedButton = function(scope, id, type){
      // check if id is a grid, if so, just add button as widget to grid
      if (GridFactory.isGrid("grid" + id)) {
        var grid = GridFactory.getGridById("grid" + id);
        var el = GridFactory.createElement(scope, "grid" + id, LayoutComponentFactory.addButton(type))
        grid.add_widget(el, 0, 0, 2, 2, true);
      } else { // if widget is NOT already a grid, make it a grid and nest the button element inside
        var grid = GridFactory.addNestedGrid(scope, id);
        var el = GridFactory.createElement(scope, GridFactory.incrementCounter(), LayoutComponentFactory.addButton(type))
        grid.add_widget(el, 0, 0, 2, 2, true);
      }
    }

	return GridCompFactory;
})
