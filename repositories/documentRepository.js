let documents = [];
let documentRevisions = [];

function clearDocumentData() {
  documents = [];
  documentRevisions = [];
}

function getAllDocuments() {
  return documents;
}

function addDocumentTitle(title){
  documents.push(title)
}

function addDocumentVersion(documentTitle, content, version, timestamp){
  const documentTimestamp = timestamp ? timestamp : Date(Date.now()).toString();
  documentRevisions.push( {
    title: documentTitle,
    content: content,
    version: version + 1,
    timestamp: documentTimestamp,
  })
}

function getAllDocumentVersions(title) {
  return documentRevisions.filter((revision) => revision.title === title);
}

module.exports = {getAllDocuments, getAllDocumentVersions, addDocumentTitle, addDocumentVersion, clearDocumentData};
