<?php
/**
 * @package LuxEditor
 */

/**
 *
 * Plugin Name: LUX Editor
 * Plugin URI: https://saberwp/wordpress-plugins/lux-editor/
 * Description: Precise design control system for brand enforcement.
 * Version: 0.0.1
 * Author: SaberWP
 * Author URI: https://saberwp.com/
 * License: GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 */


namespace LuxEditor;

define( 'LUX_EDITOR_PLUGIN_NAME', 'LUX Editor' );
define( 'LUX_EDITOR_VERSION', '1.0.0' );
define( 'LUX_EDITOR_PATH', plugin_dir_path(__FILE__) );
define( 'LUX_EDITOR_URL', plugin_dir_url(__FILE__) );
define( 'LUX_EDITOR_DEV_MODE', 0 );
define( 'LUX_EDITOR_TEXT_DOMAIN', 'lux-editor' );

class Plugin {

  public function __construct() {

    require_once( LUX_EDITOR_PATH . 'inc/post-type-design-element.php' );

    // AJAX hook to save the Design Element posts.
    add_action( 'wp_ajax_lux_editor_save_design_element', [ $this, 'save_design_element' ] );

    /* Enqueue styles. */
    add_action( 'wp_enqueue_scripts', function() {

      // Only add editor to the Design Element single posts.
      if( ! is_singular( 'design_element' ) ) {
    		return;
    	}

      wp_enqueue_style(
        'lux-editor-css',
        LUX_EDITOR_URL . 'assets/css/main.css',
        array(),
        time(),
        'all',
      );

      wp_enqueue_script(
        'lux-editor',
        LUX_EDITOR_URL . 'assets/js/editor.js',
        array( 'jquery' ),
        time(),
        true,
      );

      // Localize design element JSON.
      global $post;
      $lux_editor_data = array();

      $json_definition_raw = get_post_meta( $post->ID, 'json_definition', 1 );
      $json_definition_clean = stripslashes( $json_definition_raw );
      $elements = json_decode( $json_definition_clean );
      if( ! $elements ) {
        $elements = [];
      }

      $lux_editor_data['elements'] = $elements;
      $lux_editor_data['title']    = $post->post_title;
      $lux_editor_data['id']       = $post->ID;
      wp_localize_script( 'lux-editor', 'luxEditorData', $lux_editor_data );
      wp_localize_script( 'lux-editor', 'luxEditorAjaxUrl', admin_url('admin-ajax.php') );

    });

    /* Single post template override. */
    add_filter( 'template_include', function( $template ) {

      if( is_singular( 'design_element' ) ) {
    		return LUX_EDITOR_PATH . 'templates/single-design_element.php';
    	}

      return $template;

    }, 99 );

  }

  public function save_design_element() {

    $post_id    = $_POST['post'];
    $post_title = $_POST['postTitle'];
    $json       = $_POST['json'];

    wp_update_post( array(
        'ID'         => $post_id,
        'post_title' => $post_title
      )
    );

    update_post_meta( $post_id, 'json_definition', $json );

    $response = new \stdClass;
    $response->code = 200;
    $response->jsonDefinition = get_post_meta( $post_id, 'json_definition', 1 );
    print json_encode( $response );
    die();

  }



}

new Plugin();
