
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

document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
    navigationBar = document.getElementById("navigationBar");
    stickyAlias = document.getElementById("stickyAlias");
    navigationBarTop = navigationBar.offsetTop;
    window.onscroll = function() {myFunction()};

});

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

function addFormValidation(formElement) {

  if (formElement === null || formElement.tagName.toUpperCase() !== 'FORM') {
    throw new Error("first parameter to addFormValidation must be a FORM, but got " + formElement.tagName);
  }

  formElement.noValidate = true;

  formElement.addEventListener("submit", function (evt) {
    if (!validateForm(evt.target)) {
      evt.preventDefault();
    }
  });

  for (var i = 0; i < formElement.elements.length; i += 1) {
    var field = formElement.elements[i];
    field.addEventListener('blur', blurEvent);
  }

  /* FUNCTIONS */

  function blurEvent(evt) {
    validateField(evt.target);
  }

  function validateForm(formElement) {
    var error = false;

    for (var i = 0; i < formElement.elements.length; i += 1) {
      var isValid = validateField(formElement.elements[i]);
      if ( ! isValid) { 
        error = true;
      }
    }

    return !error;
  }


  function validateField(el) {
    var error = "";

    if (['submit', 'reset', 'button', 'hidden', 'fieldset'].indexOf(el.type) > -1) {
      return true; // buttons and fieldsets are automatically valid.
    }

    if (el.id.length === 0 || el.name.length === 0) {
      console.error("error: ", el);
      throw new Error("found a form element that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
    }

    // find this element's match error div.
    var errorDiv = document.querySelector("#" + el.id + "-error");
    if (errorDiv === null) {
      console.error("error: ", el);
      throw new Error("could not find the '#" + el.id + "-error' element. It's needed for error messages if #" + el.id + " is ever invalid.");
    }

    errorDiv.innerHTML = "";

    el.classList.remove('invalid');
    errorDiv.classList.remove('danger');

    if (el.type === "email" && el.value.length >= 1 && !isEmail(el.value)) {
      error = "please provide a valid email address.";
    }

    if (hasMinLength(el) && el.value.length < el.minLength) {
      error = "must be " + el.minLength + " or more characters long.";
    }

    if (hasMaxLength(el) && el.value.length > el.maxLength) {
      error = "must be " + el.maxLength + " or less characters long.";
    }

    if (hasMin(el) && parseInt(el.value, 10) < parseInt(el.min, 10)) {
      error = "must be " + el.min + " or greater.";
    }

    if (hasMax(el) && parseInt(el.value, 10) > parseInt(el.max, 10)) {
      error = "must be " + el.max + " or less.";
    }

    if (el.dataset.fvMatch) { // data-fv-match="..."
      var matchingEl = document.querySelector('#' + el.dataset.fvMatch);
      if (matchingEl === null) {
        console.error("error: ", el);
        throw new Error("Couldn't find the field '#" + el.dataset.fvMatch + "' to check #" + el.id + " against.");
      }
      if (el.value !== matchingEl.value) {
        error = "The two fields must match.";
      }
    }

    // is this field required?
    if (el.type === "checkbox" && el.required && !el.checked) { 
      error = "this must be checked.";
    } else if (isRequired(el) && el.value.trim().length === 0) {
      error = "this field is required.";
    }

    if (error !== "") {
      errorDiv.innerHTML = error;
      
      el.classList.add('invalid');
      errorDiv.classList.add('danger');

      return false; // it's invalid
    }

    return true;
  }

  function isEmail(input) {
    return input.match(/^([a-z0-9_.\-+]+)@([\da-z.\-]+)\.([a-z\.]{2,})$/);
  }

  function hasMinLength(el) {
    return (minMaxLengthApplies(el) && el.minLength > 0);
  }

  function hasMaxLength(el) {
    return (minMaxLengthApplies(el) && el.maxLength > -1);
  }

  function hasMin(el) {
    return (numericMinMaxApplies(el) && el.min > 0);
  }

  function hasMax(el) {
    return (numericMinMaxApplies(el) && el.max > -1);
  }

  function isRequired(el) {
    return (requiredApplies(el) && el.required);
  }

  function minMaxLengthApplies(el) {
    return ['text', 'search', 'url', 'tel', 'email', 'password', 'textarea'].indexOf(el.type) > -1;
  }

  function numericMinMaxApplies(el) {
    return ['number', 'range'].indexOf(el.type) > -1;
  }

  function requiredApplies(el) {
    return ['text', 'search', 'url', 'tel', 'email', 'password', 'datetime', 'date', 'month', 'week', 'time', 'number', 'file', 'textarea', 'select-one'].indexOf(el.type) > -1;
  }

}


 