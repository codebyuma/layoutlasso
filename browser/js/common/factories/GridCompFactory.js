app.factory('GridCompFactory', function($http, LayoutComponentFactory){
    var GridCompFactory = {};

    GridCompFactory.addNavBar = function (main_grid, counter){
    	// Nav bar can only be added to the main grid...for now.
    	var grid = main_grid
      /* LayoutComponentFactory just holds code to generate basic HTML and bootstrap components. */
      //var el = createElement(counter, LayoutComponentFactory.addNavBar())
      // Navbar takes up whole width of grid.
      //var newWidget = grid.add_widget(el, 0, 0, 12, 1, true);
    }

	return GridCompFactory;
})