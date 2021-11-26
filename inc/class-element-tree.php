<?php

namespace LuxEditor;

class ElementTree {

  public $title = '';
  public $elements = array();
  public $parent;

  public function import( $json ) {

    $decoded = json_decode( $json );
    $element          = new Element();
    $element->id      = $decoded->id;
    $element->tag     = $decoded->tag;
    $element->styles  = $decoded->styles;
    $element->content = $decoded->content;
    $this->add( $element );
    $parent_id = $element->id;

    if( isset( $decoded->elements ) ) {

      foreach( $decoded->elements as $child_element ) {

        $element          = new Element();
        $element->tag     = $child_element->tag;
        $element->styles  = $child_element->styles;
        $element->content = $child_element->content;
        $this->add( $element, $parent_id );

      }

    }

  }

  // Add an element to the tree.
  public function add( $element, $parent = false ) {

    if( ! $parent ) {

      $this->elements[] = $element;
      return $this->elements;

    }

    $this->element_search_loop( $parent, $this->elements );

    if( ! array_key_exists( 'elements', $this->parent ) ) {

      $this->parent->elements = array();

    }

    $this->parent->elements[] = $element;

  }

  public function element_search_loop( $parent_element_id, $elements ) {

    foreach( $elements as $element ) {

      if( $element->id === $parent_element_id ) {

        $this->parent = $element;

      }

      if( array_key_exists( 'elements', $element ) ) {

        $this->element_search_loop( $element->id, $element->elements );

      }

    }

  }


}
