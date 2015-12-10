app.directive("cssApplicator", function(StylingFactory, GridFactory, StyleModeFactory, $rootScope){
  return {
    restrict: "E",
    templateUrl: "/js/common/directives/applyCssStyling/applyCssStyling.template.html",
    link: function(scope, element, attrs){
      scope.newClass.styles = [{ key: "", value: ""}];

      /* Resets form and style group. Removes 'selection styling.'
      */
      var resetScopeStyleObjs = function(){
        StyleModeFactory.removeIdentityClass("lasso-styling-in-progress");
        scope.newClass.name = "";
        scope.newClass.styles = [{key: "", value: ""}];
        scope.styleGroup = {};
        scope.classEditMode = false;
        scope.styleMenuOpen = false;
        $(".lasso-editing-class").removeClass("lasso-editing-class");
        return;
      }

      // Create a new css compatible object from form data

      var createCssObjectFromForm = function(inputData){
        var outputObject = {};
        inputData.styles.forEach(function(cssObj){
          if((cssObj.key !== "") && (cssObj.value !== "")){
            outputObject[cssObj.key] = cssObj.value;
          }
        })
        return outputObject;
      }


      // Checks if className assigned. If not, assigns autogenerated name.
      var assignClassName = function(nameVariable){
        if(!nameVariable) return StylingFactory.autoGenName();
        return nameVariable;
      }

      /*  Executes two styling factory methods, the first, to populate the page stylesheet object (held in StylingFactory) and the second, to apply the styling (inline) to the group selected. */
      var applyStylingAndClass = function(nameOfClass, stylingObj, styleGroup){
        StylingFactory.populateStyleSheetObject({name: nameOfClass, cssObj: stylingObj})
        StylingFactory.applyStylingToGroup(styleGroup, stylingObj, nameOfClass, resetScopeStyleObjs);
        GridFactory.saveGridLocal();
        return;
      }

      // Adds a new empty field to this directive template for a new style.

      scope.addNewCssField = function(){
        scope.newClass.styles.push({ key: "", value: ""});
        return;
      }

      /* Removes a style field from this directive (will work on empty string keys too.) May also be extended to allow removal from an existing class*/

      scope.removeStyle = function(style){
          var toRemoveIdx = _.findIndex(scope.newClass.styles, style);
          scope.newClass.styles.splice(toRemoveIdx, 1);
          return;
      }

      /* Process form data for storage in StylingFactory and update element styles */
      scope.getCssFormData = function(data){
        var cssToApply = createCssObjectFromForm(data);
        var newClassName = assignClassName(scope.newClass.name);
        StyleModeFactory.removeIdentityClass("lasso-styling-in-progress");
        applyStylingAndClass(newClassName, cssToApply, scope.styleGroup);
        scope.pageStyleSheet = StylingFactory.getStyleSheetClassNames();
        return;
      },

      scope.cancelStyling = function(){
        resetScopeStyleObjs();

      }

      scope.updateClass = function(stylingObj){
        StylingFactory.resetInlineStyles(stylingObj.name, true);
        var updatedCssObj = createCssObjectFromForm(stylingObj);
        var updateToApply = StylingFactory.updateSpecificClass(updatedCssObj, stylingObj.name);
        scope.styleGroup = StylingFactory.findClassElements(stylingObj.name)
        StylingFactory.applyUpdatedStyling(scope.styleGroup, updateToApply)
        // Remove the stylign on the current edited class.
        $(".lasso-editing-class").removeClass("lasso-editing-class");
        scope.classEditMode = false;
        resetScopeStyleObjs();
      }
    }
  }
})
