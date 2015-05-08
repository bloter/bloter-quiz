jQuery(function($){
	$('.answer-button').on('click', function(e){
		e.preventDefault();
		
		var $quiz_item = $(this).parents('.bloter-quiz-item-container');
		
		if( $quiz_item.hasClass('answered') ){
			return false;
		}
		
		var $that = $(this);
		var $super_parent = $(this).parent('li');
		var $global_parent = $(this).parents('.bloter-quiz-container');
		
		
		var $quiz_answer = $quiz_item.find('.bloter-quiz-answer');
		var $quiz_related = $quiz_item.find('.bloter-quiz-related-list');
		var $quiz_total = $quiz_item.siblings('.bloter-quiz-item-total-count');
		
		var $qlid = $global_parent.data('qlid');
		var $qid = $quiz_item.data('qid');
		var $pid = $quiz_item.data('pid');
		var $bid = $that.data('bid');
		
		var $answer_ratio_bar = $(this).siblings('.answer-ratio-bar');
		var $answer_ratio = $answer_ratio_bar.find('.answer-ratio');
		
		var $answer_ratios = $('#bloter-quiz-item-' + $qid + ' .answer-ratio');
		var $answer_ratio_ints = $('#bloter-quiz-item-' + $qid + ' .answer-ratio-int');
		var $answer_ratios_count = $answer_ratios.size();
		
		var $answer_result = false;
		if( $that.hasClass('correct') ){ $answer_result = true; }
		
		$super_parent.addClass('chosen');
		$quiz_item.addClass('answered');
		
		
		if( $that.hasClass('correct') ){
			$quiz_item.addClass('correct');
		} else {
			$quiz_item.addClass('incorrect');
		}
		
		$.ajax({
			type: 'post',
			url: window.location.origin + '/wp-admin/admin-ajax.php',
			data: { action:'bloter_quiz_answered', post_id:$pid, quiz_list_id:$qlid, quiz_id:$qid, answer_count:$answer_ratios_count, answer:$bid, answer_result:$answer_result  },
			dataType: 'json',
			success: function(response){
				var $bloter_quiz = response.quiz_list;
				
				var $total_count = $bloter_quiz[$qlid][$qid]['answered_count'];
				var $answer_list = $bloter_quiz[$qlid][$qid]['answer_list'];
				
				for(var $i=0;$i<$answer_list;$i++){
					var $percentage = ($bloter_quiz[$qlid][$qid][$i] / $total_count) * 100;
					
					if( isNaN($percentage) ) $percentage = 0;
					 
					$($answer_ratios[$i]).css('width', $percentage+'%' );
					
					$($answer_ratio_ints[$i]).text($percentage.toFixed(0)+'%');
					//console.log( $answer_ratios[$i] );
					//console.log($bloter_quiz[$qlid][$qid][$i]);
				}
				
				$quiz_answer.fadeIn();
				$quiz_related.fadeIn();
				$quiz_total.fadeIn();
				
				
			},
			
		});

	});
});