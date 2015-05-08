<?php if (!defined('ABSPATH')) exit('No direct script access allowed'); ?>

<div class="bloter-quiz-wrapper">
	<div class="handle-button-container">
		<button id="create-bloter-quiz-item" class="button button-primary button-large">
			Create Quiz Item
		</button>
	</div>
	<ul class="bloter-quiz-sortable">
		<?php include_once ( BLOTER_QUIZ_PART_PATH . 'ajax/admin/quiz-item.php'); ?>
	</ul>
</div>