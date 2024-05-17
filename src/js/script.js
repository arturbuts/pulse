//sliders
const slider = tns({
	container: '.carousel__list',
	speed: 1200,
	items: 1,
	autoHeight: true,
	controls: false,
	nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});



//tabs
$(document).ready(function () {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
		$(this)
			.addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
			.closest('div.catalog__container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
	});


	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__front').eq(i).toggleClass('catalog-item__front--active');
				$('.catalog-item__back').eq(i).toggleClass('catalog-item__back--active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back-btn');

	//modals
	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn();
	});

	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut()
	});
	$('.button--mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
			$('.overlay, #order').fadeIn();
		})
	});

});

//validate

function valideForms(form) {
	$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			phone: "required",
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: {
				required: "Пожалуйста, введите свое имя",
				minlength: jQuery.validator.format("Поле должно содержать минимум {0} символа!")
			},
			phone: "Пожалуйста, введите свой номер",
			email: {
				required: "Пожалуйста, введите почту",
				email: "Неправильно введен e-mail"
			}
		}
	});
}

valideForms('#consultation-form');
valideForms('#order form');
valideForms('#consultation form');

//mask phone
$('input[name=phone]').mask("+7 (999) 999-99-99");

//ajax - mail
$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
	}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
	});
	return false;
});

//scroll
$(window).scroll(function() {
	if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
	} else {
			$('.pageup').fadeOut();
	}
});

// Разные блоки кода

$('a[href="#up"]').click(function(){
	const _href = $(this).attr("href");
	$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
	return false;
});

new WOW().init();