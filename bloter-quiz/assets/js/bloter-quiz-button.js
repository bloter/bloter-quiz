//------------------- helper function
function getAttr(s, n) {
	n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);
	return n ? n[1] : '';
};


function init_bloter_quiz( $content ){
	
	//숏코드 문장 분석에 사용할 정규식들
	var quiz_container_pattern = /\[bloter_quiz_container([^\]]*)\](.*?)\[\/bloter_quiz_container\]/gmi;
    var quiz_item_pattern = /\[bloter_quiz_item([^\]]*)\](.*?)\[\/bloter_quiz_item\]/g;
    var quiz_message_pattern = /\[bloter_quiz_message([^\]]*)\](.*?)\[\/bloter_quiz_message\]/;
				
    var quiz_choice_list_pattern = /\[bloter_quiz_choice_list\](.*)\[\/bloter_quiz_choice_list\]/;
    var quiz_choice_pattern = /\[bloter_quiz_choice([^\]]*)\]/g;
				
    var quiz_answer_pattern = /\[bloter_quiz_answer\](.*)\[\/bloter_quiz_answer\]/;
				
    var quiz_related_list_pattern = /\[bloter_quiz_related_list\](.*)\[\/bloter_quiz_related_list\]/;
    var quiz_related_pattern = /\[bloter_quiz_related([^\]]*)\]/g;
    
    var quiz_related_posts_pattern = /\[bloter_quiz_related_posts([^\]]*)\]/g;
    
    //
    var matches;
	var quiz_container_array = new Array();
	
	
	//최초로 퀴즈숏코드가 있는지 전체 퀴즈 컨테이너 정규식을 통해 검사한다.
	//한 포스트 안에 여러개의 퀴즈 컨테이너가 존재할 수 있기 때문이다.
	while( (matches = quiz_container_pattern.exec($content)) != null){
		
		//퀴즈컨테이너 각각의 숏코드 내용을 분석한다.
        var quiz_items = new Array();
        
        var quiz_items_str = matches[2];
        
        var inner_matches;
        while( (inner_matches = quiz_item_pattern.exec(quiz_items_str)) != null ){
            var quiz_item_str = inner_matches[2];
            
            var quiz_message_search = quiz_message_pattern.exec(quiz_item_str);
            if( quiz_message_search != null ){
                var quiz_message = quiz_message_search[2];
                var quiz_image = getAttr(quiz_message_search[1], 'img');
            } else {
                var quiz_message = '';
                var quiz_image = '';
            }
            
            var quiz_answer_search = quiz_answer_pattern.exec(quiz_item_str);
            if( quiz_answer_search != null ){
                var quiz_answer = quiz_answer_search[1];
            } else {
                var quiz_answer = '';
            }
            
            var quiz_choice_list_search = quiz_choice_list_pattern.exec(quiz_item_str);
            
            var quiz_choice_list = new Array();
            var answer_correct = '';
            if( quiz_choice_list_search != null ){
                var quiz_choice_list_str = quiz_choice_list_search[1];
                var quiz_choice_matches;
                
                while( (quiz_choice_matches = quiz_choice_pattern.exec(quiz_choice_list_str)) != null ){
                    
                    var correct_status = getAttr(quiz_choice_matches[1], 'correct');
                    var choice_num = getAttr(quiz_choice_matches[1], 'num');
                    
                    var correct_flag = false;
                    if( correct_status == 'ok' ){
                        correct_flag = true;
                        answer_correct = choice_num;
                    }
                    
                    var quiz_choice = {
                        num: choice_num,
                        sub: getAttr(quiz_choice_matches[1], 'sub'),
                        is_correct: correct_flag
                    };
                    quiz_choice_list.push(quiz_choice);
                    
                }
            }
            
            
            var quiz_related_list_search = quiz_related_list_pattern.exec(quiz_item_str);
            
            var quiz_related_list = new Array();
            if( quiz_related_list_search != null ){
                var quiz_related_list_str = quiz_related_list_search[1];
                var quiz_related_matches;
                
                while( (quiz_related_matches = quiz_related_pattern.exec(quiz_related_list_str)) != null ){
                	//관련기사
                    var quiz_related = {
                        src: getAttr(quiz_related_matches[1], 'src'),
                        desc: getAttr(quiz_related_matches[1], 'desc'),
                    };
                    quiz_related_list.push(quiz_related);
                }
            }
            
            var quiz_related_post_search = quiz_item_str.match(quiz_related_posts_pattern);
            
            var quiz_item = {
                id: getAttr(inner_matches[1], 'id'),
                type: getAttr(inner_matches[1], 'type'),
                message: quiz_message,
                image: quiz_image,
                answer_correct: answer_correct,
                answer_message: quiz_answer,
                choice_list:quiz_choice_list,
                related_list:quiz_related_list,
                related_posts:getAttr(quiz_related_post_search, 'ids'),
                
            };
            
            quiz_items.push(quiz_item);
        }
        
        var quiz_container = {
            id: getAttr(matches[1], 'id'),
            title: getAttr(matches[1], 'title'),
            items: quiz_items,
        };
        
        quiz_container_array.push(quiz_container);
		
		console.log(quiz_container_array);
	}
	
	
	//배열을 반환한다.
	return quiz_container_array;
}


jQuery(document).ready(function($) {
	
	var $bloter_item_count = 1;
	
	var $tinymce_custom_plugin_name = 'bloter_quiz';
	var $tinymce_custom_plugin_button = 'bloter_quiz_button';
	
	var $bloter_quiz_instance;
	var bloter_quiz_shortcode_replace_str = '';
	
	
	//에디터에 버튼을 구성하기 위해 tinymce.create 메서드를 사용한다.
	tinymce.create('tinymce.plugins.'+ $tinymce_custom_plugin_name, {
		init : function(ed, url) {
			
			var toolbarActive = false;
			
			var b_placeholder = url + '/placeholder/icon_bloter_admin.png';
			b_placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			
			//replace from shortcode to an image placeholder
			ed.on('BeforeSetcontent', function(event){ 
				//event.content = replaceShortcodes( event.content );
				var $content = event.content;
							    
			    $bloter_quiz_instance = init_bloter_quiz( $content);
			    
			    var editable_component = '<img class="mceItem bloter-quiz-editor-component" data-bloter-quiz="true" data-mce-resize="false" data-mce-placeholder="1" src="' + b_placeholder + '" />';
			    
			    bloter_quiz_shortcode_replace_str = editable_component;
			    
			    var quiz_container_pattern_all = /\[bloter_quiz_container([^\]]*)\](.*)\[\/bloter_quiz_container\]/gmi;
			    
			    event.content = $content.replace(quiz_container_pattern_all, editable_component);
			});
	
			//replace from image placeholder to shortcode
			ed.on('GetContent', function(event){
				var content = event.content;
								
				var r_str = '';
				$.each($bloter_quiz_instance, function(q_index, q_item){
					r_str += '[bloter_quiz_container id="'+ q_item.id +'" title="'+ q_item.title +'"]';
					
					var obj_quiz_items = q_item.items;
			    	$.each(obj_quiz_items, function(qi_index, qi_item){
			    		r_str += '[bloter_quiz_item id="'+ qi_item.id +'" type="'+ qi_item.type +'"]';
			    		
			    		r_str += '[bloter_quiz_message id="'+ qi_item.id +'" img="'+ qi_item.image +'"]';
			    		r_str += qi_item.message;
						r_str += '[/bloter_quiz_message]';
						
						
						r_str += '[bloter_quiz_choice_list]';
						var obj_quiz_choice = qi_item.choice_list;
			    		var answer_c = qi_item.answer_correct;
			    		$.each(obj_quiz_choice, function(qc_index, qc_item){
			    			if( qc_item.is_correct ){
			    				r_str += '[bloter_quiz_choice num="'+ qc_item.num  +'" sub="'+ qc_item.sub +'" correct="ok"]';	
			    			} else {
			    				r_str += '[bloter_quiz_choice num="'+ qc_item.num  +'" sub="'+ qc_item.sub +'"]';
			    			}
			    		});
			    		r_str += '[/bloter_quiz_choice_list]';
			    		
			    		
			    		if( qi_item.answer_message != '' ){			    		
			    			r_str += '[bloter_quiz_answer]';
			    			r_str += qi_item.answer_message;
							r_str += '[/bloter_quiz_answer]';
						}
			    		
			    		var obj_quiz_related = qi_item.related_list;
			    		if( obj_quiz_related.length > 0 ){
			    			r_str += '[bloter_quiz_related_list]';
				    		
				    		$.each(obj_quiz_related, function(qr_index, qr_item){
				    			r_str += '[bloter_quiz_related src="'+ qr_item.src +'" desc="'+ qr_item.desc +'"]';
				    		});
				    		r_str += '[/bloter_quiz_related_list]';	
			    		}
			    		
			    		var obj_quiz_related_posts = qi_item.related_posts;
			    		if( obj_quiz_related_posts != '' ){
			    			r_str += '[bloter_quiz_related_posts ids="'+ obj_quiz_related_posts +'"]';
			    		}
			    		
			    		
			    		
			    		
			    		r_str += '[/bloter_quiz_item]';
			    	});
					
					r_str += '[/bloter_quiz_container]';
				});
				
				//<img class="mceItem bloter-quiz-editor-component" data-mce-resize="false" data-mce-placeholder="1" src="' + b_placeholder + '" />
				
				
				
				event.content = content.replace( /(?:<p(?: [^>]+)?>)*(<img [^>]+>)(?:<\/p>)*/g, function( match, image ) {
						var data = getAttr( image, 'data-bloter-quiz' );
						
						if ( data ) {
							return '<p>'+ r_str +'</p>';
						}
						return match;
					}); 
				
			});
			
			//open popup on placeholder double click
			ed.on('Click',function(e) {
				var cls  = e.target.className.indexOf('bloter-quiz-editor-component');
				console.log(cls);
				if ( e.target.className.indexOf('bloter-quiz-editor-component') > -1 ) {
				
					var wrap = $('#wpwrap');
	        		var doc = $(document);
	        		var modal = $('<div class="bloter-global-modal bloter-global-modal-style"></div>');
	        		var backdrop = $('<div class="bloter-global-modal-backdrop"></div>');
	        		var body = $('body').addClass('bloter-global-modal-noscroll');
	        		
	        		var modal_inner = $('<div class="bloter-global-modal-inner"></div>');
					var modal_inner_header = $('<div class="bloter-global-modal-inner-header"></div>');
					var modal_inner_content = $('<div class="bloter-global-modal-inner-content"></div>');
					var modal_inner_footer = $('<div class="bloter-global-modal-inner-footer"></div>');
					
					var modal_title = '퀴즈 삽입';
					var modal_title_container = $('<h3 class="bloter-global-modal-title"></h3>');
					var modal_close = $('<div class="bloter-global-modal-close bloter-global-modal-attach-close-event"><i class="fa fa-times"></i></div>');
					
					var modal_submit = $('<button id="bloter-quiz-generate" class="button button-primary button-large bloter-global-modal-submit">Submit</button>');
					var modal_cancel = $('<button class="button button-default button-large bloter-global-modal-cancel bloter-global-modal-attach-close-event">Cancel</button>');
					
					modal_title_container.append(modal_title);
					//modal_inner_header.append(modal_close);
					modal_inner_header.append(modal_title_container);
					
					
					
					
					
					
					
					var r_str = '';
				
				r_str += '<div class="bloter-quiz-wrapper">';
				r_str += '<div class="handle-button-container">';
				r_str += '<button id="create-bloter-quiz-item" class="button button-primary button-large">';
				r_str += 'Create Quiz Item';
				r_str += '</button>';
				r_str += '</div>';
				r_str += '<ul class="bloter-quiz-sortable">';
				
				var $bloter_quiz_inst = $bloter_quiz_instance[0];
												
				var obj_quiz_items = $bloter_quiz_inst.items;
				$.each(obj_quiz_items, function(qi_index, q_item){
					
					r_str += '<li id="bloter-quiz-item-'+ q_item.id +'" class="bloter-quiz-item ui-state-default">';
					r_str += '<div class="bloter-quiz-item-box">';
					r_str += '<div class="bloter-quiz-item-handlediv" title="토글하려면 클릭하세요"></div>';
					r_str += '<h3 class="bloter-quiz-item-handle">';
					r_str += '<span class="bloter-quiz-display">아이템</span>';
					r_str += '<span title="아이템 삭제" class="bloter-quiz-item-remove glyphicon glyphicon-remove"></span>';
					r_str += '</h3>';
					r_str += '<div class="bloter-quiz-item-inside">';
					r_str += '<div class="bloter-quiz-type-select">';
					r_str += '<p>형식</p>';
					if( q_item.type == 'multiple_choice' ){
						r_str += '<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-quiz" name="bloter-quiz-type-'+ q_item.id +'" checked="checked" value="mutiple_choice" /><label for="bloter-quiz-type-radio-quiz">퀴즈형</label>';
						r_str += '<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-survey" name="bloter-quiz-type-'+ q_item.id +'" value="survey" /><label for="bloter-quiz-type-radio-survey">설문형</label>';	
					} else {
						r_str += '<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-quiz" name="bloter-quiz-type-'+ q_item.id +'" value="mutiple_choice" /><label for="bloter-quiz-type-radio-quiz">퀴즈형</label>';
						r_str += '<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-survey" name="bloter-quiz-type-'+ q_item.id +'" checked="checked" value="survey" /><label for="bloter-quiz-type-radio-survey">설문형</label>';
					}
					
					r_str += '</div>';
					r_str += '<div class="bloter-quiz-main-container">';
					
					
					r_str += '<div class="bloter-quiz-item-part">';
					
					if( q_item.type == 'multiple_choice' ){
						r_str += '<label for="bloter-quiz-content">퀴즈</label>';
					} else {
						r_str += '<label for="bloter-quiz-content">설문</label>';
					}
	
					r_str += '<textarea class="bloter-quiz-content" name="bloter-quiz-content" id="bloter-quiz-content-'+ q_item.id +'" cols="30" rows="3">'+ q_item.message +'</textarea>';
					r_str += '</div>';
					r_str += '<div class="bloter-quiz-item-part">';
					r_str += '<label for="bloter-quiz-image">이미지</label>';
					r_str += '<p>';
					r_str += '<input class="bloter-quiz-image bloter-quiz-image-'+ q_item.id +'" name="bloter-quiz-image" type="text" value="'+ q_item.image +'" />';
					r_str += '</p>';
					r_str += '<div id="bloter-quiz-image-controller-'+ q_item.id +'" data-controller="'+ q_item.id +'" class="bloter-quiz-image-controller">';
					r_str += '<span class="glyphicon glyphicon-camera"></span> 미디어 라이브러리';
					r_str += '</div>';
					r_str += '</div>';
					r_str += '<div class="bloter-quiz-item-part">';
					r_str += '<label for="bloter-quiz-choice">선택지 <span class="glyphicon glyphicon-plus bloter-quiz-choice-add" data-qid="'+ q_item.id +'"></span></label>';
					
					
					r_str += '<div class="bloter-quiz-choice-list">';
					
					r_str += '<ul id="bloter-quiz-choice-container-'+ q_item.id +'" data-qid="'+ q_item.id +'">';
		
					var input_choice_list = '';
					$.each( q_item.choice_list, function(ic_index, ic_item){
						r_str += '<li>';
						r_str += '<span class="bloter-quiz-choice-number">'+ (ic_index+1) +'</span>';
						r_str += '<input type="text" class="bloter-quiz-choice" name="bloter_quiz_choice" value="'+ ic_item.sub +'" />';
						
						if( q_item.type == 'multiple_choice' ){
							if( ic_item.is_correct ){
								r_str += '<input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" checked="checked" /> 정답으로 설정';
							} else {
								r_str += '<input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" /> 정답으로 설정';
							}
						} else {
							r_str += '<input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" disabled="true" /> 정답으로 설정';
						}
						
						r_str += '<span class="glyphicon glyphicon-minus bloter-quiz-choice-remove" title="선택지 삭제" data-qid="'+ q_item.id +'"></span>';
						r_str += '</li>';
					});
					
					
					r_str += '</ul>';
					r_str += '</div>';
					//r_str += '<input type="text" class="bloter-quiz-choice" id="bloter-quiz-choice" name="bloter-quiz-choice" value="'+ input_choice_list +'" />';
					r_str += '</div>';
					r_str += '<div class="bloter-quiz-item-part">';
					
					if( q_item.type == 'multiple_choice' ){
						r_str += '<label for="bloter-quiz-answer">정답 해설</label>';
					} else {
						r_str += '<label for="bloter-quiz-answer">설문 메시지</label>';
					}
					
					r_str += '<textarea class="bloter-quiz-answer" name="bloter-quiz-answer" id="bloter-quiz-answer-'+ q_item.id +'" cols="30" rows="3">'+ q_item.answer_message +'</textarea>';
					r_str += '</div>';
					r_str += '<div class="bloter-quiz-item-part">';
					r_str += '<label for="bloter-quiz-related">관련기사</label>';
					r_str += '<input type="text" class="bloter-quiz-related" id="bloter-quiz-related" name="bloter-quiz-related" value="'+ q_item.related_posts +'" />';
					r_str += '</div>';
					
				
					r_str += '</div>';
					r_str += '</div>';
					r_str += '</div>';
					r_str += '</li>';
				});

					
				r_str += '</ul>';
				r_str += '</div>';
					
					
					
					
					
					modal_inner_content.append(r_str);
					
					
					//footer
					modal_inner_footer.append(modal_submit);
					modal_inner_footer.append(modal_cancel);
					
					modal_inner.append(modal_inner_header);
					modal_inner.append(modal_inner_content);
					modal_inner.append(modal_inner_footer);
					
					modal.append(modal_inner);
					
					wrap.append(modal);
	        		wrap.append(backdrop);
	        		
	        		$('.bloter-quiz-item-handlediv').trigger('click');
	        		
	        		$(document).on('click', '.bloter-global-modal-attach-close-event', function(){
	        			modal.remove();
						backdrop.remove();
						body.removeClass('bloter-global-modal-noscroll');
						return false;
	        		});
				}
				
				$('#bloter-quiz-generate').on('click', function(e){
        			
					$item_list = $('.bloter-quiz-item');
					if( $item_list.length < 1 ){
						alert('타임라인을 만들려면 1개 이상의 아이템이 존재해야 합니다.');
						return;
					}
					
					$bloter_timeline_subject = $('#bloter-timeline-subject').val();
					
					var $output = '';
					
					$output += '[bloter_quiz_container id="' + $bloter_item_count + '"]';

					$validate = true;
					$.each($item_list, function($index, $item){
						
						var $type = '';
						
						var $type_radio_multiple = $(this).find('.bloter-quiz-type-radio-quiz');
						var $type_radio_survey = $(this).find('.bloter-quiz-type-radio-survey');
						
						var $quiz_main_container = $(this).find('.bloter-quiz-main-container');
						var $quiz_content = $(this).find('.bloter-quiz-content').val();
						//var $quiz_choice_list_str = $(this).find('.bloter-quiz-choice').val();
						
						var $quiz_related_posts = $(this).find('.bloter-quiz-related').val();
						
						
						//var $quiz_choice_list = $quiz_choice_list_str.split(',');
						
						var $quiz_answer = $(this).find('.bloter-quiz-answer').val();
						
						if( $type_radio_multiple.is(':checked') ){
							$type = 'multiple_choice';
						} else if( $type_radio_survey.is(':checked') ){
							$type = 'survey';
						}
						
						
						var $title = $(this).find('.bloter-timeline-title').val();
						var $date = $(this).find('.bloter-timeline-date').val();
						var $url = $(this).find('.bloter-timeline-url').val();
						var $image = $(this).find('.bloter-quiz-image').val();
						var $content = $(this).find('.bloter-timeline-content').val();
			
						//if( !$title || $title.trim() == '' ){ $validate = false; }
						//if( !$date || $date.trim() == '' ){ $validate = false; }
						//if( !$content || $content.trim() == '' ){ $validate = false; }
						
						$output += '[bloter_quiz_item id="' + ($index+1) + '" type="'+$type+'"]';
						
						$output += '[bloter_quiz_message id="'+ ($index+1) +'"';
						if( $image && $image.trim() != '' ){ $output +=' img="'+$image+'"'; }
						$output += ']';
						
						$output += $quiz_content + '[/bloter_quiz_message]';
						
						//console.log($quiz_choice_list);
						
						var fix_quiz_chioce_list = $(this).find('.bloter-quiz-choice-list ul li');
						var fix_quiz_chioce_list_count = fix_quiz_chioce_list.size();
						
						if( fix_quiz_chioce_list_count > 0 ){
							$output += '[bloter_quiz_choice_list]';
							$.each(fix_quiz_chioce_list, function(qc_idx, qc_it){
								var quiz_choice = $(qc_it).find('.bloter-quiz-choice');
								var quiz_choice_text = quiz_choice.val();
								var quiz_correct = $(qc_it).find('.bloter-quiz-correct');
								
								if( quiz_correct.is(":checked") ){
								
									$output += '[bloter_quiz_choice num="'+ (qc_idx+1) +'" sub="'+ quiz_choice_text +'" correct="ok"]';
								} else {
								
									$output += '[bloter_quiz_choice num="'+ (qc_idx+1) +'" sub="'+ quiz_choice_text +'"]';
								}
								
							});
							$output += '[/bloter_quiz_choice_list]';
							
						}
						
						if( $quiz_related_posts != '' ){
							console.log($quiz_related_posts);
							$output += '[bloter_quiz_related_posts ids="'+ $quiz_related_posts  +'"]';
						}
						
						/*
						if( $quiz_choice_list.length > 0 ){
							$output += '[bloter_quiz_choice_list]';
							$.each($quiz_choice_list, function($index, $item){
								if( $item.indexOf("(c)") > 0 ){
									$item = $item.replace("(c)", ''); 
									$output += '[bloter_quiz_choice num="'+ ($index+1) +'" sub="'+ $item +'" correct="ok"]';	
								} else {
									$output += '[bloter_quiz_choice num="'+ ($index+1) +'" sub="'+ $item +'"]';
								}
																
							});
							$output += '[/bloter_quiz_choice_list]';
						}
						*/
						
						if( $quiz_answer.trim() != '' ){
							$output += '[bloter_quiz_answer]'+ $quiz_answer +'[/bloter_quiz_answer]';	
						}
						
						$output += '[/bloter_quiz_item]';
					});
					
					$output += '[/bloter_quiz_container]';
					
					if( !$validate ){
						alert('작성되지 않은 항목이 있습니다.\n제목, 날짜, 내용은 반드시 작성해야 하는 항목입니다.');
						return;
					}else{
						$pre_item_list = $item_list;
						//$('.bloter-timeline-item-revert').addClass('exist-revert-item');			
						tinymce.activeEditor.execCommand('mceInsertContent', false, $output);
						$bloter_item_count++;
						//$('#bloter-timeline-modal').modal('hide');
						modal.remove();
						backdrop.remove();
						body.removeClass('bloter-global-modal-noscroll');
						return false;
					}
				});	
			});
			
			
			ed.addCommand('bloter_insert_quiz', function() {
				
				var wrap = $('#wpwrap');
        		var doc = $(document);
        		var modal = $('<div class="bloter-global-modal bloter-global-modal-style"></div>');
        		var backdrop = $('<div class="bloter-global-modal-backdrop"></div>');
        		var body = $('body').addClass('bloter-global-modal-noscroll');
        		
        		var modal_inner = $('<div class="bloter-global-modal-inner"></div>');
				var modal_inner_header = $('<div class="bloter-global-modal-inner-header"></div>');
				var modal_inner_content = $('<div class="bloter-global-modal-inner-content"></div>');
				var modal_inner_footer = $('<div class="bloter-global-modal-inner-footer"></div>');
				
				var modal_title = '퀴즈 삽입';
				var modal_title_container = $('<h3 class="bloter-global-modal-title"></h3>');
				var modal_close = $('<div class="bloter-global-modal-close bloter-global-modal-attach-close-event"><i class="fa fa-times"></i></div>');
				
				var modal_submit = $('<button id="bloter-quiz-generate" class="button button-primary button-large bloter-global-modal-submit">Submit</button>');
				var modal_cancel = $('<button class="button button-default button-large bloter-global-modal-cancel bloter-global-modal-attach-close-event">Cancel</button>');
				
				modal_title_container.append(modal_title);
				//modal_inner_header.append(modal_close);
				modal_inner_header.append(modal_title_container);
				
				
				var spinner_wrap = modal_inner_content;
				var spinner_backdrop = $('<div class="bloter-global-modal-backdrop bloter-modal-absolute"></div>');
				var spinner = $('<div class="bloter-spinner-wrap"><div class="bloter-spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></div>');
						
				spinner_backdrop.append(spinner);
				
				// ----------------------- edit here
				//main container
				$.ajax({
					type:'post',
					url:'admin-ajax.php',
					data: { action :'bloter_quiz_admin_part_load', data: ''},
					beforeSend : function(){
						$(spinner_backdrop).hide().appendTo(spinner_wrap).fadeIn(250);
						//wrap.append(backdrop);
					},
					success:function(response){
						setTimeout(function(){
							spinner_backdrop.fadeOut(400, function() {
								modal_inner_content.append(response);
								
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
				//-------------------------
				
				
				
				
				//footer
				modal_inner_footer.append(modal_submit);
				modal_inner_footer.append(modal_cancel);
				
				modal_inner.append(modal_inner_header);
				modal_inner.append(modal_inner_content);
				modal_inner.append(modal_inner_footer);
				
				modal.append(modal_inner);
				
				wrap.append(modal);
        		wrap.append(backdrop);
        		
        		$(document).on('click', '.bloter-global-modal-attach-close-event', function(){
        			modal.remove();
					backdrop.remove();
					body.removeClass('bloter-global-modal-noscroll');
					return false;
        		});
        		
        		
        		$('#bloter-quiz-generate').on('click', function(e){
        			
					$item_list = $('.bloter-quiz-item');
					if( $item_list.length < 1 ){
						alert('타임라인을 만들려면 1개 이상의 아이템이 존재해야 합니다.');
						return;
					}
					
					$bloter_timeline_subject = $('#bloter-timeline-subject').val();
					
					var $output = '';
					
					$output += '[bloter_quiz_container id="' + $bloter_item_count + '"]';

					$validate = true;
					$.each($item_list, function($index, $item){
						
						var $type = '';
						
						var $type_radio_multiple = $(this).find('.bloter-quiz-type-radio-quiz');
						var $type_radio_survey = $(this).find('.bloter-quiz-type-radio-survey');
						
						var $quiz_main_container = $(this).find('.bloter-quiz-main-container');
						var $quiz_content = $(this).find('.bloter-quiz-content').val();
						//var $quiz_choice_list_str = $(this).find('.bloter-quiz-choice').val();
						
						var $quiz_related_posts = $(this).find('.bloter-quiz-related').val();
						
						//var $quiz_choice_list = $quiz_choice_list_str.split(',');
						
						var $quiz_answer = $(this).find('.bloter-quiz-answer').val();
						
						if( $type_radio_multiple.is(':checked') ){
							$type = 'multiple_choice';
						} else if( $type_radio_survey.is(':checked') ){
							$type = 'survey';
						}
						
						
						var $title = $(this).find('.bloter-timeline-title').val();
						var $date = $(this).find('.bloter-timeline-date').val();
						var $url = $(this).find('.bloter-timeline-url').val();
						var $image = $(this).find('.bloter-quiz-image').val();
						var $content = $(this).find('.bloter-timeline-content').val();
			
						//if( !$title || $title.trim() == '' ){ $validate = false; }
						//if( !$date || $date.trim() == '' ){ $validate = false; }
						//if( !$content || $content.trim() == '' ){ $validate = false; }
						
						$output += '[bloter_quiz_item id="' + ($index+1) + '" type="'+$type+'"]';
						
						$output += '[bloter_quiz_message id="'+ ($index+1) +'"';
						if( $image && $image.trim() != '' ){ $output +=' img="'+$image+'"'; }
						$output += ']';
						
						$output += $quiz_content + '[/bloter_quiz_message]';
						
						//console.log($quiz_choice_list);
						
						var fix_quiz_chioce_list = $(this).find('.bloter-quiz-choice-list ul li');
						var fix_quiz_chioce_list_count = fix_quiz_chioce_list.size();
						
						if( fix_quiz_chioce_list_count > 0 ){
							$output += '[bloter_quiz_choice_list]';
							$.each(fix_quiz_chioce_list, function(qc_idx, qc_it){
								var quiz_choice = $(qc_it).find('.bloter-quiz-choice');
								var quiz_choice_text = quiz_choice.val();
								var quiz_correct = $(qc_it).find('.bloter-quiz-correct');
								
								if( quiz_correct.is(":checked") ){
								
									$output += '[bloter_quiz_choice num="'+ (qc_idx+1) +'" sub="'+ quiz_choice_text +'" correct="ok"]';
								} else {
								
									$output += '[bloter_quiz_choice num="'+ (qc_idx+1) +'" sub="'+ quiz_choice_text +'"]';
								}
								
							});
							$output += '[/bloter_quiz_choice_list]';
							
						}
						
						if( $quiz_related_posts != '' ){
							console.log($quiz_related_posts);
							$output += '[bloter_quiz_related_posts ids="'+ $quiz_related_posts  +'"]';
						}
						
						/*
						if( $quiz_choice_list.length > 0 ){
							$output += '[bloter_quiz_choice_list]';
							$.each($quiz_choice_list, function($index, $item){
								if( $item.indexOf("(c)") > 0 ){
									$item = $item.replace("(c)", ''); 
									$output += '[bloter_quiz_choice num="'+ ($index+1) +'" sub="'+ $item +'" correct="ok"]';	
								} else {
									$output += '[bloter_quiz_choice num="'+ ($index+1) +'" sub="'+ $item +'"]';
								}
																
							});
							$output += '[/bloter_quiz_choice_list]';
						}
						*/
						
						if( $quiz_answer.trim() != '' ){
							$output += '[bloter_quiz_answer]'+ $quiz_answer +'[/bloter_quiz_answer]';	
						}
						
						$output += '[/bloter_quiz_item]';
					});
					
					$output += '[/bloter_quiz_container]';
					
					if( !$validate ){
						alert('작성되지 않은 항목이 있습니다.\n제목, 날짜, 내용은 반드시 작성해야 하는 항목입니다.');
						return;
					}else{
						$pre_item_list = $item_list;
						//$('.bloter-timeline-item-revert').addClass('exist-revert-item');			
						tinymce.activeEditor.execCommand('mceInsertContent', false, $output);
						$bloter_item_count++;
						//$('#bloter-timeline-modal').modal('hide');
						modal.remove();
						backdrop.remove();
						body.removeClass('bloter-global-modal-noscroll');
						return false;
					}
				});	
        		
        		/*
        		modal_close.on('click', function(){
        			modal.remove();
					backdrop.remove();
					body.removeClass('bloter-global-modal-noscroll');
					return false;
				});
        		*/
        		
        		/*
        		backdrop.on('click', function(){
        			modal.remove();
					backdrop.remove();
					body.removeClass('bloter-global-modal-noscroll');
					return false;
				});
				*/
				
				//jQuery('#bloter-quiz-modal').modal('show');
				//jQuery('.bloter-quiz-sortable').empty();
				
				
				
		        /*
				jQuery('.bloter-quiz-sortable').append($html);
				*/
				jQuery('.bloter-quiz-sortable').sortable({
					connectWith: ".bloter-quiz-sortable",
			      	handle: ".bloter-quiz-item-handle",
					placeholder: "ui-state-highlight",
					axis:"y",
				});
				
				//jQuery('.closed .bloter-quiz-item-inside').hide();
				
				jQuery('.bloter-quiz-date').datepicker();
				jQuery('.bloter-quiz-date').datepicker("option", "dateFormat", "yy-mm-dd");
				
			});

            
            ed.addButton($tinymce_custom_plugin_button, {title : '퀴즈 삽입', cmd : 'bloter_insert_quiz', image: url + '/bloter_quiz_placeholder.png' });
        },
		getInfo : function() {
			return {
				longname : '퀴즈 삽입',
				author : 'Bloter MediaLab',
				authorurl : 'http://labs.bloter.net',
				infourl : 'http://labs.bloter.net',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
    });
    tinymce.PluginManager.add($tinymce_custom_plugin_name, tinymce.plugins[$tinymce_custom_plugin_name]);
});