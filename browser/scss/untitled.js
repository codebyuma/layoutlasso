            id + "><div class='grid-stack-item-content new-element container'>\
  <div class='row'>\
  <div class='col-xs-12'>\
  <div class='lasso-user-content'>" + content + "</div><div class='lasso-end-user-content'></div>\
  </div></div>\
  <div class='row'>\
  <div class='lasso-button-box' id='lasso-button-box-"+id+"''>\
  

  <button title='Remove widget' ng-click='removeWidget(" + id + ")'><span class='glyphicon glyphicon-remove'></span></button>\
  

  <button class='lasso-x' id='lasso-x-btn-" + id + "' ng-click='addNestedGrid(" +
            id + ")' class='btn btn-default lasso-nest-btn' title='Add nested grid' id='lasso-nest-btn-" +
            id + "'><span class='glyphicon glyphicon-th'></span></button>\
  


  <button title='Edit HTML' ng-click='editHTML(" +id + ")'><span class='glyphicon glyphicon-edit'></span></button>\
  



  <button class='lasso-addcomp-btn' ng-click='addComponents(" + id + ")'><span class='glyphicon glyphicon-modal-window'></span></button>\
            <button style-nested-grid-item data-element-selector=" + id + "></button>\
            </div></div></div>")(scope);