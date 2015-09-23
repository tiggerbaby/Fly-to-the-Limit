// $(window).scroll(function() {
// 				if ($(this).scrollTop() > 50) {
//                     $('nav').addClass('fix');
// 		        } else {
// 		            $('nav').removeClass('fix');
// 		        }
// 		});

// document.addEventListener('DOMContentLoaded', function()
// {
// 	var theForm = document.querySelector('#contact_form');
// 	console.log(theForm);

// 	theForm.noValidate = ture;

//     theForm.addEventListener('Submit',function(evt)
//     {
//     	var isError = false;
//     	var elements = this.elements;
//     	for(var i = 0; i < elements[i]; i+=1)
//     	{
//     		var field = elements[i];
//     		if(field.value.trim() === ""){
//     			isError = true; 
//     			field.classList.add('invalid')
//     		}
//     	}
//     	if (isError)
//     	{
//     		evt.preventDefault();
//     	}
//     });
// });

// contact form

function isFieldValid(field) 
{
    if (! needsToBeValidated(field))
    {
        return true;
    }

    if (field.required && field.value.trim() === "")
    {
        field.classList.add('invalid');

        var errorSpan = document.querySelector('#' + field.id + '-error');
        // errorSpan.classList.add('danger');
        errorSpan.innerHTML = "This field is required.";
        return false;
    }

    return true;
}

 // function isFieldValid(field) {
 //        var errorMessage = "";

 //        if (! needsToBeValidated(field)) {
 //            return true;
 //        }

 //        if (field.id.length === 0 || field.name.length === 0) {
 //            console.error("error: ", field);
 //            throw new Error("found a field that is missing an id and/or name attribute. name should be there. id is required for determining the field's error message element.");
 //        }

 //        field.classList.remove('invalid');

 //        var errorSpan = document.querySelector('#' + field.id + '-error');

 //        if (errorSpan === null) {
 //            console.error("error: ", field);
 //            throw new Error("could not find the '#" + field.id + "-error' element. It's needed for error messages if #" + field.id + " is ever invalid.");
 //        }

 //        // errorSpan.classList.remove('danger');
 //        errorSpan.innerHTML = "";

 //        if (field.type === "email" && !isEmail(field.value)) {
 //            errorMessage = "This should be a valid email address.";
 //        }

 //        if (field.required && field.value.trim() === "") {
 //            errorMessage = "This field is required.";
 //        }

 //        if (errorMessage !== "") {
 //            field.classList.add('invalid');

 //            errorSpan.classList.add('danger');
 //            errorSpan.innerHTML = errorMessage;
 //            return false;
 //        }

 //        return true;
 //    }