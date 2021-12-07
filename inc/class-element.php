<?php

namespace LuxEditor;

class Element {

  public $id     = '';
  public $tag    = 'div';
  public $styles = array(); // Array of ElementStyle objects.

  public function set_id( $id ) {

    $this->id = $id;

  }

  public function addStyle( ElementStyle $style ) {

    $this->styles[] = $style;

  }

  public function makeStyle( $selector, $value ) {

    $style = new ElementStyle();
    $style->set( $selector, $value );
    $this->styles[] = $style;

  }

}
