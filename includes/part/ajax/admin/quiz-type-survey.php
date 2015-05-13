<?php if (!defined('ABSPATH')) exit('No direct script access allowed'); ?>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-content">퀴즈</label>
	<textarea class="bloter-quiz-content" name="bloter-quiz-content" id="bloter-quiz-content" cols="30" rows="3" placeholder="최대 300자까지 입력 가능합니다."></textarea>
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-image">이미지</label>
	<p>
		<input class="bloter-quiz-image bloter-quiz-image-1" name="bloter-quiz-image" type="text" />
	</p>
	<div id="bloter-quiz-image-controller-1" data-controller="1" class="bloter-quiz-image-controller">
		<span class="glyphicon glyphicon-camera"></span> 미디어 라이브러리
	</div>
</div>
<div class="bloter-quiz-item-part">
	<label for="bloter-quiz-url">링크 URL</label>
	<p>
		<input class="bloter-quiz-url" name="bloter-quiz-url" type="text" />
	</p>
</div>