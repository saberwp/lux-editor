<?php

// Register Custom Post Type
function lux_editor_post_type_design_element() {

	$labels = array(
		'name'                  => _x( 'Design Elements', 'Post Type General Name', 'lux-editor' ),
		'singular_name'         => _x( 'Design Element', 'Post Type Singular Name', 'lux-editor' ),
		'supports'							=> array( 'title' ),
		'menu_name'             => __( 'Design Elements', 'lux-editor' ),
		'name_admin_bar'        => __( 'Design Elements', 'lux-editor' ),
		'archives'              => __( 'Item Archives', 'lux-editor' ),
		'attributes'            => __( 'Item Attributes', 'lux-editor' ),
		'parent_item_colon'     => __( 'Parent Item:', 'lux-editor' ),
		'all_items'             => __( 'All Items', 'lux-editor' ),
		'add_new_item'          => __( 'Add New Item', 'lux-editor' ),
		'add_new'               => __( 'Add New', 'lux-editor' ),
		'new_item'              => __( 'New Item', 'lux-editor' ),
		'edit_item'             => __( 'Edit Item', 'lux-editor' ),
		'update_item'           => __( 'Update Item', 'lux-editor' ),
		'view_item'             => __( 'View Item', 'lux-editor' ),
		'view_items'            => __( 'View Items', 'lux-editor' ),
		'search_items'          => __( 'Search Item', 'lux-editor' ),
		'not_found'             => __( 'Not found', 'lux-editor' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'lux-editor' ),
		'featured_image'        => __( 'Featured Image', 'lux-editor' ),
		'set_featured_image'    => __( 'Set featured image', 'lux-editor' ),
		'remove_featured_image' => __( 'Remove featured image', 'lux-editor' ),
		'use_featured_image'    => __( 'Use as featured image', 'lux-editor' ),
		'insert_into_item'      => __( 'Insert into item', 'lux-editor' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'lux-editor' ),
		'items_list'            => __( 'Items list', 'lux-editor' ),
		'items_list_navigation' => __( 'Items list navigation', 'lux-editor' ),
		'filter_items_list'     => __( 'Filter items list', 'lux-editor' ),
	);
	$args = array(
		'label'                 => __( 'Design Elements', 'lux-editor' ),
		'description'           => __( 'Post Type Description', 'lux-editor' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
		'rest_base'             => 'lux-editor',
	);

	register_post_type( 'design_element', $args );

}
add_action( 'init', 'lux_editor_post_type_design_element', 0 );
