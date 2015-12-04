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
    GridCompFactory.addButton = function(scope, grid, id, type){
      var el = GridFactory.createElement(scope, id, LayoutComponentFactory.addButton(type))
      grid.add_widget(el, 0, 0, 2, 1, true);
    }

	return GridCompFactory;
})
