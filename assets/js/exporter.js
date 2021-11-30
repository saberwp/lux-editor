function luxEditorExport() {

  const elementId = window.luxEditorData.editorSelectedItem.elementId;

  // Get JSON definition by ElementId.
  const jsonDef = luxEditorFindJsonDefinition( elementId );
  const exportEl = document.createElement( 'pre' );
  exportEl.innerHTML = JSON.stringify( jsonDef, undefined, 2 );

  const data = {
    action: 'lux_editor_save_design_element',
    json: JSON.stringify( jsonDef )
  }
  jQuery.post( luxEditorAjaxUrl, data, function( response ) {

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
