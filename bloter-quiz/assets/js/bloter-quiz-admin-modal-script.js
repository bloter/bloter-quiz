jQuery(document).ready(function(){
	$ = jQuery;
	
	
	/* 글씨 쪼개기 */
	DIACRITICS = {
		"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A",
		"\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A",
		"\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A",
		"\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A",
		"\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A",
		"\u0104":"A","\u023A":"A","\u2C6F":"A",
		"\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY",
		"\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038A":"\u0399","\u03AA":"\u0399","\u038C":"\u039F","\u038E":"\u03A5","\u03AB":"\u03A5","\u038F":"\u03A9","\u03AC":"\u03B1","\u03AD":"\u03B5","\u03AE":"\u03B7","\u03AF":"\u03B9","\u03CA":"\u03B9","\u0390":"\u03B9","\u03CC":"\u03BF","\u03CD":"\u03C5","\u03CB":"\u03C5","\u03B0":"\u03C5","\u03C9":"\u03C9","\u03C2":"\u03C3"
	};
	
	function stripDiacritics(str) {
	    // Used 'uni range + named function' from http://jsperf.com/diacritics/18
	    function match(a) {
	        return DIACRITICS[a] || a;
	    }
	
	    return str.replace(/[^\u0000-\u007E]/g, match);
	};
	
	function markMatch2(text, term, markup, escapeMarkup) {
	    var match = stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())),
	        tl=term.length;
	
	    if (match<0) {
	        markup.push(escapeMarkup(text));
	        return;
	    }
	
	    markup.push(escapeMarkup(text.substring(0, match)));
	    markup.push('<span class="select2-match">');
	    markup.push(escapeMarkup(text.substring(match, match + tl)));
	    markup.push('</span>');
	    markup.push(escapeMarkup(text.substring(match + tl, text.length)));
	};
	
	var formatSelection = function(item) {
		var text = item.name+'(#'+item._id+' - '+item.email+')';
		return text;
	};
	
	var formatResult = function(item, container, query, escapeMarkup) {
		var text = item.name+'(#'+item._id+' - '+item.email+')';

	    var markup=[];
	    markMatch2(text, query.term, markup, escapeMarkup);
	    text = markup.join('');
	
	    if (!item.id) { return text; }
	    var state = $('<span>' + item.id + '</span></br><span>' + text + '</span>');
	    
	    return state;
	};
  	
  	var initSelection = function(element, callback) {		
		var id = $(element).val();
		
		if(id !== "") {
			$.ajax({
				url: 'admin-ajax.php',
				data: { action:'blms_json_search_students', id: id },
				dataType: "json"
			}).done(function(data) {
				callback(data.results);
			});
		}
	};
	
	
	
	
	
	
	//아이템 필드를 추가할때 쓴다. 굳이 동적으로 만들 필요는 없다.
	$(document).on('click', '#create-bloter-quiz-item', function(e){
		e.preventDefault();
		
		var $list_count = $('.bloter-quiz-item');
		$add_count = 1;
		if( $list_count.length > 0 ){
			$add_count = $list_count.length + 1; 
		}
		
		var modal_inner_content = $('.bloter-global-modal-inner-content');
		var spinner_wrap = modal_inner_content;
		var spinner_backdrop = $('<div class="bloter-global-modal-backdrop bloter-modal-absolute"></div>');
		var spinner = $('<div class="bloter-spinner-wrap"><div class="bloter-spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
				
		spinner_backdrop.append(spinner);
		
		$.ajax({
			type:'post',
			url:'admin-ajax.php',
			data: { action :'bloter_quiz_admin_part_load', part: 'quiz_item', quiz_item_id: $add_count },
			beforeSend : function(){
				$(spinner_backdrop).hide().appendTo(spinner_wrap).fadeIn(250);
				//wrap.append(backdrop);
			},
			success:function(response){
				setTimeout(function(){
					spinner_backdrop.fadeOut(400, function() {
						$('.bloter-quiz-sortable').append(response);
						
						
						
						//새로 추가한 아이템에 대해서 sortable을 refresh 한다.
						//$('.bloter-quiz-sortable').sortable("refresh");
						
						//$('.bloter-quiz-date').datepicker();
						//$('.bloter-quiz-date').datepicker("option", "dateFormat", "yy-mm-dd");
						
						//역시 추가한 아이템에 대해 숨김기능또한 필요하다.
						$('.closed .bloter-quiz-item-inside').hide();
						
						$('.bloter-quiz-sortable').sortable({
							connectWith: ".bloter-quiz-sortable",
					      	handle: ".bloter-quiz-item-handle",
							placeholder: "ui-state-highlight",
							axis:"y",
						});
						
						/*
						$('.bloter-quiz-choice').select2({
							placeholder: "수강생",
					  		allowClear: true,
					  		quietMillis: 100,
					  		id: function(bond){ return bond._id; },
					  		ajax: {
					  			url: 'admin-ajax.php',
					  			dataType: 'json',
					  			delay: 250,
					  			data: function(term, page){
					  				return {
					  					term: term,
					  					page: page || 1,
					  					action:'bloter_json_search_post',
					  				};
					  			},
						  		results: function (bond, page) {
						      		// parse the results into the format expected by Select2.
						      		// since we are using custom formatting functions we do not need to
						      		// alter the remote JSON data
						      		return {
						        		results: bond.results,
						        		//more:
						      		};
						    	},
						    	cache: true
							},
							minimumInputLength: 1,
							formatResult: formatResult, 
							formatSelection: formatSelection,
							initSelection: initSelection,
						});
						*/
						
						$(this).remove(); 
					});
				}, 1000);
				
			},
		});
        
		
	});
	
	$('.bloter-quiz-date').datepicker();
	$('.bloter-quiz-date').datepicker("option", "dateFormat", "yy-mm-dd");
	
	//각 버튼에 대한 동적 이벤트
	//1. 숨김/보이기에 대한 동적 이벤트
	$(document).on('click', '.bloter-quiz-item-box .bloter-quiz-item-handlediv', function(e){
		e.preventDefault();
		
		var $parent;
		var showOrHide;
		
		$parent = $(this).parent();
		$inside_obj = $(this).siblings('.bloter-quiz-item-inside');
		
		if( $parent.hasClass("closed") ){
			$parent.removeClass("closed");
			showOrHide = false;
		}else{
			$parent.addClass("closed");
			showOrHide = true;
		}

		if ( showOrHide === true ) {
			$inside_obj.hide();
			showOrHide = false;
		} else if ( showOrHide === false ) {
  			$inside_obj.show();
  			showOrHide = true;
		}		
	});
	
	//2. 삭제 버튼에 대한 동적 이벤트
	$(document).on('click', '.bloter-quiz-item-box .bloter-quiz-item-remove', function(e){
		e.preventDefault();
		$parent_obj = $(this).parents('li.bloter-quiz-item');
		$parent_obj.remove();
	});
	
	//제목을 입력할 때 이것을 위 타이틀에 표시해주는 동적 이벤트
	$(document).on('keyup', '.bloter-quiz-item-inside .bloter-quiz-title', function(e){
		e.preventDefault();
		$parent_obj = $(this).parents('.bloter-quiz-item');
		$target_obj = $parent_obj.find('.bloter-quiz-display');
		
		$msg = $(this).val(); 
		if( $(this).val().trim() == '' ){
			$msg = "새 타임라인 아이템";
		}
		
		$target_obj.text($msg);
	});
	
	
	 
	$pre_item_list = ''; //현재 작성한 타임라인을 입력해 두기 위해 사용
	//타임라인 적용 버튼시 검증후 이를 적용하도록 하는 이벤트
	var $bloter_item_count = 1;
	$('#bloter-quiz-generate').on('click', function(e){
		$item_list = $('.bloter-quiz-item');
		if( $item_list.length < 1 ){
			alert('타임라인을 만들려면 1개 이상의 아이템이 존재해야 합니다.');
			return;
		}
		
		$bloter_timeline_subject = $('#bloter-quiz-subject').val();
		
		var $output = '';
		
		$output += '[bloter_timeline title="'+$bloter_timeline_subject+'" id="'+$bloter_item_count+'"]';
		$output += '[bloter_timeline]';
		
		$validate = true;
		$.each($item_list, function($index, $item){
			$title = $(this).find('.bloter-quiz-title').val();
			$date = $(this).find('.bloter-quiz-date').val();
			$url = $(this).find('.bloter-quiz-url').val();
			$image = $(this).find('.bloter-quiz-image').val();
			$content = $(this).find('.bloter-quiz-content').val();

			if( !$title || $title.trim() == '' ){ $validate = false; }
			if( !$date || $date.trim() == '' ){ $validate = false; }
			if( !$content || $content.trim() == '' ){ $validate = false; }
			
			$output += '[bloter_timeline_item title="'+$title+'" date="'+$date+'"';
			if( $image && $image.trim() != '' ){
				 $output +=' image="'+$image+'"';
			}
			
			if( $url && $url.trim() != '' ){
				 $output +=' url="'+$url+'"';
			}
			
			$output += ']';
			$output += $content;
			$output += '[/bloter_timeline_item]';
		});
		
		$output += '[/bloter_timeline]';
		
		if( !$validate ){
			alert('작성되지 않은 항목이 있습니다.\n제목, 날짜, 내용은 반드시 작성해야 하는 항목입니다.');
			return;
		}else{
			$pre_item_list = $item_list;
			$('.bloter-quiz-item-revert').addClass('exist-revert-item');			
			tinymce.activeEditor.execCommand('mceInsertContent', false, $output);
			$bloter_item_count++;
			$('#bloter-quiz-modal').modal('hide');
		}
	});		
	
	//방금 전 작성한 타임라인 불러오기
	$('.bloter-quiz-item-revert-excute').on('click', function(e){
		e.preventDefault();
		$('.bloter-quiz-sortable').empty(); //현재 창의 아이템을 모두 지운다.
		$('.bloter-quiz-sortable').append($pre_item_list); //이전의 객체를 넣는다.
		$('.bloter-quiz-sortable').sortable("refresh");
	});
	
	//미디어 라이브러리 창 구성
	// Uploading files
	var file_frame;
	
	$(document).on('click', '.bloter-quiz-image-controller', function(event){
		event.preventDefault();
		var $controller_number;
		var $target_obj;
			
		$controller_number = $(this).data('controller');
		console.log($controller_number);
		
		$target_obj = $('.bloter-quiz-image-'+$controller_number);
		console.log($target_obj);
		$target_obj.val('');
		
		

		/*
		// If the media frame already exists, reopen it.
		if (file_frame) {
			
			file_frame.on('select', function() {
				// We set multiple to false so only get one image from the uploader
				attachment = file_frame.state().get('selection').first().toJSON();
				// Do something with attachment.id and/or attachment.url here
				//console.log(attachment);
				$target_obj.val(attachment.url);
			});
	
			file_frame.on('insert', function() {
				console.log($controller_number);
				// We set multiple to false so only get one image from the uploader
				attachment = file_frame.state().get('selection').first().toJSON();
				// Do something with attachment.id and/or attachment.url here
				$('.bloter-quiz-image-'+$controller_number).val(attachment.url);
			});
			
			file_frame.open();
			return;
		}else{
			// Create the media frame.
			
		}
		*/
		
		file_frame = wp.media.frames.file_frame = wp.media({
			frame: 'post',
			title : '타임라인 삽입 미디어 라이브러리',
			button : {
				text : jQuery(this).data('uploader_button_text'),
			},
			library : { type : 'image'},
			multiple : false, // Set to true to allow multiple files to be selected
			state: 'insert'
		});

		// When an image is selected, run a callback.
		file_frame.on('select', function() {
			// We set multiple to false so only get one image from the uploader
			attachment = file_frame.state().get('selection').first().toJSON();
			// Do something with attachment.id and/or attachment.url here
			$target_obj.val(attachment.url);
		});
		
		file_frame.on('insert', function() {
			// We set multiple to false so only get one image from the uploader
			attachment = file_frame.state().get('selection').first().toJSON();
			// Do something with attachment.id and/or attachment.url here
			$target_obj.val(attachment.url);
		});

		// Finally, open the modal
		file_frame.open();
		
		file_frame.on('close', function(){
			$('body').addClass('modal-open');
		});
		
	});
	
	$('#bloter-quiz-modal').on('shown.bs.modal', function() {
    	$(document).off('focusin.modal');
	}); 
	
	
	
	
	$(document).on('click', '.bloter-quiz-choice-add', function(e){
		var $parent_wrapper = $(this).parents('.bloter-quiz-item-box');
		
		var qid = $(this).data('qid');
		
		var quiz_chioce_list_container = $('#bloter-quiz-choice-container-' + qid);
		var quiz_chioce_list_count = $(quiz_chioce_list_container).find('li').size();
		
		//console.log(quiz_chioce_list_count);
		
		var next_num = quiz_chioce_list_count + 1;
		
		var quiz_choice_wrapper = $('<li></li>');
		var quiz_choice_number_wrapper = $('<span class="bloter-quiz-choice-number"></span>');
		
		quiz_choice_number_wrapper.append(next_num);
		
		quiz_choice_wrapper.append(quiz_choice_number_wrapper);
		quiz_choice_wrapper.append('<input type="text" class="bloter-quiz-choice" name="bloter_quiz_choice" />');
		
		var survey_radio_button = $parent_wrapper.find('.bloter-quiz-type-radio-survey');
		
		if( survey_radio_button.is(':checked') ){
			quiz_choice_wrapper.append('<input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" disabled="true" /> 정답으로 설정 <span class="glyphicon glyphicon-minus bloter-quiz-choice-remove" title="선택지 삭제"></span>');	
		} else {
			quiz_choice_wrapper.append('<input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" /> 정답으로 설정 <span class="glyphicon glyphicon-minus bloter-quiz-choice-remove" title="선택지 삭제"></span>');
		}
		
		quiz_chioce_list_container.append(quiz_choice_wrapper);
		quiz_choice_refresh( qid );
		
	});
	
	$(document).on('click', '.bloter-quiz-choice-remove', function(e){
		var qid = $(this).data('qid');
		
		var parent_wrapper = $(this).parent('li');
		var parent_container = $(parent_wrapper).parent('ul');
		parent_wrapper.remove();
		quiz_choice_refresh(qid);
	});
	
	function quiz_choice_refresh( qid ){
		var quiz_choice_container = $('#bloter-quiz-choice-container-'+qid);
		
		var quiz_chioce_list = $(quiz_choice_container).find('li');
		
		$.each( quiz_chioce_list, function(qc_index, q_chioce){
			var quiz_choice_number_wrapper = $(quiz_chioce_list[qc_index]).find('.bloter-quiz-choice-number');
			quiz_choice_number_wrapper.text(qc_index+1);
			//quiz_chioce_list[qc_index]
		});
		
	}
	
	$(document).on('change', '.bloter-quiz-type-radio-quiz', function(){
		var $parent_wrapper = $(this).parents('.bloter-quiz-item-box');
		var message_label = $parent_wrapper.find('.bloter-quiz-item-part > label');
		
		$parent_wrapper.find('.bloter-quiz-correct').removeAttr('disabled');
				
		$(message_label[0]).text('퀴즈');
		$(message_label[3]).text('정답 해설');
	});
	
	$(document).on('change', '.bloter-quiz-type-radio-survey', function(){
		var $parent_wrapper = $(this).parents('.bloter-quiz-item-box');
		var message_label = $parent_wrapper.find('.bloter-quiz-item-part > label');
		
		$(message_label[0]).text('설문');
		$(message_label[3]).text('설문 메시지');
		
		$parent_wrapper.find('.bloter-quiz-correct').attr('disabled', 'true');
	});
});