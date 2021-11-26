function luxEditorExport() {

  console.log( 'doing export...')
  const elementId = window.luxEditorData.editorSelectedItem.elementId;

console.log( window.luxEditorData.editorSelectedItem )

  const jsonDef = luxEditorFindJsonDefinition( elementId );

  console.log( jsonDef )

  const exportEl = document.createElement( 'pre' );
  exportEl.innerHTML = JSON.stringify( jsonDef, undefined, 2 );

  const containerEl = document.getElementById( 'container' );
  containerEl.appendChild( exportEl );

  const data = {
    action: 'brand_enforcer_save_design_element',
    json: JSON.stringify( jsonDef )
  }
  jQuery.post( ajaxurl, data, function( response ) {

    console.log( 'response from server after save...')
    console.log( response )

  });

}

function luxEditorExportClickEvent() {

  const exportButton = document.getElementById( 'lux-editor-editor-export' );

  if( ! exportButton ) {
    return;
  }

  exportButton.addEventListener( 'click', event => {

    console.log( 'catching click event export...')
    luxEditorExport()

  });

}

/* Init. */
luxEditorExportClickEvent();
