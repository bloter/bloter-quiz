<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');

class BloterQuizShortcodeManager{
	
	public function __construct(){
		add_action( 'init', array( $this, 'register_shortcode' ) );
	}
	
	public function register_shortcode(){
		add_shortcode('bloter_quiz_container', array($this, 'bloter_quiz_container'));
		add_shortcode('bloter_quiz_item', array($this, 'bloter_quiz_item'));
		
		add_shortcode('bloter_survey_message', array($this, 'bloter_survey_message'));
		add_shortcode('bloter_survey_choice_list', array($this, 'bloter_survey_choice_list'));
		add_shortcode('bloter_survey_choice', array($this, 'bloter_survey_choice'));
		add_shortcode('bloter_survey_related_list', array($this, 'bloter_survey_related_list'));
		add_shortcode('bloter_survey_related', array($this, 'bloter_survey_related'));
		
		add_shortcode('bloter_quiz_message', array($this, 'bloter_quiz_message'));
		add_shortcode('bloter_quiz_choice_list', array($this, 'bloter_quiz_choice_list'));
		add_shortcode('bloter_quiz_choice', array($this, 'bloter_quiz_choice'));
		add_shortcode('bloter_quiz_answer', array($this, 'bloter_quiz_answer'));
		add_shortcode('bloter_quiz_related_list', array($this, 'bloter_quiz_related_list'));
		add_shortcode('bloter_quiz_related', array($this, 'bloter_quiz_related'));
		
		add_shortcode('bloter_quiz_related_posts', array($this, 'bloter_quiz_related_posts'));
		
	}
	
	public function bloter_quiz_container( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => 'id',
	        'title'=>'',
	    ), $atts );
		
		//setcookie('test_cookie', 'test', time()+3600);
		
		global $post;
		
		if( !is_single() ) {
			return '<a href="'. get_permalink($post->ID) .'">* 퀴즈 풀어보기</a>';
		}
		
		ob_start();
		
		//var_dump($_COOKIE);
		
		
		?>
		<div id="bloter-quiz-container-<?php echo $attribute['id']; ?>" class="bloter-quiz-container" data-qlid="<?php echo $attribute['id']; ?>">
			<ul class="bloter-quiz-list">
			<?php echo do_shortcode($contents); ?>
			</ul>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_quiz_item( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => 'id',
	        'type'=>'',
	    ), $atts );
		
		$type_class = '';
		$type_data = '';
		if( isset($attribute['type']) && !empty($attribute['type']) ){
			$type_class = ' bloter-quiz-'.$attribute['type'];
			$type_data = $attribute['type'];
		}

		$pid = get_the_ID();
		
		$quiz_obj = get_post_meta($pid, '_bloter_quiz', true);
		
		
		$total_count = 0;
		if( !empty($quiz_obj) ){
			$qi_li = $quiz_obj['quiz_list'];
			
			$qi_id = $attribute['id'];
			$qi_list = $qi_li[$qi_id];
			foreach ($qi_li as $qi) {
				$qi_count = $qi[$qi_id]['answered_count'];
				$total_count = $qi_count; 
			}
		}
		
		ob_start();
		?>
		<li>
			<div id="bloter-quiz-item-<?php echo $attribute['id']; ?>" class="bloter-quiz-item-container<?php echo $type_class; ?>"<?php echo !empty($type_data) ? ' data-type="'.$type_data.'"' : ''; ?> data-qid="<?php echo $attribute['id']; ?>" data-pid="<?php echo $pid; ?>">
				<?php echo do_shortcode($contents); ?>
			</div>
			<div class="bloter-quiz-item-total-count">
				<span><?php echo $total_count; ?> People Voted.</span>
			</div>
		</li>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
		
	
	/* --- survey */
	public function bloter_survey_message( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
			'id' => '',
			'img' => '',
			'img_direction' => 'right',
	        'desc' => '',
	    ), $atts );
		
		
		$img_direction = 'right'; 
		if( isset($attribute['img_direction']) && $attribute['img_direction'] == 'left' ){
			$img_direction = $attribute['img_direction'];
		}
		
		ob_start();
		?>
		<div class="bloter-survey-message clearfix">
			<div class="bloter-survey-index"><?php echo !empty($attribute['id']) ? $attribute['id'] : 'Q'; ?></div>
			<?php if( isset($attribute['img']) && !empty($attribute['img']) ){ ?>
			<div class="bloter-survey-message-image image-direction-<?php echo $img_direction; ?>">
				<img src="<?php echo $attribute['img']?>" alt="" />
			</div>
			<?php } ?>
			<p><?php echo $contents; ?></p>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
		
	}
	
	public function bloter_survey_choice_list( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => '',
	    ), $atts );
		
		ob_start();
		?>
		<ul class="bloter-survey-choice-list">
			<?php echo do_shortcode($contents); ?></p>
		</ul>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_survey_choice($atts){
		$attribute = shortcode_atts( array(
	        'sub' => '',
	    ), $atts );
		
		ob_start();
		?>
		<li><button class="survey-button"><?php echo $attribute['sub']; ?></button></li>
			
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_survey_related_list( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => '',
	    ), $atts );
		
		ob_start();
		?>
		<div class="bloter-survey-related-list">
			<span>관련기사</span>
			<ul><?php echo do_shortcode($contents); ?></ul>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_survey_related( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'src' => '#',
	        'desc' => ''
	    ), $atts );
		
		ob_start();
		?>
		<li><a href="<?php echo $attribute['src']; ?>"><?php echo $attribute['desc']; ?></a></li>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	/* survey ------ */
	
	public function bloter_quiz_message( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
			'id' => '',
			'img' => '',
			'img_direction' => 'right',
	        'desc' => '',
	    ), $atts );
		
		
		$img_direction = 'right'; 
		if( isset($attribute['img_direction']) && $attribute['img_direction'] == 'left' ){
			$img_direction = $attribute['img_direction'];
		}
		
		ob_start();
		?>
		<div class="bloter-quiz-message clearfix">
			<div class="bloter-quiz-index"><?php echo !empty($attribute['id']) ? $attribute['id'] : 'Q'; ?></div>
			<?php if( isset($attribute['img']) && !empty($attribute['img']) ){ ?> 
			<div class="bloter-quiz-message-image image-direction-<?php echo $img_direction; ?>">
				<img src="<?php echo $attribute['img']?>" alt="" />
			</div>
			<?php } ?>
			<p><?php echo $contents; ?></p>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
		
	}
	
	public function bloter_quiz_choice_list( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => '',
	    ), $atts );
		
		ob_start();
		?>
		<ul class="bloter-quiz-choice-list">
			<?php echo do_shortcode($contents); ?></p>
		</ul>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_quiz_choice($atts){
		$attribute = shortcode_atts( array(
	        'sub' => '',
	        'correct' => '',
	        'num' => '',
	    ), $atts );
		
		ob_start();
		?>
		<li<?php echo !empty($attribute['correct']) ? ' class="correct"' : '' ;?>>
			<div class="answer-result"></div>
			<button class="answer-button<?php echo !empty($attribute['correct']) ? ' correct' : '' ;?>" data-bid="<?php echo $attribute['num']; ?>"><?php echo $attribute['sub']; ?></button>
			<div class="answer-ratio-bar">
				<div class="answer-ratio"></div>
			</div>
			<div class="answer-ratio-int"></div>
		</li>
			
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}

	public function bloter_quiz_answer( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => '',
	        
	    ), $atts );
		
		ob_start();
		?>
		<div class="bloter-quiz-answer">
			<p><?php echo $contents; ?></p>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_quiz_related_list( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => '',
	    ), $atts );
		
		ob_start();
		?>
		<div class="bloter-quiz-related-list">
			<span>관련기사</span>
			<ul><?php echo do_shortcode($contents); ?></ul>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_quiz_related( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'src' => '#',
	        'desc' => ''
	    ), $atts );
		
		ob_start();
		?>
		<li><a href="<?php echo $attribute['src']; ?>"><?php echo $attribute['desc']; ?></a></li>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
	
	public function bloter_quiz_related_posts( $atts, $contents = null ){		
		$attribute = shortcode_atts( array(
	        'ids' => '',
	    ), $atts );
		
		$post_ids = explode(',', $attribute['ids']);
				
		ob_start();
		?>
		<div class="bloter-quiz-related-list">
			<span>관련기사</span>
			<ul>
		<?php
		foreach ($post_ids as $post_id) {
			$post = get_post($post_id);
		?>
		<li><a href="<?php echo get_permalink($post_id); ?>"><?php echo $post->post_title; ?></a></li>
		<?php	
		}
		?>
		
			</ul>
		</div>
		<?php
		
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
		
		
		
		
		
	}
	
	
	
	
	
	
	public function bloter_quiz_box( $atts, $contents = null ){
		$attribute = shortcode_atts( array(
	        'id' => 'id',
	        'title'=>'title',
	    ), $atts );
	
	    $result_msg = '<div class="bloter-timeline-wrapper bloter-timeline-wrapper-'.$attribute['id'].'" data-timeline="'.$attribute['id'].'">';
	    $result_msg .= '<div class="bloter-timeline-liner"></div>';
	    $result_msg .= '<div class="bloter-timeline-subject"><h2>'.$attribute['title'].'</h2></div>';
	    $result_msg .= '<div class="bloter-timeline-container">';
	    $result_msg .= do_shortcode($contents);
	    $result_msg .= '</div>';
	    $result_msg .= '</div>';
		
		return $result_msg;
	}
	
	public function bloter_quiz( $atts, $contents = null ){
		extract(shortcode_atts(array(
			'type' => 'multiple choice',
			
		), $atts));
		
		
		
		
		ob_start();
		?>
		<div>
			<p>Test</p>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		
		return $contents;
	}
}
new BloterQuizShortcodeManager();
