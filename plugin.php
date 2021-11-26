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
    require_once( LUX_EDITOR_PATH . 'inc/class-element-style.php' );
    require_once( LUX_EDITOR_PATH . 'inc/class-element-tree.php' );
    require_once( LUX_EDITOR_PATH . 'inc/class-element.php' );

    // AJAX hook to save the Design Element posts.
    add_action( 'wp_ajax_nopriv_lux_editor_save_design_element', [ $this, 'save_design_element' ] );
    add_action( 'wp_ajax_lux_editor_save_design_element', [ $this, 'save_design_element' ] );

    /* Enqueue styles. */
    add_action( 'wp_enqueue_scripts', function() {

      wp_enqueue_style(
        'lux-editor-css',
        LUX_EDITOR_URL . '/assets/css/main.css',
        array(),
        time(),
        'all',
      );

      wp_enqueue_script(
        'lux-editor-parser',
        LUX_EDITOR_URL . '/assets/js/parser.js',
        array(),
        time(),
        true,
      );

      wp_enqueue_script(
        'lux-editor-editor',
        LUX_EDITOR_URL . '/assets/js/editor.js',
        array( 'jquery', 'lux-editor-parser' ),
        time(),
        true,
      );

      wp_enqueue_script(
        'lux-editor-exporter',
        LUX_EDITOR_URL . '/assets/js/exporter.js',
        array( 'jquery', 'lux-editor-editor' ),
        time(),
        true,
      );

    });

  }

  public function save_design_element() {

    $json = $_POST['json'];

    $post_id = wp_insert_post(
      array(
        'post_type'   => 'design_element',
        'post_status' => 'publish'
      )
    );

    update_post_meta( $post_id, 'json_definition', $json );

    $response = new \stdClass;
    $response->code = 200;
    print json_encode( $response );
    die();

  }



}

new Plugin();
