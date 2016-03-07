
// navigation bar stick on top

var navigationBar = 0;
var stickyAlias = 0;
var navigationBarTop = 0;

function myFunction() {
    if (document.body.scrollTop || document.documentElement.scrollTop > navigationBarTop)
    {
         navigationBar.style.position = 'fixed';
         navigationBar.style.top = '0px';
         stickyAlias.style.display = 'block';
    }
    else
    {
         navigationBar.style.position = 'static';
         navigationBar.style.top = '0px';
         stickyAlias.style.display = 'none';
    }
};

function setupNavigationBar()
{
      navigationBar = document.getElementById("navigationBar");
    stickyAlias = document.getElementById("stickyAlias");
    navigationBarTop = navigationBar.offsetTop;
    window.onscroll = function() {myFunction()};
}

// pop up image
function setupImagePopup()
{
  var galleryArray = document.getElementsByClassName("gallery");

  for (var i = 0; i < galleryArray.length; i++)
  {
    var gallery = galleryArray[i];

    var popUp = gallery.querySelector(".popup");
    console.log(popUp);
    var newClose = gallery.querySelector(".close");
    console.log(newClose);

    popUp.addEventListener('click',    function(g) { overlay(g); }.bind(this, gallery), false);
    newClose.addEventListener('click', function(g) { overlay(g); }.bind(this, gallery), false);
  }
}

function overlay(gallery)
{
  var overlay = gallery.querySelector(".overlay");
  overlay.style.visibility = (overlay.style.visibility == "visible") ? "hidden" : "visible";
}

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  setupNavigationBar();
  setupImagePopup();
});


// form validation
function addFormValidation(theForm) {

   if (theForm === null || theForm.tagName.toUpperCase() !== 'FORM') {
       throw new Error("first parameter to addFormValidation must be a FORM, but got " + theForm.tagName);
   }
    theForm.noValidate = true;

    theForm.addEventListener('submit', function(evt) {
        if(validateForm(theForm) === false){
           evt.preventDefault();
       }
    });

   function validateForm(theForm){
       var isError = false;
       var elements = theForm.elements;
        for (var i = 0; i < elements.length; i += 1) {
           var isValid = isFieldValid(elements[i]);
            if(isValid === false){
                   isError = true;
               }      
        }
        return ! isError;
   }

   function isFieldValid(field) {
       var errorMsg = "";

       if (! needsToBeValidated(field)) {
           return true;
       }

       if (field.id.length === 0 || field.name.length === 0) {
       console.error("error: ", field);
       throw new Error("found a field that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
       }
       var errorSpan = document.querySelector('#' + field.id + '-error');
       
       if (errorSpan === null) {
           console.error("error: ", field);
           throw new Error("could not find the '#" + field.id + "-error' element. It's needed for error messages if #" + field.id + " is ever invalid.");
       }
       
       field.classList.remove('invalid');
       errorSpan.classList.remove('danger');
       errorSpan.innerHTML = "";
       // number check------------------------------------------

      if(field.type === "number" && field.min > 0 && parseInt(field.value, 10) < parseInt(field.min,10)) {
               errorMsg = "must be " + field.min + " or greater.";
           }

           if(field.type === "number" && field.max > 0 && parseInt(field.value, 10) > parseInt(field.max,10)) {
               errorMsg = "must be " + field.max + " or less.";
           }


       //-------------password match--------------

       if(field.dataset.match){
         console.log(field.dataset.match);
         var matchingField = document.querySelector("#" + field.dataset.match);
         console.log(matchingField);
         if(matchingField === null){
          console.error("error:", field);
          throw new Error ("could not find the field");
         }
         if(field.value !== matchingField.value){
          errorMsg = "The two fields must match.";
         }
       }

       if (field.type === "email" && ! isEmail(field.value)){
           errorMsg = "please enter a valid email";
       }
      
       // Min and Max length check----------------------------------------------------------------------
       
       if(field.minLength > 0 && field.value.length < field.minLength){
           errorMsg = "Must be " + field.minLength + " or more characters long.";
       }

       if(field.maxLength > 0 && field.value.length > field.maxLength){
           errorMsg = "Must be " + field.maxLength + " characters or less.";
       }
      
       // Is this field is required---------------------------------------------------------------------

       if(field.type === "checkbox" && ! field.checked) { 
           errorMsg = "This must be checked.";}
         else if(field.required && field.value.trim() === "") {
                 errorMsg = "This field is required";
       }

       if(errorMsg !== ""){  
           errorSpan.innerHTML = errorMsg;    
           field.classList.add('invalid');
           errorSpan.classList.add('danger');

           return false; //we found the error and so it is invalid
       }

       return true;
   }
   function needsToBeValidated(field){
       return ['submit', 'reset', 'button', 'hidden', 'fieldset'].indexOf(field.type) === -1;
   }
}

   function isEmail(input){
       return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);    
   }



