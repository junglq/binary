$(document).ready(function () {
	// IBG
	function ibg() {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
	ibg();

	// BaguetteBOX
	baguetteBox.run('.gallery');

	// FILTER 
	$('.filter__item').click(function (event) {
		let i = $(this).data('filter');
		if (i == 1) {
			$('.portfolio__column').show();
		} else {
			$('.portfolio__column').hide();
			$('.portfolio__column.f_' + i).show();
		}
		$('.filter__item').removeClass('active');
		$(this).addClass('active');
	})

	// Smooth scroll
	$('.goto').click(function () {
		let el = $(this).attr('href').replace('#', '');
		console.log(el);
		let offset = 0;
		$('body,html').animate({
			scrollTop: $('.' + el).offset().top + offset
		}, 500, function () { });

		if ($('.header-menu').hasClass('active')) {
			$('.header-menu,.header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});

	// Parallax
	$(window).scroll(function (event) {
		let s = 0 - $(this).scrollTop() / 3;
		$('.mainblock__image').css('transform', 'translate3d(0, ' + s + 'px, 0)');
	});

	// FORM

	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('sending');
			} else {
				alert('Ошибка');
				form.classList.remove('sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('.req');
		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);

			if (input.classList.contains('email')) {
				if (email_test(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('error');
		input.classList.add('error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('error');
		input.classList.remove('error');
	}
	function email_test(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

})

