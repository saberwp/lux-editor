<?php

require_once( get_template_directory() . '/lux_editor/inc/class-element.php' );
require_once( get_template_directory() . '/lux_editor/inc/class-element-tree.php' );
require_once( get_template_directory() . '/lux_editor/inc/class-element-style.php' );
require_once( get_template_directory() . '/lux_editor/inc/class-exporter.php' );

$json = get_post_meta( $post->ID, 'json_definition', 1 );

get_header();

print '<pre>';
$decoded_json = json_decode( $json );
echo json_encode( $decoded_json, JSON_PRETTY_PRINT );
print '</pre>';

$element_tree = new \LuxEditor\ElementTree();
$element_tree->import( $json );
var_dump( $element_tree );

print '<script>';
print 'var brandEnforcerTrees = [' . json_encode( $element_tree ) . '];' . "\n";
print '</script>';

require_once( get_template_directory() . '/lux_editor/html5.php' );

get_footer();
