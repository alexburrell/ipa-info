if ($('.define')) {
	var message = "Click the highlighted words for a definition";
	$('body').append('<span id="definitions">'+message+'</div>');
	$('body').append('<div id="definition-box"></div>');
	$('#definition-box').append('<div id="close">X</div><p class="word"></p><p class="definition"></p>')
}

var terms = $('#definition-list').find('dt'),
	definitions = $('#definition-list').find('dd');
$('.define').click(function() {
	var word = definition = '';
	for (var i=0; i<terms.length; i++) {
		var term = $(terms[i]).html(),
			clicked = $(this).html();
		clicked = clicked.replace('-', '');
		if (term === clicked) {
			word = term;
			definition = $(definitions[i]).html();
		}
	}

	if (definition) {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$('#definition-box').hide();
			return;
		}

		$('#definition-box .word').html(word);
		$('#definition-box .definition').html(definition);
		
		var definitionPosition = $(this).offset().left + $('#definition-box').width(),
			containerPosition = $('#container').offset().left + $('#container').width(),
			left = 'auto',
			right = 'auto';
		if (definitionPosition > containerPosition) {
			right = $('#container').offset().left;
		} else {
			left = $(this).offset().left;
		}

		$('#definition-box').show().css({
			'top': $(this).offset().top + $(this).height() + 10,
			'left': left,
			'right': right
		});

		$('.selected').removeClass('selected');
		$(this).addClass('selected');
	}
});

$('#definition-box #close').click(function() {
	$('#definition-box').hide();
	$('.selected').removeClass('selected');
});