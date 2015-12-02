app.factory("LayoutComponentFactory",  function($compile){

  return {
    addNavBar: function(){
      return '<nav class="navbar navbar-default">\
        <div class="container-fluid">\
          <div class="navbar-header">\
            <a class="navbar-brand" href="#">\
              <p>Navbar</p>\
              <div contentEditable="true">\
              This text can be edited by the user.</div>\
            </a>\
          </div>\
        </div>\
      </nav>';
    }
  }

})
