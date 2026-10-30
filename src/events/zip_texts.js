/* events/zip_texts.js: the text of the parts of a zip file whose names match (an .xlsx or .ods spreadsheet is a zip of XML
   parts: its cells' text is in them). Reads the zip's directory and inflates each part with the browser's own
   DecompressionStream, so no library is needed. */
