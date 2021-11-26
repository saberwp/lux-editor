<?php

namespace LuxEditor;

class Element {

  public $tag    = 'div';
  public $styles = array(); // Array of ElementStyle objects.

  public function addStyle( ElementStyle $style ) {

    $this->styles[] = $style;

  }

  public function makeStyle( $selector, $value ) {

    $style = new ElementStyle();
    $style->set( $selector, $value );
    $this->styles[] = $style;

  }

}
