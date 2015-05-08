<?php if ( !defined( 'ABSPATH' ) ) exit('No direct script access allowed');

class BloterQuizScriptManager{
	
	public function __construct(){
		add_action( 'admin_init', array( $this, 'add_editor_style') );
        add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'front_enqueue_scripts' ) );
    }
	
	public function add_editor_style(){
		add_editor_style( BLOTER_QUIZ_ASSET_URL . 'css/bloter-quiz-editor-style.css' );
	}
	
	public function admin_enqueue_scripts( $hook ){
		if( wp_style_is( 'font-awesome', 'registered' ) ){
			if( !wp_style_is( 'font-awesome', 'enqueued' ) ){
				wp_enqueue_style('font-awesome');
			}
		}else{
			wp_register_style('font-awesome', BLOTER_QUIZ_ASSET_URL . 'css/font-awesome.css', array(), null );
			wp_enqueue_style('font-awesome');
		}
		
		wp_register_style( 'bloter-quiz-admin-style', BLOTER_QUIZ_ASSET_URL . 'css/bloter-quiz-admin-style.css', array(), null );
		wp_enqueue_style('bloter-quiz-admin-style');
		
		wp_register_style( 'bloter-quiz-admin-modal-style', BLOTER_QUIZ_ASSET_URL . 'css/bloter-quiz-admin-modal-style.css', array(), null );
		wp_enqueue_style('bloter-quiz-admin-modal-style');
		
		wp_register_style( 'select2', BLOTER_QUIZ_ASSET_URL . 'css/select2.css', array(), null );
		wp_enqueue_style('select2');
		
		wp_enqueue_script('jquery-ui');
		wp_enqueue_script('jquery-ui-datepicker');
		wp_enqueue_script('jquery-ui-sortable');
		//wp_enqueue_script('jquery-ui');
		
		wp_register_script( 'bloter-quiz-admin-modal-script', BLOTER_QUIZ_ASSET_URL . 'js/bloter-quiz-admin-modal-script.js', array('jquery'), null );
		wp_enqueue_script('bloter-quiz-admin-modal-script');
		
		wp_register_script( 'select2', BLOTER_QUIZ_ASSET_URL . 'js/select2/select2.js', array('jquery'), null );
		wp_enqueue_script('select2');
		
		/*
		if( $hook == 'toplevel_page_bloter-extension' ){
			wp_register_script( 'bloter-extension-api-management', BLOTER_QUIZ_ASSET_URL . 'js/bloter-extension-api-management.js', array('jquery'), null );
			wp_enqueue_script('bloter-extension-api-management');
			
			wp_register_style( 'bloter-extension-api-management', BLOTER_QUIZ_ASSET_URL . 'css/bloter-extension-api-management.css', array(), null );
			wp_enqueue_style('bloter-extension-api-management');
		} else if( strpos($hook, 'page_bloter-extension-air-quality') !== false ){
			wp_register_script( 'bloter-extension-air-quality', BLOTER_QUIZ_ASSET_URL . 'js/bloter-extension-air-quality.js', array('jquery'), null );
			wp_enqueue_script('bloter-extension-air-quality');
			
			wp_register_script( 'd3', BLOTER_QUIZ_ASSET_URL . 'js/d3.js', array('jquery'), null );
			wp_enqueue_script('d3');
			
			wp_register_style( 'bloter-extension-air-quality', BLOTER_QUIZ_ASSET_URL . 'css/bloter-extension-air-quality.css', array(), null );
			wp_enqueue_style('bloter-extension-air-quality');
		} else if( strpos($hook, 'page_bloter-extension-api-data') !== false ){
			wp_register_style( 'bloter-extension-api-data', BLOTER_QUIZ_ASSET_URL . 'css/bloter-extension-api-data.css', array(), null );
			wp_enqueue_style('bloter-extension-api-data');
		}
		*/
	}
	
	public function front_enqueue_scripts(){
		if( wp_style_is( 'font-awesome', 'registered' ) ){
			if( !wp_style_is( 'font-awesome', 'enqueued' ) ){
				wp_enqueue_style('font-awesome');
			}
		}else{
			wp_register_style('font-awesome', BLOTER_QUIZ_ASSET_URL . 'css/font-awesome.css', array(), null );
			wp_enqueue_style('font-awesome');
		}
		
		wp_register_style('jquery-ui', BLOTER_QUIZ_ASSET_URL . 'css/jquery-ui.css', array(), null );
		wp_enqueue_style('jquery-ui');
		
		wp_register_style('bloter-quiz-frontend-style', BLOTER_QUIZ_ASSET_URL . 'css/bloter-quiz-frontend-style.css', array(), null );
		wp_enqueue_style('bloter-quiz-frontend-style');
		
		wp_register_script( 'bloter-quiz-frontend-script', BLOTER_QUIZ_ASSET_URL . 'js/bloter-quiz-frontend-script.js', array('jquery'), null );
		wp_enqueue_script('bloter-quiz-frontend-script');
	}
	
}
new BloterQuizScriptManager();
