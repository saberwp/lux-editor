<?php

namespace LuxEditor;

class ElementTree {

  public $title = '';
  public $elements = array();
  public $parent;
  public $is_empty = true;

  public function import( $json ) {

    $this->empty = false;
    $parent_id   = false;

    $decoded = json_decode( $json );

    // Add upper level tag if valid.
    if( $decoded->tag && $decoded->id ) {

      $element          = new Element();
      $element->id      = $decoded->id;
      $element->tag     = $decoded->tag;
      $element->styles  = $decoded->styles;
      $element->content = $decoded->content;
      $this->add( $element );

      // Set parent ID for nesting other elements.
      $parent_id = $decoded->id;

    }

    $parent_id = $element->id;

    if( isset( $decoded->elements ) && ! empty( $decoded->elements ) ) {

      foreach( $decoded->elements as $child_element ) {

        if( $child_element->tag === null || $child_element->id === '' || ! $child_element->id ) {
          continue; // Skip null tags.
        }

        $element          = new Element();
        $element->set_id( $child_element->id );
        $element->tag     = $child_element->tag;
        $element->styles  = $child_element->styles;
        $element->content = $child_element->content;

        $this->add( $element, $parent_id );

      }

    }

  }

  public function set_empty() {

    $this->is_empty = true;

  }

  public function set_title( $title ) {

    $this->title = $title;

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
