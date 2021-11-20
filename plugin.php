<?php
/**
 * @package BrandEnforcer
 */

/**
 *
 * Plugin Name: Brand Enforcer
 * Plugin URI: https://saberwp/wordpress-plugins/brand-enforcer/
 * Description: Precise design control system for brand enforcement.
 * Version: 0.0.1
 * Author: SaberWP
 * Author URI: https://saberwp.com/
 * License: GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 */


namespace BrandEnforcer;

define( 'BRAND_ENFORCER_PLUGIN_NAME', 'Brand Enforcer' );
define( 'BRAND_ENFORCER_VERSION', '1.0.0' );
define( 'BRAND_ENFORCER_PATH', plugin_dir_path(__FILE__) );
define( 'BRAND_ENFORCER_URL', plugin_dir_url(__FILE__) );
define( 'BRAND_ENFORCER_DEV_MODE', 0 );
define( 'BRAND_ENFORCER_TEXT_DOMAIN', 'brand-enforcer' );

class Plugin {

  public function __construct() {

    require_once( get_template_directory() . '/brand_enforcer/inc/post-type-design-element.php' );

    // AJAX hook to save the Design Element posts.
    add_action( 'wp_ajax_nopriv_brand_enforcer_save_design_element', [ $this, 'save_design_element' ] );
    add_action( 'wp_ajax_brand_enforcer_save_design_element', [ $this, 'save_design_element' ] );

    /* Enqueue styles. */
    add_action( 'wp_enqueue_scripts', function() {

      wp_enqueue_style(
        'brand-enforcer-css',
        BRAND_ENFORCER_URL . '/assets/css/main.css',
        array(),
        '1.0',
        'all'
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
