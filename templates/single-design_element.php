<?php

get_header();
print '<div id="lux-editor-canvas"></div>';
get_footer();

$metas = get_post_meta( $post->ID );
var_dump( $metas );

// update_post_meta( $post->ID, 'json_definition', '' );
