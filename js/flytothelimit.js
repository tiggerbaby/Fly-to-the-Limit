
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
    
    popUp.addEventListener('click',    function() { overlay(gallery) }, false);
    newClose.addEventListener('click', function() { overlay(gallery) }, false);
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



// contact form

// function isFieldValid(field) 
// {
//     if (! needsToBeValidated(field))
//     {
//         return true;
//     }

//     if (field.required && field.value.trim() === "")
//     {
//         field.classList.add('invalid');

//         var errorSpan = document.querySelector('#' + field.id + '-error');
//         // errorSpan.classList.add('danger');
//         errorSpan.innerHTML = "This field is required.";
//         return false;
//     }

//     return true;
// }


// testing


// function addFormValidation(formElement) {

//   if (formElement === null || formElement.tagName.toUpperCase() !== 'FORM') {
//     throw new Error("first parameter to addFormValidation must be a FORM, but got " + formElement.tagName);
//   }

//   formElement.noValidate = true;

//   formElement.addEventListener("submit", function (evt) {
//     if (!validateForm(evt.target)) {
//       evt.preventDefault();
//     }
//   });

//   for (var i = 0; i < formElement.elements.length; i += 1) {
//     var field = formElement.elements[i];
//     field.addEventListener('blur', blurEvent);
//   }

//   /* FUNCTIONS */

//   function blurEvent(evt) {
//     validateField(evt.target);
//   }

//   function validateForm(formElement) {
//     var error = false;

//     for (var i = 0; i < formElement.elements.length; i += 1) {
//       var isValid = validateField(formElement.elements[i]);
//       if ( ! isValid) { 
//         error = true;
//       }
//     }

//     return !error;
//   }


//   function validateField(el) {
//     var error = "";

//     if (['submit', 'reset', 'button', 'hidden', 'fieldset'].indexOf(el.type) > -1) {
//       return true; // buttons and fieldsets are automatically valid.
//     }

//     if (el.id.length === 0 || el.name.length === 0) {
//       console.error("error: ", el);
//       throw new Error("found a form element that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
//     }

//     // find this element's match error div.
//     var errorDiv = document.querySelector("#" + el.id + "-error");
//     if (errorDiv === null) {
//       console.error("error: ", el);
//       throw new Error("could not find the '#" + el.id + "-error' element. It's needed for error messages if #" + el.id + " is ever invalid.");
//     }

//     errorDiv.innerHTML = "";

//     el.classList.remove('invalid');
//     errorDiv.classList.remove('danger');

//     if (el.type === "email" && el.value.length >= 1 && !isEmail(el.value)) {
//       error = "please provide a valid email address.";
//     }

//     if (hasMinLength(el) && el.value.length < el.minLength) {
//       error = "must be " + el.minLength + " or more characters long.";
//     }

//     if (hasMaxLength(el) && el.value.length > el.maxLength) {
//       error = "must be " + el.maxLength + " or less characters long.";
//     }

//     if (hasMin(el) && parseInt(el.value, 10) < parseInt(el.min, 10)) {
//       error = "must be " + el.min + " or greater.";
//     }

//     if (hasMax(el) && parseInt(el.value, 10) > parseInt(el.max, 10)) {
//       error = "must be " + el.max + " or less.";
//     }

//     if (el.dataset.fvMatch) { // data-fv-match="..."
//       var matchingEl = document.querySelector('#' + el.dataset.fvMatch);
//       if (matchingEl === null) {
//         console.error("error: ", el);
//         throw new Error("Couldn't find the field '#" + el.dataset.fvMatch + "' to check #" + el.id + " against.");
//       }
//       if (el.value !== matchingEl.value) {
//         error = "The two fields must match.";
//       }
//     }

//     // is this field required?
//     if (el.type === "checkbox" && el.required && !el.checked) { 
//       error = "this must be checked.";
//     } else if (isRequired(el) && el.value.trim().length === 0) {
//       error = "this field is required.";
//     }

//     if (error !== "") {
//       errorDiv.innerHTML = error;
      
//       el.classList.add('invalid');
//       errorDiv.classList.add('danger');

//       return false; // it's invalid
//     }

//     return true;
//   }

//   function isEmail(input) {
//     return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
//   }

//   function hasMinLength(el) {
//     return (minMaxLengthApplies(el) && el.minLength > 0);
//   }

//   function hasMaxLength(el) {
//     return (minMaxLengthApplies(el) && el.maxLength > -1);
//   }

//   function hasMin(el) {
//     return (numericMinMaxApplies(el) && el.min > 0);
//   }

//   function hasMax(el) {
//     return (numericMinMaxApplies(el) && el.max > -1);
//   }

//   function isRequired(el) {
//     return (requiredApplies(el) && el.required);
//   }

//   function minMaxLengthApplies(el) {
//     return ['text', 'search', 'url', 'tel', 'email', 'password', 'textarea'].indexOf(el.type) > -1;
//   }

//   function numericMinMaxApplies(el) {
//     return ['number', 'range'].indexOf(el.type) > -1;
//   }

//   function requiredApplies(el) {
//     return ['text', 'search', 'url', 'tel', 'email', 'password', 'datetime', 'date', 'month', 'week', 'time', 'number', 'file', 'textarea', 'select-one'].indexOf(el.type) > -1;
//   }

// }


//  