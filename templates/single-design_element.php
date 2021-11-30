<?php

get_header();

/**
 * Debug JSON found for this design element.
print '<pre>';
$decoded_json = json_decode( $json );
echo json_encode( $decoded_json, JSON_PRETTY_PRINT );
print '</pre>';
*/

/**
 * Debug ElementTree loading from PHP using import JSON.
$element_tree = new \LuxEditor\ElementTree();
$element_tree->import( $json );
var_dump( $element_tree );
*/

/** Original trees setup.
print '<script>';
print 'var luxEditorTrees = [' . json_encode( $element_tree ) . '];' . "\n";
print '</script>';
*/

get_footer();
