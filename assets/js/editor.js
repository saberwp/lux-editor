function luxEditorEditorInitDomElements() {

  // Read the entire dom.
  const domCurrent = document.body;
  domCurrent.style['position'] = 'relative';

  // Build upper elements of editor.
  luxEditorBuildEditorContainer();
  luxEditorBuildEditorHeader();
  luxEditorBuildMenu();

  // Attach click events to the menu.
  luxEditorMenuClickTree();
  luxEditorMenuClickElement()

  // Add editor body container. This is the element that will be populated by context-specific controls.
  const bodyEl = document.createElement( 'section' );
  bodyEl.id = 'lux-editor-editor-body';
  editorContainer.appendChild( bodyEl );

  // Add footer.
  const trashIcon = '<svg id="lux-editor-delete-icon" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h18.9l33.2 372.3a48 48 0 0 0 47.8 43.7h232.2a48 48 0 0 0 47.8-43.7L421.1 96H440a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zm184.8 427a15.91 15.91 0 0 1-15.9 14.6H107.9A15.91 15.91 0 0 1 92 465.4L59 96h330z"></path></svg>';
  const footerEl = document.createElement( 'footer' );
  footerEl.id = 'lux-editor-editor-footer';
  footerEl.innerHTML = trashIcon;
  footerEl.style['cursor'] = 'pointer';
  footerEl.style['display'] = 'flex';
  footerEl.style['justify-content'] = 'space-between';
  const footerColRight = document.createElement( 'div' );
  footerColRight.id = 'lux-editor-editor-export';
  footerColRight.innerHTML = 'EXPORT SELECTED';
  footerEl.appendChild( footerColRight );
  editorContainer.appendChild( footerEl );

}

function luxEditorMenuClickTree() {

  const el = document.getElementById( 'lux-editor-editor-menu-tree' );

  console.log( el )

  if( el ) {

    el.addEventListener( 'click', e => {

      // Remove existing elements.
      luxEditorStylesRemove();
      luxEditorInserterRemove();
      luxEditorInserterFormRemove();
      luxEditorTitleFieldRemove();

      // Build tree then add click event handler.
      luxEditorTreeAdd();
      luxEditorTreeItemClickEvent();

    });

  }

}

function luxEditorInserterFormRemove() {

  const el = document.getElementById( 'lux-editor-editor-inserter-element-form' );
  if( el ) {
    el.remove();
  }

}

function luxEditorMenuClickElement() {

  const el = document.getElementById( 'lux-editor-editor-menu-element' );

  console.log( el )

  if( el ) {

    el.addEventListener( 'click', e => {

      /* Add title field. */
      luxEditorTitleFieldRemove();
      let titleField = document.createElement( 'input' );
      titleField.id = 'lux-editor-element-title-field';
      titleField.placeholder = 'Enter the design element title';
      titleField.value = luxEditorPostData.title;
      const editorEl = document.getElementById( 'lux-editor-editor' );
      editorEl.appendChild( titleField );

      luxEditorTreeRemove();
      luxEditorInserterRemove();
      luxEditorSelectElementByDoubleClick();
      luxEditorInserterFormRemove();
      luxEditorEditElementButtonRemove();

    });

  }

}

function luxEditorTitleFieldRemove() {

  const titleFieldExists = document.getElementById( 'lux-editor-element-title-field' );
  if( titleFieldExists ) {

    luxEditorPostData.title = titleFieldExists.value; // Stash value before removing.
    titleFieldExists.remove();

  }

}

function luxEditorBuildEditorContainer() {

  // Editor main container.
  let editorContainer = document.createElement( 'div' );
  editorContainer.id = 'lux-editor-editor';
  editorContainer.style['position'] = 'fixed';
  editorContainer.style['right'] = '0';
  editorContainer.style['backgroundColor'] = '#F7F7F7';
  editorContainer.style['color'] = '#D8D8D8';

  // Add editor container to the body.
  document.body.appendChild( editorContainer );

}

function luxEditorBuildEditorHeader() {

  let editorHeader = document.createElement( 'header' );
  editorHeader.id = 'lux-editor-editor-header';
  editorHeader.innerHTML = '<svg id="lux-editor-editor-collapse-icon" width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_47_71)"><path d="M0.511747 26.9884L0.196122 26.6681C-0.0653739 26.4027 -0.0653739 25.9723 0.196122 25.7068L9.45159 16.3125H6.02676C5.65695 16.3125 5.35711 16.0082 5.35711 15.6328V15.1797C5.35711 14.8044 5.65695 14.5 6.02676 14.5H11.6071C12.1003 14.5 12.5 14.9057 12.5 15.4063V21.0703C12.5 21.4457 12.2001 21.75 11.8303 21.75H11.3839C11.0141 21.75 10.7143 21.4457 10.7143 21.0703V17.5941L1.45879 26.9884C1.19724 27.2539 0.773242 27.2539 0.511747 26.9884ZM13.3928 14.5H18.9732C19.343 14.5 19.6428 14.1957 19.6428 13.8203V13.3672C19.6428 12.9919 19.343 12.6875 18.9732 12.6875H15.5484L24.8038 3.29323C25.0653 3.02781 25.0653 2.59746 24.8038 2.33198L24.4882 2.01162C24.2267 1.74621 23.8027 1.74621 23.5412 2.01162L14.2857 11.4059V7.92972C14.2857 7.55436 13.9859 7.25003 13.616 7.25003H13.1696C12.7998 7.25003 12.5 7.55436 12.5 7.92972V13.5938C12.5 14.0943 12.8997 14.5 13.3928 14.5Z" fill="#DADADA"/></g><defs><clipPath id="clip0_47_71"><rect width="25" height="29" fill="white"/></clipPath></defs></svg><div id="lux-editor-editor-logo"><svg width="217" height="33" viewBox="0 0 217 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="217" height="33" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_46_53" transform="translate(-0.00412442) scale(0.00152074 0.01)"/></pattern><image id="image0_46_53" width="663" height="100" xlink:href="data:image/png;base64,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"/></defs></svg></h2>';

  // Add editor header to container.
  editorContainer = document.getElementById( 'lux-editor-editor' );
  editorContainer.appendChild( editorHeader );

}

function luxEditorBuildMenu() {

  const el = document.createElement( 'ul' );
  el.id = 'lux-editor-editor-menu';
  el.innerHTML = '<li id="lux-editor-editor-menu-tree" class="lux-editor-editor-menu-selected-item">TREE</li><li id="lux-editor-editor-menu-element">ELEMENT</li>';

  // Add editor menu to container.
  editorContainer = document.getElementById( 'lux-editor-editor' );
  editorContainer.appendChild( el );

}

function luxEditorSelectElementByDoubleClick() {

  window.addEventListener( 'dblclick', event => {

    let element = document.getElementById( 'lux-editor-editor' );

    if( element ) {

      // Remove editor.
      element.remove();

    } else {

      // Add editor.
      luxEditorEditorInit();

    }


  });

}

function luxEditorTreeItemClickEvent() {

  /* Event listener for clicks on nodes/elements listed in the tree view. */
  const treeElements = document.querySelectorAll( '#lux-editor-editor-body li' );
  treeElements.forEach( treeEl => {

    treeEl.addEventListener( 'click', event => {

      // Get the target of the click.
      const targetId = event.target.getAttribute( 'data-target' );
      const targetEl = document.getElementById( targetId );

      // Record the element selection.
      luxEditorElementSelection( targetId, event.target );

      const targetPosition = targetEl.getBoundingClientRect();
      const jsonElementMatch = luxEditorFindJsonDefinition( targetId );

      /* Add element edit button. */
      const existingButton = document.getElementById( 'lux-editor-edit-element-button' );
      if( existingButton ) {
        existingButton.remove();
      }
      const editElementButtonEl = document.createElement( 'button' );
      editElementButtonEl.id = 'lux-editor-edit-element-button';
      editElementButtonEl.innerHTML = 'Edit Element';
      document.getElementById( 'lux-editor-editor-body' ).appendChild( editElementButtonEl );
      luxEditorEditElementButtonClickEvent( jsonElementMatch );

      /* Add element inserter. */
      luxEditorInserterInit();

      /* Add style inputs. */

      /*
      luxEditorStylesRemove();
      const styleInputs = luxEditorBuildStyleInputs( jsonElementMatch );
      const editorBodyEl = document.getElementById( 'lux-editor-editor-body' );
      editorBodyEl.appendChild( styleInputs );
      luxEditorStyleInputBlur(); // Attach blur event to process inputs.
      */

      // luxEditorTreeRemove();

      // Add overlay to highlight edited element.
      /*
      const containerEl = document.getElementById( 'container' );
      const overlayEl = document.createElement( 'div' );
      overlayEl.id = 'lux-editor-editor-selection';
      overlayEl.style['background-color'] = 'blue';
      overlayEl.style['position'] = 'absolute';
      overlayEl.style['top']    = targetPosition.y + body.scrollTop;
      overlayEl.style['left']   = targetPosition.x;
      overlayEl.style['width']  = targetPosition.width;
      overlayEl.style['height'] = targetPosition.height;
      overlayEl.style['opacity'] = '0.15';

      if( existingOverlay = document.getElementById( 'lux-editor-editor-selection' ) ) {
        existingOverlay.remove();
      }

      containerEl.appendChild( overlayEl );
      */

    });

  });

}

function luxEditorEditElementButtonClickEvent( jsonElementMatch ) {

  const el = document.getElementById( 'lux-editor-edit-element-button' );
  el.addEventListener( 'click', event => {

    event.target.remove();
    luxEditorStylesRemove();
    luxEditorTreeRemove();
    luxEditorInserterRemove();

    const styleInputs = luxEditorBuildStyleInputs( jsonElementMatch );
    const editorBodyEl = document.getElementById( 'lux-editor-editor-body' );
    editorBodyEl.appendChild( styleInputs );
    luxEditorStyleInputBlur(); // Attach blur event to process inputs.

  });

}

/* Remove the styles container. */
function luxEditorStylesRemove() {

  const existingStylesContainer = document.getElementById( 'lux-editor-editor-styles' );
  if( existingStylesContainer ) {
    existingStylesContainer.remove();
  }

}

/* Remove the element tree. */
function luxEditorTreeRemove() {

  const editorTree = document.getElementById( 'lux-editor-editor-tree' );
  if( editorTree ) {
    editorTree.remove();
  }

}

/**
 * Tree Functions.
 */
function luxEditorTreeAdd() {

  // Remove tree if it already exists.
  luxEditorTreeRemove();

  targetElement = document.getElementById( 'main' );

  const treeContainer = document.createElement( 'ul' );
  treeContainer.id = 'lux-editor-editor-tree';

  luxEditorTrees.forEach( elementTree => {

    luxEditorTreeParseJsonElementsRecursive( elementTree.elements, treeContainer );

  });

  const editorBody = document.getElementById( 'lux-editor-editor-body' );

  editorBody.appendChild( treeContainer );

  /* Add element inserter. */
  luxEditorInserterInit();

}

function luxEditorTreeParseJsonElementsRecursive( elements, treeContainer ) {

  let listEl = document.createElement( 'ul' );

  elements.forEach( element => {

    let el       = document.createElement( 'li' );
    el.innerHTML = element.id;
    el.setAttribute( 'data-target', element.id );
    listEl.appendChild( el );

    if( element.hasOwnProperty( 'elements' ) && element.elements.length > 0 ) {
      luxEditorTreeParseJsonElementsRecursive( element.elements, listEl );
    }

  });

  treeContainer.appendChild( listEl );

}



/**
 * Styles Handling Functions.
 */
function luxEditorGetSupportedCssProperties() {

   return [
     'padding',
     'margin',
     'border',
     'background-color',
     'font-family',
     'font-size',
     'color',
     'width',
     'max-width',
     'height',
   ];

 }

/**
 * Utility function to convert the styles array into an object so items can be picked by property name.
 * Indexed by CSS property name.
 */
function luxEditorStylesConvertElementArrayToObject( styles ) {

  const stylesObject = {}
  if( undefined === styles || styles.length === 0 ) {
    return stylesObject;
  }

  styles.forEach( style => {

    stylesObject[ style.selector ] = style;

  });

  return stylesObject;

}

function luxEditorBuildStyleInputs( jsonElement ) {

  const container = document.createElement( 'div' );
  container.id = 'lux-editor-editor-styles';

  const cssProps = luxEditorGetSupportedCssProperties();

  const elementStylesObject = luxEditorStylesConvertElementArrayToObject( jsonElement.styles );

  cssProps.forEach( property => {

    // Get current value for this property if set.
    let propertyCurrentValue = ''; // Default empty string.
    if( elementStylesObject[property] ) {
      propertyCurrentValue = elementStylesObject[property]['value'];
    }



    // Add group div.
    const groupDiv = document.createElement( 'div' );
    groupDiv.id = property + '-input';

    // Add the label.
    const label = document.createElement( 'label' );
    label.setAttribute( 'for', 'whatever' );
    label.innerHTML = property;

    // Add the input.
    const input = document.createElement( 'input' );
    input.setAttribute( 'type', 'text' );
    input.setAttribute( 'data-target', jsonElement.id );
    input.setAttribute( 'data-target-selector', property );
    input.setAttribute( 'value', propertyCurrentValue );

    // Add to DOM structure.
    groupDiv.appendChild( label );
    groupDiv.appendChild( input );
    container.appendChild( groupDiv );

  });

  return container;

}

function luxEditorStyleInputBlur() {

  const styleInputs = document.querySelectorAll('#lux-editor-editor-styles input');

  styleInputs.forEach( inputEl => {

    inputEl.addEventListener( 'blur', ( event ) => {

      luxEditorSaveStyle( event );

    });

  });

}

function luxEditorSaveStyle( event ) {

  const inputEl = event.target;
  const inputValue = inputEl.value;
  const targetId = inputEl.getAttribute( 'data-target' );
  const targetSelector = inputEl.getAttribute( 'data-target-selector' );

  // Get element being saved.
  const jsonElementMatch = luxEditorFindJsonDefinition( targetId );

  // Convert element styles array to object.
  const elementStylesObject = luxEditorStylesConvertElementArrayToObject( jsonElementMatch.styles );

  // Get supported CSS properties.
  const cssProps = luxEditorGetSupportedCssProperties();

  let updatedExistedStyle = false;
  if( undefined !== jsonElementMatch.styles ) {
    jsonElementMatch.styles.forEach( ( style, index ) => {

      if( targetSelector === style.selector ) {

        jsonElementMatch.styles[ index ] = {
          selector: targetSelector,
          value: inputValue
        };

        updatedExistedStyle = true;

      }

    });
  }

  // If style did not already we create it here.
  if( undefined === jsonElementMatch.styles ) {
    jsonElementMatch.styles = [];
  }
  if( ! updatedExistedStyle ) {

    jsonElementMatch.styles.push( {
        selector: targetSelector,
        value: inputValue
      }
    );

  }

  // Refresh DOM.
  const targetEl = document.getElementById( targetId );
  const targetParentEl = targetEl.parentNode;

  targetReplacementEl = luxEditorRenderer( jsonElementMatch );
  targetParentEl.replaceChild( targetReplacementEl, targetEl );

  // targetEl.remove();
  // luxEditorRenderer( jsonElementMatch, targetParentEl );

}

// Element ID is needed to search the entire JSON tree.
// We're returning the original object here, not a copy.
function luxEditorFindJsonDefinition( targetId ) {

  let jsonElementMatch = false;
  luxEditorTrees.every( elementTree => {

    jsonElementMatch = luxEditorFindJsonDefinitionRecursive( elementTree.elements, targetId );
    if( jsonElementMatch ) {
      return false;
    }

    return true;

  });

  return jsonElementMatch;

}

function luxEditorFindJsonDefinitionRecursive( elements, targetId ) {

  let jsonElementMatch = false;
  elements.forEach( element => {

    if( targetId === element.id ) {

      jsonElementMatch = element;

    }

    if( ! jsonElementMatch && undefined !== element.elements && element.elements.length > 0 ) {
      jsonElementMatch = luxEditorFindJsonDefinitionRecursive( element.elements, targetId );
    }

  });

  return jsonElementMatch;

}

// Record the selection of an element and make the data available to other functions such as the exporter.
function luxEditorElementSelection( elementId, editorItem ) {

  const currentSelectedElements = document.querySelectorAll( '.lux-editor-editor-selected' );

  currentSelectedElements.forEach( selectedElement => {
    selectedElement.classList.remove('lux-editor-editor-selected');
  });

  // Add selected class to the editor item clicked.
  editorItem.className = 'lux-editor-editor-selected';

  window.luxEditorData.editorSelectedItem = {
    elementId: elementId,
    editorItem: editorItem
  }

}

function luxEditorInserterInit() {

  const existingEl = document.getElementById( 'lux-editor-editor-inserter' );
  if( existingEl ) {
    existingEl.remove();
  }

  const inserterContainer = document.createElement( 'div' );
  inserterContainer.id = 'lux-editor-editor-inserter';

  const inserterButton = document.createElement( 'div' );
  inserterButton.id = 'lux-editor-editor-inserter-button';
  inserterButton.innerHTML = '<svg width="234" height="36" viewBox="0 0 234 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M51.1719 10H48.7578V26H51.1719V10ZM67.6016 10H65.2109V21.75H65.0625L56.9219 10H54.6875V26H57.1016V14.2656H57.25L65.3828 26H67.6016V10ZM79.8496 14.2031H82.1777C82.1074 11.6406 79.8418 9.78125 76.5918 9.78125C73.3809 9.78125 70.9199 11.6172 70.9199 14.375C70.9199 16.6016 72.5137 17.9062 75.084 18.6016L76.9746 19.1172C78.6855 19.5703 80.0059 20.1328 80.0059 21.5547C80.0059 23.1172 78.5137 24.1484 76.459 24.1484C74.5996 24.1484 73.0527 23.3203 72.9121 21.5781H70.4902C70.6465 24.4766 72.8887 26.2656 76.4746 26.2656C80.2324 26.2656 82.3965 24.2891 82.3965 21.5781C82.3965 18.6953 79.8262 17.5781 77.7949 17.0781L76.2324 16.6719C74.9824 16.3516 73.3184 15.7656 73.3262 14.2344C73.3262 12.875 74.5684 11.8672 76.5371 11.8672C78.373 11.8672 79.6777 12.7266 79.8496 14.2031ZM85.2813 26H95.4063V23.9219H87.6953V19.0234H94.7891V16.9531H87.6953V12.0781H95.3125V10H85.2813V26ZM98.5371 26H100.951V19.9453H104.232C104.287 19.9453 104.334 19.9453 104.389 19.9453L107.639 26H110.389L106.842 19.5234C108.803 18.7969 109.779 17.1641 109.779 15.0156C109.779 12.0703 107.951 10 104.24 10H98.5371V26ZM100.951 17.8672V12.0703H103.982C106.365 12.0703 107.35 13.2031 107.35 15.0156C107.35 16.8203 106.365 17.8672 104.014 17.8672H100.951ZM111.928 12.0781H116.912V26H119.318V12.0781H124.311V10H111.928V12.0781ZM132.869 26H142.994V23.9219H135.283V19.0234H142.377V16.9531H135.283V12.0781H142.9V10H132.869V26ZM146.125 26H155.789V23.9219H148.539V10H146.125V26ZM158.543 26H168.668V23.9219H160.957V19.0234H168.051V16.9531H160.957V12.0781H168.574V10H158.543V26ZM171.799 10V26H174.096V14.4141H174.244L178.963 25.9766H180.869L185.588 14.4219H185.736V26H188.033V10H185.104L180.01 22.4375H179.822L174.729 10H171.799ZM191.543 26H201.668V23.9219H193.957V19.0234H201.051V16.9531H193.957V12.0781H201.574V10H191.543V26ZM217.713 10H215.322V21.75H215.174L207.033 10H204.799V26H207.213V14.2656H207.361L215.494 26H217.713V10ZM220.445 12.0781H225.43V26H227.836V12.0781H232.828V10H220.445V12.0781Z" fill="#C9C9C9"/><path d="M27 17.5781V18.4219C27 18.8859 26.6203 19.2656 26.1562 19.2656H19.2656V26.1562C19.2656 26.6203 18.8859 27 18.4219 27H17.5781C17.1141 27 16.7344 26.6203 16.7344 26.1562V19.2656H9.84375C9.37969 19.2656 9 18.8859 9 18.4219V17.5781C9 17.1141 9.37969 16.7344 9.84375 16.7344H16.7344V9.84375C16.7344 9.37969 17.1141 9 17.5781 9H18.4219C18.8859 9 19.2656 9.37969 19.2656 9.84375V16.7344H26.1562C26.6203 16.7344 27 17.1141 27 17.5781ZM35.4375 18C35.4375 27.6328 27.6328 35.4375 18 35.4375C8.36719 35.4375 0.5625 27.6328 0.5625 18C0.5625 8.36719 8.36719 0.5625 18 0.5625C27.6328 0.5625 35.4375 8.36719 35.4375 18ZM33.1875 18C33.1875 9.56953 26.3461 2.8125 18 2.8125C9.56953 2.8125 2.8125 9.65391 2.8125 18C2.8125 26.4305 9.65391 33.1875 18 33.1875C26.4305 33.1875 33.1875 26.3461 33.1875 18Z" fill="#D1D1D1"/></svg>';

  inserterContainer.appendChild( inserterButton );
  const editorBodyContainer = document.getElementById( 'lux-editor-editor-body' );
  editorBodyContainer.appendChild( inserterContainer );

  luxEditorInserterClickEvent();

}

function luxEditorInserterShowForm() {

  // Container div.
  const inserterFormContainerEl = document.createElement( 'div' );
  inserterFormContainerEl.id = 'lux-editor-editor-inserter-element-form';

  // Render current selected tag.
  if( undefined !== window.luxEditorData.editorSelectedItem ) {
    const selectedElementId = window.luxEditorData.editorSelectedItem.elementId;
    const selectedElement   = document.getElementById( selectedElementId );
    const tagSelectionEl = document.createElement( 'div' );
    tagSelectionEl.id = 'lux-editor-editor-inserter-selection-display';
    tagSelectionEl.innerHTML = '#' + selectedElementId;
    inserterFormContainerEl.appendChild( tagSelectionEl );
  }


  // Tag input.
  const tagContainer = document.createElement( 'div' );
  tagContainer.id = 'lux-editor-inserter-tag-container';
  const tagLabelEl = document.createElement( 'label' );
  tagLabelEl.innerHTML = 'Tag (div, ul, li, img, any HTML5 tag)';
  tagContainer.appendChild( tagLabelEl );
  const tagInputEl = document.createElement( 'input' );
  tagInputEl.id = 'lux-editor-tag-input';
  tagContainer.appendChild( tagInputEl );
  inserterFormContainerEl.appendChild( tagContainer );

  // Position selector.
  const positionEl = document.createElement( 'div' );
  positionEl.innerHTML = '<ul id="lux-editor-editor-insert-position-choices"><li data-position="before">BEFORE</li><li data-position="inside">INSIDE</li><li data-position="after">AFTER</li></ul>';
  inserterFormContainerEl.appendChild( positionEl );

  // Render the statement before confirm button.
  const statementEl = document.createElement( 'div' );
  statementEl.id = 'lux-editor-editor-inserter-statement';
  statementEl.innerHTML = 'create  \u2770div\u2771 before #great-list';
  inserterFormContainerEl.appendChild( statementEl );

  // Add to editor body.
  const containerEl = document.getElementById( 'lux-editor-editor-body' );
  containerEl.appendChild( inserterFormContainerEl );

  // Init position choices event.
  luxEditorInserterPositionChoicesClickEvent();

}

function luxEditorInserterPositionChoicesClickEvent() {

  const els = document.querySelectorAll( '#lux-editor-editor-insert-position-choices li' );

  els.forEach( el => {
    el.addEventListener( 'click', event => {

      const currentSelected = document.querySelector( '#lux-editor-editor-insert-position-choices li.is-selected' );
      if( currentSelected ) {
        currentSelected.classList.remove( 'is-selected' );
      }
      event.target.classList.add( 'is-selected' );
    });
  });

}

function luxEditorEditElementButtonRemove() {
  const elementEditButton = document.getElementById( 'lux-editor-edit-element-button' );
  if( elementEditButton ) {
    elementEditButton.remove();
  }
}

/**
 * Inserter Functions.
 */
function luxEditorInserterClickEvent() {

  const inserterEl = document.getElementById( 'lux-editor-editor-inserter-button' );
  inserterEl.addEventListener( 'click', event => {

    // Remove the edit button.
    luxEditorEditElementButtonRemove();

    // Remove the inserter button.
    luxEditorInserterRemove();

    // Remove tree to make space for inserter form.
    luxEditorTreeRemove();

    // Remove styles if they are showing.
    luxEditorStylesRemove();

    // Show the input to choose tag to insert.
    luxEditorInserterShowForm();

    // Show the confirm button.
    luxEditorInserterShowConfirmButton();

  });


}

function luxEditorInserterShowConfirmButton() {

  const containerEl = document.getElementById( 'lux-editor-editor-inserter-element-form' );
  const inserterConfirm = document.createElement( 'button' );
  inserterConfirm.id = 'lux-editor-editor-inserter-confirm-button';
  inserterConfirm.innerHTML = 'Add Element';
  containerEl.appendChild( inserterConfirm );

  /* Attach the click event. */
  luxEditorInserterConfirmButtonEvent();

}

function luxEditorInserterConfirmButtonEvent() {

  const el = document.getElementById( 'lux-editor-editor-inserter-confirm-button' );
  el.addEventListener( 'click', event => {

    // Get the position choice (before, after, inside).
    const positionChoiceEl = document.querySelector( '#lux-editor-editor-insert-position-choices li.is-selected' );
    const positionChoice = positionChoiceEl.getAttribute( 'data-position' );

    // Insert the new element into the DOM.
    const insertTag = document.getElementById( 'lux-editor-tag-input' ).value;
    if( insertTag === 'text' ) {
      newEl = document.createTextNode( 'Test123' );
    } else {
      newEl = document.createElement( insertTag );
      newEl.id                        = 'new-element-1';
      newEl.innerHTML                 = 'New Element';
      newEl.style['padding']          = '40px';
      newEl.style['background-color'] = 'blue';
    }

    window.luxEditorData.editorSelectedItem

    // Set target parent element.
    let targetElementParent = document.getElementById( 'main' );
    if( undefined !== window.luxEditorData.editorSelectedItem && window.luxEditorData.editorSelectedItem.elementId ) {
      targetElementParent = document.getElementById( window.luxEditorData.editorSelectedItem.elementId );
    }

    if( positionChoice === 'before' ) {
      const newElementParent = targetElementParent.parentNode;
      newElementParent.insertBefore( newEl, targetElementParent );
    }

    if( positionChoice === 'after' ) {
      const newElementParent = targetElementParent.parentNode;
      newElementParent.insertBefore( newEl, targetElementParent.nextSibling );
    }

    if( positionChoice === 'inside' ) {
      targetElementParent.appendChild( newEl );
    }


    // Stash the new element into the data JSON.
    const elementTree = {
      elements: [
        {
          tag: insertTag,
          id: newEl.id,
          styles: [
            {
              selector: 'padding',
              value: '40px'
            },
            {
              selector: 'background-color',
              value: 'blue'
            },
          ]
        }
      ]
    }
    luxEditorTrees.push( elementTree );

    // Rebuild the tree in the editor so the new element is shown.
    luxEditorEditorInit();

    // Move this to exporter.js and use event trigger for editor rebuild.
    luxEditorExportClickEvent();

    // Set the new element as the current target selection.
    const treeItemMatcherString = '#lux-editor-editor-tree li[data-target*="' + newEl.id + '"]';
    window.luxEditorData.editorSelectedItem = {
      elementId: newEl.id,
      editorItem: document.querySelector( treeItemMatcherString )
    }

  });

}

function luxEditorInserterRemove() {

  const el = document.getElementById( 'lux-editor-editor-inserter' );
  if( el ) {
    el.remove();
  }

}

/* End inserter functions. */

function luxEditorElementDeleterClickEvent() {

  const el = document.getElementById( 'lux-editor-delete-icon' );
  el.addEventListener( 'click', event => {

    const selectedElement = document.getElementById( window.luxEditorData.editorSelectedItem.elementId );
    selectedElement.remove();

  });

}

function luxEditorSaveHandler() {

  setInterval( luxEditorSaveRequest, 10000 );

  function luxEditorSaveRequest() {

    // Get the element.
    let jsonDef = '';

    if( undefined !== window.luxEditorData.editorSelectedItem ) {
      const elementId = window.luxEditorData.editorSelectedItem.elementId;
      jsonDef = luxEditorFindJsonDefinition( elementId );
    }

    // Get the design element title.
    const titleField = document.getElementById( 'lux-editor-element-title-field' );
    if( titleField ) {
      postTitle = value;
    } else {
      postTitle = luxEditorPostData.title;
    }

    const data = {
      action: 'lux_editor_save_design_element',
      post: luxEditorSaveId,
      postTitle: postTitle,
      json: JSON.stringify( jsonDef )
    }
    jQuery.post( luxEditorAjaxUrl, data, function( response ) {

      console.log( 'response from server after save...')
      console.log( response )

    });

  } /* End save request. */

}

function luxEditorEditorInit() {

  const editor = document.getElementById( 'lux-editor-editor' );
  if( editor ) { editor.remove(); }

  luxEditorEditorInitDomElements();

  console.log( 'init editor...')

  // Build tree then add click event handler.
  luxEditorTreeAdd();

  luxEditorTreeItemClickEvent();

  luxEditorElementDeleterClickEvent();

  // Init autosave.
  luxEditorSaveHandler();

}


/* Call the init function. */
luxEditorEditorInit();



/* Drag and Drop */
/* This all needs to be reworked... */

function dragAndDrop() {
  //var acceptableDragList = ['FIGURE', 'FIGCAPTION', 'P', 'H1', 'IMG'];
  //var acceptableDropList = ['ARTICLE', 'FIGURE'];
  var acceptableDragList = ['LI'];
  var acceptableDropList = ['UL'];
  var ghostElement;
  var uniqueElementId = 1;

  function dragStartHandle(e) {
    e.target.style.opacity = 0.4;
    e.dataTransfer.setData("elementId", e.target.dataset.dragId);
  }

  function dragOverHandle(e) {
    if(acceptableDropList.indexOf(e.target.nodeName) != -1) {
      var inserted = false;
      var cList = e.target.children;
      if(!cList) {
        e.target.appendChild(ghostElement);
        return;
      }
      for(var i=0; i<cList.length; i++) {
        var childPos = cList[i].offsetTop;
        var parentPos = e.target.offsetTop;
        if(e.offsetY < childPos - parentPos) {
          e.target.insertBefore(ghostElement, cList[i]);
          inserted = true;
          break;
        }
      }
      if(!inserted) e.target.appendChild(ghostElement);
    }
    return false;
  }

  function dropHandle(e) {
    var elementId = e.dataTransfer.getData("elementId");
    var draggedElement = document.querySelector('[data-drag-id="' + elementId + '"]');
    if(ghostElement.parentNode) {
      ghostElement.parentNode.insertBefore(draggedElement, ghostElement);
    }
    e.preventDefault();
  }

  function dragEndHandle(e) {
    e.target.style.opacity = 1;
    setTimeout(function() {
      if(ghostElement.parentNode) {
        ghostElement.parentNode.removeChild(ghostElement);
      }
    }, 100);
  }

  function addDragHandle(el) {
    el.ondragover = dragOverHandle;
    el.ondrop = dropHandle;

    var cList = el.children;
    for(var i=0; i<cList.length; i++) {
      if(acceptableDropList.indexOf(cList[i].nodeName) != -1) {
        addDragHandle(cList[i]);
      }
      if(acceptableDragList.indexOf(cList[i].nodeName) != -1) {
        cList[i].ondragstart = dragStartHandle;
        cList[i].ondragend = dragEndHandle;
        cList[i].draggable = true;
        cList[i].dataset.dragId = uniqueElementId++;
      }
    }
    ghostElement = document.createElement("div");
    ghostElement.className = 'ghost';
    ghostElement.innerHTML = 'Drop here';
  }

  function init(querySelectString) {
    var el = document.querySelector(querySelectString);
    addDragHandle(el);
  }

  return {
    init: init
  }
}


var dragObj = dragAndDrop();
dragObj.init('#lux-editor-editor-tree');
