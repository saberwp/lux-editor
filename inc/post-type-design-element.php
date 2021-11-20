<?php

// Register Custom Post Type
function brand_enforcer_post_type_design_element() {

	$labels = array(
		'name'                  => _x( 'Design Elements', 'Post Type General Name', 'brand-enforcer' ),
		'singular_name'         => _x( 'Design Element', 'Post Type Singular Name', 'brand-enforcer' ),
		'supports'							=> array( 'title' ),
		'menu_name'             => __( 'Design Elements', 'brand-enforcer' ),
		'name_admin_bar'        => __( 'Design Elements', 'brand-enforcer' ),
		'archives'              => __( 'Item Archives', 'brand-enforcer' ),
		'attributes'            => __( 'Item Attributes', 'brand-enforcer' ),
		'parent_item_colon'     => __( 'Parent Item:', 'brand-enforcer' ),
		'all_items'             => __( 'All Items', 'brand-enforcer' ),
		'add_new_item'          => __( 'Add New Item', 'brand-enforcer' ),
		'add_new'               => __( 'Add New', 'brand-enforcer' ),
		'new_item'              => __( 'New Item', 'brand-enforcer' ),
		'edit_item'             => __( 'Edit Item', 'brand-enforcer' ),
		'update_item'           => __( 'Update Item', 'brand-enforcer' ),
		'view_item'             => __( 'View Item', 'brand-enforcer' ),
		'view_items'            => __( 'View Items', 'brand-enforcer' ),
		'search_items'          => __( 'Search Item', 'brand-enforcer' ),
		'not_found'             => __( 'Not found', 'brand-enforcer' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'brand-enforcer' ),
		'featured_image'        => __( 'Featured Image', 'brand-enforcer' ),
		'set_featured_image'    => __( 'Set featured image', 'brand-enforcer' ),
		'remove_featured_image' => __( 'Remove featured image', 'brand-enforcer' ),
		'use_featured_image'    => __( 'Use as featured image', 'brand-enforcer' ),
		'insert_into_item'      => __( 'Insert into item', 'brand-enforcer' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'brand-enforcer' ),
		'items_list'            => __( 'Items list', 'brand-enforcer' ),
		'items_list_navigation' => __( 'Items list navigation', 'brand-enforcer' ),
		'filter_items_list'     => __( 'Filter items list', 'brand-enforcer' ),
	);
	$args = array(
		'label'                 => __( 'Design Elements', 'brand-enforcer' ),
		'description'           => __( 'Post Type Description', 'brand-enforcer' ),
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
		'rest_base'             => 'brand-enforcer',
	);

	register_post_type( 'design_element', $args );

}
add_action( 'init', 'brand_enforcer_post_type_design_element', 0 );
