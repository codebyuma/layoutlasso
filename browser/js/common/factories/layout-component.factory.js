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
      </nav>'
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

    addInputForm: function() {
      return '<form><div class="input-group">\
        <span class="input-group-addon" id="basic-addon1">Input:</span>\
        <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">\
      </div></form>'
    },
    addList: function() {
      return '<div class="list-group" width="100%">\
        <a href="#" class="list-group-item active">List Group</a>\
        <a href="#" class="list-group-item">Item One</a>\
        <a href="#" class="list-group-item">Item Two</a>\
        <a href="#" class="list-group-item">Item Three</a>\
      </div>'

    }

  }

})
