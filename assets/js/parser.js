function luxEditorRenderElement( el, parent ) {

  if( ! parent ) {

    return;

  }

  parent.appendChild( el );

}

// Recursively create an element tree from the JSON definition.
function luxEditorRenderer( elementDefinition, elementParent ) {

  console.log( 'rendering element: ')
  console.log( elementDefinition )

  // Make the tag element.
  let el = document.createElement( elementDefinition.tag );

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

/* Do rendering of an ElementTree. */
// Automatic rendering when luxEditorTree available.
if( undefined !== luxEditorData.elementTree ) {

  if( luxEditorData.elementTree.hasOwnProperty( 'elements' ) && luxEditorData.elementTree.elements.length > 0 ) {

    luxEditorData.elementTree.elements.forEach( function( elementDefinition ) {

      luxEditorRenderer( elementDefinition, document.getElementById( 'lux-editor-canvas' ) );

    });

  }

}
