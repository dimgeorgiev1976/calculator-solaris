$(document).ready(function(){

	var carImage = $('#imgHolder img');
	var srcValue = $(carImage).attr('src');
	// alert(srcValue);

	// $(carImage).on('click', function() {
	// 	$(this).attr('src', 'img/blue.png');
	// });

	// $('#colorsSelector .colorBlue').on('click', function(){
	// 	$(carImage).attr('src', 'img/blue.png');
	// });

	// $('#colorsSelector .colorWhite').on('click', function(){
	// 	$(carImage).attr('src', 'img/white.png');
	// });

	$('#colorsSelector .colorItem').on('click', function(){
		var imgPath = $(this).attr('data-img-path');
		console.log(imgPath);
		//$(carImage).attr('src', imgPath);
		$(carImage).fadeOut(200, function(){
			$(this).attr('src', imgPath).fadeIn(200);
		});
	});


});