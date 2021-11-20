<?php

namespace BrandEnforcer;

class ElementStyle {

  public $selector;
  public $value;

  public function set( $selector, $value ) {

    $this->selector = $selector;
    $this->value    = $value;

  }

}
