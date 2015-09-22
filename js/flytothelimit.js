// $(window).scroll(function() {
// 				if ($(this).scrollTop() > 50) {
//                     $('nav').addClass('fix');
// 		        } else {
// 		            $('nav').removeClass('fix');
// 		        }
// 		});

document.addEventListener('DOMContentLoaded', function()
{
	var theForm = document.querySelector('#contact_form');
	console.log(theForm);

	theForm.noValidate = ture;

    theForm.addEventListener('Submit',function(evt)
    {
    	var isError = false;
    	var elements = this.elements;
    	for(var i = 0; i < elements[i]; i+=1)
    	{
    		var field = elements[i];
    		if(field.value.trim() === ""){
    			isError = true; ????????????
    			field.classList
    		}
    	}
    	if (isError)
    	{
    		evt.preventDefault();
    	}
    });
});