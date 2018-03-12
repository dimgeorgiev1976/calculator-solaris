$(document).ready(function(){

				// jQuery - Авто калькулятор

	var modelSpecs,
			modelPrice,
			modelSpecsHolder,
			modelPriceHolder;
			// modelPriceUSDHolder;


				modelSpecsHolder = $('#modelSpecs'),
				modelPriceHolder = $('#modelPrice'),
				modelPriceUSDHolder = $('#modelPriceUSD');

			
			modelSpecs = '';
			modelPrice = 0;

						// При старте страницы
	calculatePrice();
	compileSpecs();

	
	// ВЫБОР ЦВЕТА - на цену не влияет
	$('#colorsSelector .colorItem').on('click', function(){
		var imgPath = $(this).attr('data-img-path');
		$('#imgHolder img').attr('src', imgPath);
	});


		   //price calculator
    function calculatePrice(){
        var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
        var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();
        
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPricePackage = parseInt(modelPricePackage);

        modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;

        modelPriceHolder.text(addSpace(modelPrice) + ' рублей');
    };

// После переключения радио кнопок

	$('#autoForm input').on('change', function(){
	
		compileSpecs();
		calculateUSD();
		calculatePrice();
	});



		function compileSpecs(){
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
		modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text() + '.';
	
		modelSpecsHolder.text(modelSpecs);
	};

	function addSpace(nStr) {
					nStr += '';
					x = nStr.split('.');
					x1 = x[0];
					x2 = x.length > 1 ? '.' + x[1] : '';
					var rgx = /(\d+)(\d{3})/;
					while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ' ' + '$2');
					}
					return x1 + x2;
					}
									//Получаем курс валют
								var currencyUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
								var rurUsdRate = 0;

								$.ajax({
								url: currencyUrl,
								cache: false,
								success: function(data){

								data = JSON.parse(data);

								console.log(data.Valute.USD.Value);

								rurUsdRate = data.Valute.USD.Value;

								calculateUSD();

								}
								});


				function calculateUSD(){
			var modelPriceUSD = modelPrice / rurUsdRate;
			// alert(modelPriceUSD);
			modelPriceUSDHolder.text( '$ ' + addSpace( modelPriceUSD.toFixed(0) ) );
	}

});





