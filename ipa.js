if ($('.define')) {
	var message = "Click the highlighted words for a definition";
	$('body').append('<span id="definitions">'+message+'</div>');
	$('body').append('<div id="definition-box"></div>');
	$('#definition-box').append('<div id="close"></div><p class="word"></p><p class="definition"></p>')
}

var terms = $('#definition-list').find('dt'),
	definitions = $('#definition-list').find('dd');
$('.define').click(function() {
	var word = definition = '';
	for (var i=0; i<terms.length; i++) {
		if ($(terms[i]).html() === $(this).html()) {
			word = $(this).html();
			definition = $(definitions[i]).html();
		}
	}

	if (definition) {
		$('#definition-box .word').html(word);
		$('#definition-box .definition').html(definition);
		$('#definition-box').show().css({
			'top': $(this).offset().top,
			'left': $(this).offset().left
		});
	}
});

$('#definition-box #close').click(function() {
	$('#definition-box').hide();
});