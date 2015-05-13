<?php if (!defined('ABSPATH')) exit('No direct script access allowed'); ?>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-content">퀴즈</label>
	<textarea class="bloter-quiz-content" name="bloter-quiz-content" id="bloter-quiz-content-<?php echo $quiz_item_id; ?>" cols="30" rows="3"></textarea>
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-image">이미지</label>
	<p>
		<input class="bloter-quiz-image bloter-quiz-image-<?php echo $quiz_item_id; ?>" name="bloter-quiz-image" type="text" />
	</p>
	<div id="bloter-quiz-image-controller-<?php echo $quiz_item_id; ?>" data-controller="<?php echo $quiz_item_id; ?>" class="bloter-quiz-image-controller">
		<span class="glyphicon glyphicon-camera"></span> 미디어 라이브러리
	</div>
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-choice">선택지 <span class="glyphicon glyphicon-plus bloter-quiz-choice-add" data-qid="<?php echo $quiz_item_id; ?>"></span></label>
	<div class="bloter-quiz-choice-list">
		<ul id="bloter-quiz-choice-container-<?php echo $quiz_item_id; ?>" data-qid="<?php echo $quiz_item_id; ?>">
			<li><span class="bloter-quiz-choice-number">1</span><input type="text" class="bloter-quiz-choice" name="bloter_quiz_choice" /><input type="checkbox" class="bloter-quiz-correct" name="bloter_quiz_correct" /> 정답으로 설정 <span class="glyphicon glyphicon-minus bloter-quiz-choice-remove" title="선택지 삭제" data-qid="<?php echo $quiz_item_id; ?>"></span></li>
		</ul>
	</div>
	<!-- <input type="text" class="bloter-quiz-choice" id="bloter-quiz-choice" name="bloter-quiz-choice" /> -->
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-answer">정답 해설</label>
	<textarea class="bloter-quiz-answer" name="bloter-quiz-answer" id="bloter-quiz-answer-<?php echo $quiz_item_id; ?>" cols="30" rows="3"></textarea>
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-related">관련기사</label>
	<input type="text" class="bloter-quiz-related" id="bloter-quiz-related" name="bloter-quiz-related" />
</div>