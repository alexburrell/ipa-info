function createDefinitionBox() {
	var message = "Click the highlighted words for a definition",
		directions = $('<span></span>').attr('id', 'definitions').html(message),
		definition = $('<div></div>')
						.attr('id', 'definition-box')
						.append($('<div></div>')
							.attr('id', 'close')
							.html('X')
							.click(closeDefinitionBox))
						.append($('<p></p>').attr('class', 'word'))
						.append($('<p></p>').attr('class', 'definition'));

	function closeDefinitionBox() {
		definition.hide();
		$('.selected').removeClass('selected');
	}

	$('body').append(directions).append(definition);
}

var terms = $('#definition-list').find('dt'),
	definitions = $('#definition-list').find('dd');

function bindDefinitions() {
	$('.define').click(function() {
		var clickedWord = $(this).html().replace('-', '').toLowerCase(),
			definition;

		for (var i=0; i<terms.length; i++) {
			if (clickedWord === $(terms[i]).html()) {
				definition = $(definitions[i]).html();
				break;
			}
		}

		if (definition) {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				$('#definition-box').hide();
				return;
			}

			$('#definition-box .word').html(clickedWord);
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
}

function sortIpa(ipa) {
	function alphabeticalOrder(a, b) {
		if (/[^a-zA-Z]/.test(a.looksLikeEnglish) && !/[^a-zA-Z]/.test(b.looksLikeEnglish)) {
			return 1;
		} else if (/[^a-zA-Z]/.test(b.looksLikeEnglish) && !/[^a-zA-Z]/.test(a.looksLikeEnglish)) {
			return -1;
		} else if (a.looksLikeEnglish.toLowerCase() < b.looksLikeEnglish.toLowerCase()) {
			return -1;
		} else if (a.looksLikeEnglish.toLowerCase() > b.looksLikeEnglish.toLowerCase()) {
			return 1;
		} else {
			if (a.looksLikeEnglish < b.looksLikeEnglish) {
				return -1;
			} else if (a.looksLikeEnglish > b.looksLikeEnglish) {
				return 1;
			} else {
				if (a.value === a.looksLikeEnglish) {
					return -1;
				} else if (b.value === b.looksLikeEnglish) {
					return 1;
				} else {
					return 0;
				}
			}
		}
	}

	ipa.characters = ipa.consonants.concat(ipa.vowels);
	ipa.characters = ipa.characters.sort(alphabeticalOrder);
	ipa.characters = ipa.characters.concat(ipa.diacritics);
	return ipa;
}

function setSelected(event) {
	$('.selected').removeClass('selected');
	$(event.target).addClass('selected');
	var item = ipa.characters.filter(function(el) {
		return el.ipaNumber === parseInt(event.target.id.substring(1));
	});
	ipa.selected = item[0];
	$('#selected').html(Mustache.render($('#selected-template').html(), ipa.selected));
	bindDefinitions();
}
