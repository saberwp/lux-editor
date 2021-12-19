function luxEditorRenderElement( el, parent ) {

  if( ! parent ) {

    return;

  }

  parent.appendChild( el );

}

// Recursively create an element tree from the JSON definition.
function luxEditorRenderer( elementDefinition, elementParent ) {

  // Make the tag element.
  let el = document.createElement( elementDefinition.tag );

  console.log( el )

  // Set element ID.
  if( elementDefinition.id ) {

    el.id = elementDefinition.id;

  }

  // Set content as innerHTML if available.
  if( elementDefinition.content ) {
    el.innerHTML = elementDefinition.content;
  }

  // Parse the styles.
  if( elementDefinition.hasOwnProperty( 'styles' ) && null !== elementDefinition.styles && elementDefinition.styles.length > 0 ) {

    elementDefinition.styles.forEach( style => {

      el.style[ style.selector ] = style.value;

    });

  }

  // Loop over the element types and do element structure creation.
  switch( elementDefinition.tag ) {

    case 'div':

      // Add a CSS class.
      if( elementDefinition.classes ) {
        el.className = elementDefinition.classes;
      }

      break;

    case 'ul':


      break;

    case 'li':


      break;

    case 'h2':



    case 'img':

      el.setAttribute( 'src', elementDefinition.src );
      break;

    case 'a':

      el.setAttribute( 'href', elementDefinition.href );
      el.innerHTML = elementDefinition.content;
      break;

  }

  // Render current element.

  console.log( el )
  console.log( elementParent )

  if( elementParent ) {
    luxEditorRenderElement( el, elementParent );
  }

  // Recurse over child elements.
  if( elementDefinition.hasOwnProperty( 'elements' ) && elementDefinition.elements.length > 0 ) {

    elementDefinition.elements.forEach( childElementDefinition => {

      luxEditorRenderer( childElementDefinition, el );

    });

  }

  return el;

}

// Automatic rendering when luxEditorTree available.
if( typeof luxEditorData !== 'undefined' && luxEditorData.hasOwnProperty( 'elements' ) && luxEditorData.elements !== null && luxEditorData.elements.length > 0 ) {

  luxEditorData.elements.forEach( function( elementDefinition ) {

    luxEditorRenderer( elementDefinition, document.getElementById( 'lux-editor-canvas' ) );

  });

}

/**
 * Automatic Rendering for luxe-def tags.
 */
console.log( 'try to render luxe-def tags...')
let luxDefElements = document.getElementsByClassName( 'lux-def' );
console.log( luxDefElements )
if( luxDefElements.length > 0 ) {

  Array.from( luxDefElements ).forEach(( defTag ) => {
    console.log( defTag )
    console.log( defTag.className )

    luxDefinitionJson = defTag.getAttribute( 'attr-lux-def' );

    console.log( luxDefinitionJson )
    console.log( defTag.parentNode )
    const luxDefinition = JSON.parse( luxDefinitionJson );
    console.log( luxDefinition )

    luxDefinition.forEach( function( elementDefinition ) {

      luxEditorRenderer( elementDefinition, defTag );

    });


  } )

}
