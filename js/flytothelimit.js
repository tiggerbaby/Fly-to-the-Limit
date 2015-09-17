$(window).scroll(function() {
				if ($(this).scrollTop() > 50) {
                    $('nav').addClass('fix');
		        } else {
		            $('nav').removeClass('fix');
		        }
		});