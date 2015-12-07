app.factory("LayoutComponentFactory",  function($compile){

  return {
    addNavBar: function(){
      return '<nav class="navbar navbar-default">\
        <div class="container-fluid">\
          <div class="navbar-header">\
            <a class="navbar-brand" href="#">\
              <p>Navbar</p>\
            </a>\
          </div>\
        </div>\
      </nav>';
    },

    addButton: function(type) {
      return '<button ng-click="click()" class="btn btn-'+ type +'"> Click Me </button>';
    },

    addImage: function(url) {
      return '<img src="' + url + '"></img>'
    },

    addVideo: function (url) {
      // may not actually need this function: just have user enter embed code
      return '<iframe width="420" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
    }

  }

})
