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
    }
  }

})
