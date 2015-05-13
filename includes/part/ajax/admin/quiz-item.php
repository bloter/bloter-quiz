<?php if (!defined('ABSPATH')) exit('No direct script access allowed'); ?>
<li id="bloter-quiz-item-<?php echo $quiz_item_id; ?>" class="bloter-quiz-item ui-state-default">
	<div class="bloter-quiz-item-box<?php if($quiz_item_id > 1) echo ' closed'; ?>">
		<div class="bloter-quiz-item-handlediv" title="토글하려면 클릭하세요"></div>
		<h3 class="bloter-quiz-item-handle">
			<span class="bloter-quiz-display">아이템</span>
			<span title="아이템 삭제" class="bloter-quiz-item-remove glyphicon glyphicon-remove"></span>
		</h3>
		<div class="bloter-quiz-item-inside">
			<div class="bloter-quiz-type-select">
				<p>형식</p>
				<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-quiz" name="bloter-quiz-type-<?php echo $quiz_item_id; ?>"<?php if( $quiz_type == 'multiple_choice' ) echo ' checked="checked"'; ?> value="mutiple_choice" /><label for="bloter-quiz-type-radio-quiz">퀴즈형</label>
				<input type="radio" class="bloter-quiz-type-radio bloter-quiz-type-radio-survey" name="bloter-quiz-type-<?php echo $quiz_item_id; ?>"<?php if( $quiz_type == 'survey' ) echo ' checked="checked"'; ?> value="survey" /><label for="bloter-quiz-type-radio-survey">설문형</label>
			</div>
			<div class="bloter-quiz-main-container">
				<?php
				if( $quiz_type == 'multiple_choice' ){
					include_once ( BLOTER_QUIZ_PART_PATH . 'ajax/admin/quiz-type-multiple-choice.php');
				} else {
					include_once ( BLOTER_QUIZ_PART_PATH . 'ajax/admin/quiz-type-survey.php');
				}
				?>
			</div>
		</div>
	</div>
</li>