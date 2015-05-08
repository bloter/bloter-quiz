<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');

class BloterQuizAjaxManager{
	
	public function __construct(){
		
		add_action( 'wp_ajax_bloter_quiz_answered', array($this, 'bloter_quiz_answered') );
		add_action( 'wp_ajax_nopriv_bloter_quiz_answered', array($this, 'bloter_quiz_answered') );
		
		add_action( 'wp_ajax_bloter_quiz_admin_part_load', array($this, 'bloter_quiz_admin_part_load') );
		
		add_action( 'wp_ajax_bloter_json_search_post', array($this, 'bloter_json_search_post') );
		
	}
	
	public function bloter_json_search_post(){
		$search_query = $_REQUEST['term'];
	}

	public function bloter_quiz_admin_part_load(){
		$part = isset($_POST['part']) ? $_POST['part'] : '';
		$quiz_type = isset($_POST['quiz_type']) ? $_POST['quiz_type'] : 'multiple_choice';
		$quiz_item_id = isset($_POST['quiz_item_id']) ? $_POST['quiz_item_id'] : 1;
		
				
		ob_start();
		if( $part == 'quiz_item'){
			include_once ( BLOTER_QUIZ_PART_PATH . 'ajax/admin/quiz-item.php');
		} else {
			include_once ( BLOTER_QUIZ_PART_PATH . 'ajax/admin/quiz-container.php');
		}
		
		$contents = ob_get_contents();
		ob_end_clean();
		
		echo $contents;
		
		die();
	}
	
	public function bloter_quiz_answered() {
		
		$post_id = $_POST['post_id'];
		$quiz_list_id = $_POST['quiz_list_id'];
		$quiz_id = $_POST['quiz_id'];
		$answer_count = $_POST['answer_count'];
		$answer = $_POST['answer'];
		$answer_result = $_POST['answer_result'];
		
		$bloter_quiz = get_post_meta($post_id, '_bloter_quiz', true);
		
		
		$total_answer_count = 0;
		
		if( !empty($bloter_quiz) ){
			
			
			if( !isset($bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]) ){
				$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answered_count'] = 1;
			} else {
				$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answered_count']++;
			}
			
			if( !isset($bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answer_list']) ){
				$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answer_list'] = $answer_count;	
			}
			
			for($i=0;$i<$answer_count;$i++){
				if( $i == ($answer - 1) ){
					if( !isset($bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id][$i]) ){
						$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id][$i] = 1;
					} else {
						$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id][$i]++;
					}
				} 
			}
			
		} else {
			$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answered_count'] = 1;
			$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id]['answer_list'] = $answer_count;
			
			for($i=0;$i<$answer_count;$i++){
				if( $i == ($answer - 1) ){
					$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id][$i] = 1;
				} else {
					$bloter_quiz['quiz_list'][$quiz_list_id][$quiz_id][$i] = 0;
				}
			}
			
		}

		update_post_meta($post_id, '_bloter_quiz', $bloter_quiz);
		setcookie('test_cookie', 'text', time()+3600 );

		
		
		echo json_encode($bloter_quiz);
		
		die();
	}
	
}
new BloterQuizAjaxManager();
