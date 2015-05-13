<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');

class BloterQuizTinyMCEManager{
	
	public function __construct(){
		add_filter('mce_external_plugins', array($this, 'register_tinymce_plugin') );
		add_filter('mce_buttons', array( $this , 'add_tinymce_button') );
	}
	
	public function register_tinymce_plugin($plugin_array) {
    	$plugin_array['bloter_quiz'] = BLOTER_QUIZ_ASSET_URL . 'js/bloter-quiz-button.js';
	    return $plugin_array;
	}
	
	public function add_tinymce_button($buttons) {
		array_push( $buttons, "|", "bloter_quiz_button" );
    	return $buttons;
	}
}
new BloterQuizTinyMCEManager();
