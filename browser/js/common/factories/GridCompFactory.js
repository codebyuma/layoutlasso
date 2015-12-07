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

    GridCompFactory.addImage = function (scope, id, url){
      if (GridFactory.isGrid("grid" + id)) {
        var grid = GridFactory.getGridById("grid" + id);
        var el = GridFactory.createElement(scope, "grid" + id, LayoutComponentFactory.addImage(url))
      } else { // if widget is NOT already a grid, make it a grid and nest the button element inside
        var grid = GridFactory.addNestedGrid(scope, id);
        var el = GridFactory.createElement(scope, GridFactory.incrementCounter(), LayoutComponentFactory.addImage(url))
      }
      grid.add_widget(el, 0, 0, 4, 2, true);
    }

    GridCompFactory.addVideo = function (scope, id, url){
      if (GridFactory.isGrid("grid" + id)) {
        var grid = GridFactory.getGridById("grid" + id);
        // note: addVideo function in layout-component factory may not be necessary, as we ask the user to enter embed-ready code here
        var el = GridFactory.createElement(scope, "grid" + id, url)
      } else { // if widget is NOT already a grid, make it a grid and nest the button element inside
        var grid = GridFactory.addNestedGrid(scope, id);
        var el = GridFactory.createElement(scope, GridFactory.incrementCounter(), url)
      }
      grid.add_widget(el, 0, 0, 4, 2, true);
    }


    // type is a string representing the bootstrap type of button "primary", "danger", "warning"
    GridCompFactory.addButton = function(scope, id, type){
      // check if id is a grid, if so, just add button as widget to grid
      if (GridFactory.isGrid("grid" + id)) {
        var grid = GridFactory.getGridById("grid" + id);
        var el = GridFactory.createElement(scope, "grid" + id, LayoutComponentFactory.addButton(type))
      } else { // if widget is NOT already a grid, make it a grid and nest the button element inside
        var grid = GridFactory.addNestedGrid(scope, id);
        var el = GridFactory.createElement(scope, GridFactory.incrementCounter(), LayoutComponentFactory.addButton(type))
      }
      grid.add_widget(el, 0, 0, 6, 1, true);

    }

	return GridCompFactory;
})
