app.factory("LayoutComponentFactory",  function($compile){

  return {
    addNavBar: function(){
      return '<nav class="navbar navbar-default">\
        <div class="container-fluid">\
          <div class="navbar-header">\
            <a class="navbar-brand" href="#">\
              <p>Navbar</p>\
              <p contenteditable="true"\
               onclick="$(this).focus();"> Edit me! </p>"\
               </div>\
            </a>\
          </div>\
        </div>\
      </nav>';
    }
  }

})
