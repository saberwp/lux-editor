function brandEnforcerExport() {

  console.log( 'doing export...')
  const elementId = window.brandEnforcerData.editorSelectedItem.elementId;

console.log( window.brandEnforcerData.editorSelectedItem )

  const jsonDef = brandEnforcerFindJsonDefinition( elementId );

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

function brandEnforcerExportClickEvent() {

  const exportButton = document.getElementById( 'brand-enforcer-editor-export' );

  if( ! exportButton ) {
    return;
  }

  exportButton.addEventListener( 'click', event => {

    console.log( 'catching click event export...')
    brandEnforcerExport()

  });

}

/* Init. */
brandEnforcerExportClickEvent();
