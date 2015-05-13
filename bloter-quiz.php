<?php
/*
 * Plugin Name: Bloter Quiz
 * Description: Quiz Plugin
 * Author: Sil
 * Version: 0.0.1
 */
 
class BloterQuiz{
	
	public function  __construct(){
		$this->init();
	}
	
	public function init(){
		$this->define_constants();
		$this->includes();
		$this->init_hooks();
		
		$this->load_manager();
		
	}
	
	private function define_constants() {
		define( 'BLOTER_QUIZ_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
		define( 'BLOTER_QUIZ_PLUGIN_URL', untrailingslashit( plugins_url( '/', __FILE__ ) ) );
		define( 'BLOTER_QUIZ_PLUGIN_FILE', __FILE__ );
		
		define( 'BLOTER_QUIZ_ADDON_PATH', BLOTER_QUIZ_PLUGIN_PATH . '/includes/addons/' );
		define( 'BLOTER_QUIZ_PAGE_PATH', BLOTER_QUIZ_PLUGIN_PATH . '/pages/' );
		define( 'BLOTER_QUIZ_PART_PATH', BLOTER_QUIZ_PLUGIN_PATH . '/includes/part/' );
		
		define( 'BLOTER_QUIZ_ASSET_URL', plugins_url( '/assets/', __FILE__ ) );
	}
	
	private function includes(){
		$this->include_functions();
		$this->include_addons();
		
	}
	
	private function include_functions(){
		//include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterExtensionHelperActions.php' );
		
		//include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/bloter-extension-helper-functions.php' );
		//include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/bloter-extension-api-functions.php' );
		//include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/bloter-extension-io-functions.php' );
	}
	
	private function include_addons(){
		//include_once( BLOTER_QUIZ_ADDON_PATH . 'subtitle-button.php' );
	}
	
	private function init_hooks(){
		//register_activation_hook( __FILE__, array( 'BloterExtensionInstall', 'install' ) );
	}
	
	private function load_manager(){
		//include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterExtensionAdminMenuManager.php' );
		include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterQuizAjaxManager.php' );
		include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterQuizScriptManager.php' );
		include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterQuizShortcodeManager.php' );
		include_once( BLOTER_QUIZ_PLUGIN_PATH . '/includes/BloterQuizTinyMCEManager.php' );
		
	}
}
new BloterQuiz();
